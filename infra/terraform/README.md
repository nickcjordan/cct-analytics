# Infrastructure - Terraform for CCT League Analytics

This Terraform project provisions the infrastructure for the CCT League Analytics Dashboard:

- S3 bucket hosting the React/Vite frontend
- Lambda function for backend API (serving league data)
- API Gateway to expose the Lambda function

## Prerequisites

- Terraform v1.x installed
- AWS CLI configured (`aws configure`) with appropriate credentials
- Node.js installed (for Vite frontend build)

---

You must have appropriate AWS permissions to create:
- S3 Buckets
- Lambda Functions
- API Gateway HTTP APIs
- DynamoDB Tables
- IAM Roles and Policies

## Project Structure

```bash
terraform/
├── main.tf          # Defines all AWS resources (S3, Lambda, API Gateway)
├── variables.tf     # Variables used in Terraform
├── outputs.tf       # Outputs important endpoints after deploy
├── lambda/
│    └── index.js    # Lambda function code
```

## Setup

1. Build frontend from the react project's root "cct-analytics" folder: 
```bash
npm install
npm run build
```
2. Package lambda function from "infra/terraform" folder:
```bash
cd lambda
zip -r ../lambda.zip .
```
3. Initialize terraform from "terraform" folder:
```bash
terraform init
```
4. Plan infra deployment:
```bash
terraform plan -var="website_bucket_name=your-unique-frontend-bucket-name"
```
5. Deploy infrastructure:
```bash
terraform apply -var="website_bucket_name=your-unique-frontend-bucket-name"
```
6. Upload frontend build to S3 bucket:
```bash
aws s3 sync ../frontend/dist/ s3://your-unique-frontend-bucket-name
```