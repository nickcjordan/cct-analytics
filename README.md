# Youth Sports League Analytics Dashboard
Engineer: **Nick Jordan**

# ***All documentation can be found in this README except for the Application Diagram, found in `diagrams` folder***

## Clarifying Decisions / Assumptions

### Frontend
- I considered using MaterialUI (or another React component library) but decided to go with TailwindCSS and DaisyUI
	- Using MaterialUI would have been much faster to develop, and resulted in somewhat cleaner tsx code, but would have vastly limited the flexibility of the project
	- Because of this decision, I spent more time working on building a consistent look and feel than had I used MUI
	- However, the benefits outweigh the convenience: 
		- more design freedom / custom theming
		- much smaller bundle size, minimal overhead
		- not restricted to style and functional limitations of prebuilt components
		- also allowed me to implement a theme switcher in the Navbar for optional dark/light theme
- The frontend ultimately uses the sample json data provided, however I wrote the code in a way that mimics API calls and needs minimal changes to link to the backend API
	- The data retrieval sits behind a LeagueContext layer built with Context API
	- For a real production app, I would replace the functionality in `src/data/leagueData.ts` with https calls to the backend API with proper error handling, logging, etc 

### Infrastructure as Code
- Although AWS CDK was the preferred technology for IaC, I decided to use Terraform as this is what I use in my current role
	- I am confident I could have taken the time to learn AWS CDK, but in the interest of time I went with what I know
- I have verified that the commands `terraform init` and `terraform plan` execute successfully, but to fully verify functionality I would need to do a full deployment
	- I have decided that for the purpose of this excercise, I am not going to *actually* deploy to AWS, but instead just have the files prepared as if it was deployable (I assume this was the intent)
- The terraform I wrote is for the bare minimum to illustrate the base required architecture. In a production setting, here are some things I would do differently:
	- regional resources would be refactored into it's own terraform module
	- regional resources would be deployed using a multi region approach for redundancy
	- API Gateway would be configured with a custom domain using Route53
	- API Gateway would be configured with healthcheck that initiates failover to redundant region
	- API Gateway would be configured with proper authentication
	- API Gateway would be configured to deploy multiple stages for different environments (ex. test, qc, prod)
	- Lambda would be built with Lambda Alias to assist with versioning strategy with API 
	- S3 bucket would be locked down with more stringent permissions

### Backend
- Given the nature of the app being for a youth sports league, I made the assumption website traffic would be minimal
	- API Gateway + Lambda should be able to handle any reasonable volume with no performance issues
		- Had this been a high traffic application, I would have considered a microservice/containers approach 
	- DynamoDB can easily handle the data needs of this app, no need to consider a relational database design

### Testing
- Although I have 100% coverage with existing tests, in a production setting I would have written a separate integration/end-to-end test suite using something like Cypress
	- The existing tests do not test the browser's rendering of the React components and rely on rendering components within the scope of the test
	- A browser based test suite would give more confidence in test quality 

---

## Technology Stack

| Layer         | Technology                         | Reason for Choice                                            |
|--------------|------------------------------------|--------------------------------------------------------------|
| Frontend      | React 18, TypeScript, Vite         | Modern tooling, fast builds, strong typing                   |
| Styling       | TailwindCSS, DaisyUI               | Rapid, responsive design with minimal custom CSS            |
| Data Visualization       | Recharts               | Easy implementation, responsive, dynamic            |
| State Management | React Context API + Custom Hooks | Lightweight, scalable for current application size          |
| Fontend Testing       | Vitest, React Testing Library       | Fast unit/integration testing with minimal overhead         |
| Backend       | AWS Lambda, DynamoDB, API Gateway   | Serverless, auto-scaling, optimized for large datasets      |
| Backend Testing       | Jest       | Fast unit/integration testing with minimal overhead         |
| Infrastructure| Terraform                           | Reliable, repeatable infrastructure deployment              |

---

## Architecture Overview

### Frontend Structure

- **Vite**: Provides fast hot module replacement and build speeds.
- **React Router**: Manages page navigation.
- **LeagueContext (Context API)**:
  - Fetches games, players, and teams once at app load.
  - Provides global access to data via custom hooks (`useTeams`, `usePlayers`, `useGames`).
- **DaisyUI + TailwindCSS**: Ensures responsive design for mobile and desktop.
- **Recharts**: Used for dynamic, responsive data visualizations.

### Backend Structure

- **AWS Lambda**:
  - Serverless function acting as API backend.
  - Retrieves league data from DynamoDB.
- **DynamoDB**:
  - Key-value and document database designed for scalability.
  - Stores millions of records with efficient partitioning.
- **API Gateway**:
  - Manages API requests and integrates with Lambda function.
- **Terraform**:
  - Defines all cloud infrastructure as code.
  - Supports reproducibility and team collaboration.

---

## Performance Optimization Strategies

### Frontend Optimizations

- **Parallel API Fetching**  
  Used `Promise.all()` to load games, players, and teams concurrently in `LeagueContext`, reducing total load time.

- **Centralized Data Fetching**  
  Loaded data once in context and shared across pages — avoids duplicate API calls and redundant re-renders.

- **Minimal CSS Bundle**  
  TailwindCSS purges unused classes during build — this leads to a much smaller final CSS bundle than traditional frameworks.

- **Utility-First Styling**  
  Tailwind avoids creating complex CSS rulesheets — styles are scoped to markup, reducing style recalculation and reflows.

- **Responsive Design with Tailwind**  
  Tailwind’s breakpoint classes ensure optimized rendering for mobile, tablet, and desktop without separate layout logic.

- **Component Code Splitting (via Vite)**  
  Vite supports automatic code splitting, ensuring users only load what's needed for the initial route.

