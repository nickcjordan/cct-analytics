import { render, screen } from "@testing-library/react";
import { Games } from "../../pages/Games";
import { useLeague } from "../../context/LeagueContext";
import { LeagueProvider } from "../../context/LeagueContext";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";


vi.mock("../../context/LeagueContext", () => ({
	useLeague: vi.fn(),
	LeagueProvider: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

describe("Games", () => {

	it("renders loading state", () => {
		(useLeague as vi.Mock).mockReturnValue({
			games: [],
			players: [],
			teams: [],
			loading: true,
			error: null,
		});

		render(<MemoryRouter>
			<LeagueProvider>
			  <Games />
			</LeagueProvider>
		  </MemoryRouter>);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	})

	it("renders error state", () => {
		(useLeague as vi.Mock).mockReturnValue({
			games: [],
			players: [],
			teams: [],
			loading: false,
			error: "Failed to fetch data",
		});

		render(<MemoryRouter>
			<LeagueProvider>
			  <Games />
			</LeagueProvider>
		  </MemoryRouter>);
		expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
	})

	it("renders Games page with details", () => {
		(useLeague as vi.Mock).mockReturnValue({
			games: [
				{
					"id": "game-001",
					"date": "2023-09-05",
					"homeTeam": "team-001",
					"awayTeam": "team-002",
					"homeScore": 3,
					"awayScore": 2,
					"location": "Central Park Field",
					"division": "U12",
					"attendance": 145,
					"weatherConditions": "Sunny",
					"scorers": [
						{ "playerId": "player-001", "goals": 2, "team": "team-001" },
						{ "playerId": "player-003", "goals": 1, "team": "team-001" },
						{ "playerId": "player-012", "goals": 1, "team": "team-002" },
						{ "playerId": "player-015", "goals": 1, "team": "team-002" }
					],
					"referees": ["John Smith", "Maria Garcia"]
				}
			],
			players: [
				{ "id": "player-001", "firstName": "John", "lastName": "Doe" },
			],
			teams: [
				{ "id": "team-001", "name": "Team A" }
			],
			loading: false,
			error: null,
		});

		render(<MemoryRouter>
			<LeagueProvider>
			  <Games />
			</LeagueProvider>
		  </MemoryRouter>);

		expect(screen.getByText("Game Results")).toBeInTheDocument();

		// Check if the game date is rendered
		expect(screen.getByText("09/05/2023")).toBeInTheDocument();

		// Check if the game details are rendered
		expect(screen.getByText("Central Park Field")).toBeInTheDocument();
		expect(screen.getByText("U12")).toBeInTheDocument();

		// Check if the scorers are rendered
		expect(screen.getByText("John Doe (2)")).toBeInTheDocument();
		expect(screen.getByText("player-003 (1)")).toBeInTheDocument();
		expect(screen.getByText("player-012 (1)")).toBeInTheDocument();
		expect(screen.getByText("player-015 (1)")).toBeInTheDocument();
		
		expect(screen.getByText("Team A")).toBeInTheDocument();
		expect(screen.getByText("team-002")).toBeInTheDocument();
		// Check if the referees are rendered
		expect(screen.getByText("Referees")).toBeInTheDocument();
		expect(screen.getByText("John Smith")).toBeInTheDocument();
		expect(screen.getByText("Maria Garcia")).toBeInTheDocument();

		expectValueFromStatCard("Attendees", "145");
	});
});

function expectValueFromStatCard(title: string, value: string) {
	expect(screen.getByText(title)).toBeInTheDocument();
	const node = screen.getByText(title).nextSibling;
	expect(node).toHaveTextContent(value);
}