- **Lightweight Component Library (DaisyUI)**  
  DaisyUI adds minimal visual component overhead, avoiding the heavy styling payload of larger libraries like MUI.

### Backend Optimizations

- **Serverless Lambda Functions**  
  AWS Lambda automatically scales with request volume, avoiding idle compute and reducing cold start risk in low-traffic environments.

- **No Server Maintenance**  
  You eliminate the need for provisioned EC2s or containers — this removes overhead associated with autoscaling groups.

- **DynamoDB as a Scalable NoSQL Store**  
  DynamoDB provides highly performant reads and writes with predictable low latency, even at scale.

- **Terraform for Reproducibility**  
  Infrastructure is reliably reproducible — deployments are consistent and performant across environments.

---

## Scaling Considerations for Large Data Sets

- **DynamoDB Partition Strategy**  
  The backend uses DynamoDB, which supports virtually unlimited throughput when keys are well-partitioned. The data model is designed to scale with identifiers as partition keys.

- **Serverless Auto-Scaling**  
  AWS Lambda and API Gateway scale automatically in response to increased traffic without requiring any manual provisioning or tuning.

- **Stateless Architecture**  
  Backend services are stateless, which enables horizontal scalability. Each API request is isolated and can be handled independently by separate Lambda instances.

- **Pagination-Ready Frontend Architecture**  
  Although current data is loaded in bulk, the frontend architecture allows for easy implementation of future pagination or infinite scroll, enabling user interfaces to handle millions of records efficiently.

- **Lightweight Component Rendering**  
  Frontend visualizations (e.g., tables, charts) are componentized and memoized where appropriate, allowing the UI to remain performant as data scales.

- **Infrastructure as Code for Consistency**  
  Terraform ensures consistent, repeatable deployments across environments — critical when scaling to multiple environments (dev, test, prod) or managing growing infrastructure needs.



---

## Setup and Deployment Instructions

### Frontend (React)
From project root...
1. Install dependencies:
```bash
cd cct-analytics
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm run test
```

4. Generate coverage report:
```bash
npm run test:coverage
```
* Coverage reports are generated to `coverage` folder
* For  real application, I would setup report scripts in package.json to handle generating a PDF of generated reports and moving to an `Evidence of Test` folder

### Backend (AWS Infrastructure)
From project root...
1. Initialize Terraform:
```bash
cd infra/terraform
terraform init
```

2. Prepare Lambda code:
```bash
zip -r lambda_function.zip .
```

3. Deploy infrastructure:
```bash
terraform apply
```

4. Deploy Updates to Lambda code:

- Package Lambda function with zip file
- Upload the zip manually or redeploy via Terraform
```bash
aws lambda update-function-code \
  --function-name YOUR_FUNCTION_NAME \
  --zip-file fileb://lambda_function.zip \
  --region YOUR_REGION
  ```

---

## Testing and Coverage

- **Unit Tests**
  - `LeagueContext` (data layer)
  - Component tests (e.g., `TeamStandingsTable`)
  - Jest tests for lambda code
- **Integration Tests**
  - Full-page test coverage for `Dashboard`, `Players`, `Games`, etc.
- **Mocked Data Layer**
  - Tests use mocked API responses for deterministic results.
- **Code Coverage**
  - Maintained 100%, with coverage reports generated via Vitest and v8.

---

## Future Enhancements

- **Architecture Enhancements**
	- Deploying with a CloudFront distribution would be ideal for a number of reasons, but for the sake of time and sticking to requirements I did not implement this.
		- This would be one of the first things I would work on next (after wiring up the frontend to an actual deployed API instead of mocked JSON data).
	- Deploying API Gateway with a Load Balancer would help with performance if traffic was to increase exponentially
		- Load Balancer is not required for relatively low traffic so it was not implemented as part of this solution as it would have incurred unnecessary costs
- **Caching**
	- This is a relatively static data set (changes weekly) so the data could be cached on client side to reduce the number of API calls.
- **Authentication**
	- Implement AWS Cognito for secure login and admin access.
- **Additional Analytics**
	- Add additional analytics based on what the client wants to see.
	- I added what I thought was necessary for requirements (plus some extra) but there is still plenty of metrics/analytics I could show, especially with a larger dataset.
- **Admin Interface**
	- Web interface for managing teams, players, and games.
- **Aesthetics Customization**
	- Select a theme that aligns with individual team colors or the city/school district's branded colors.
	- Add team logos, team photos, player profile images, etc for a more polished look.
- **Data Features**
	- Ability to sort tables by columns
	- Full site text search to easily find a specific player, team, etc
	- Ability for user to provide a filter to scope Dashboard metrics (ex. filter top scorers by players on "Thunderbolts" team instead of all players)
	- Ability for users to export league data to CSV, Excel, PDF, etc for offline ditribution/analysis (player stats, game results, etc)
- **Pagination and Infinite Scrolling**  
  	- Implement paginated API responses and frontend infinite scrolling to efficiently handle millions of player, game, and team records.
	- Will be more important as the data set grows.
- **UI Component Refactoring**
	- I implemented some reusable React components, but there is room for some refactoring that could further simplify the code base and reduce code for similarly implemented components
	- `TopPlayersChart.tsx` is an example where I built the component in a reusable way independent of the data being passed in, there are more places where this could be done
- **Alerting, Monitoring, and Logging**
	- Introduce helpful logs throughout application for metrics, errors, etc that would be useful to track
	- Integrate tools into frontend and backend for proper monitoring/alerting
		- Logs: AWS CloudWatch, Splunk
		- Tracing: AWS XRay, Dynatrace
		- Alerting: AWS Clouwatch + SNS, Splunk, Dynatrace
	- Automatic alerts would be setup to trigger on certain metrics or error logs 
