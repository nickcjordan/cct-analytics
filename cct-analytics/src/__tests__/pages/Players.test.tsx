import { render, screen } from "@testing-library/react";
import { Players } from "../../pages/Players";
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

describe("Players", () => {

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
			  <Players />
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
			  <Players />
			</LeagueProvider>
		  </MemoryRouter>);
		expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
	})

	it("renders Players page with details", () => {
		(useLeague as vi.Mock).mockReturnValue({
			games: [],
			players: [
				{
					"id": "player-012",
					"firstName": "Olivia",
					"lastName": "Williams",
					"age": 11,
					"position": "Defender",
					"jerseyNumber": 4,
					"teamId": "team-002",
					"stats": {
					  "gamesPlayed": 11,
					  "goalsScored": 1,
					  "assists": 3,
					  "yellowCards": 0,
					  "redCards": 0
					},
					"attendance": [
					  {"date": "2023-10-03", "present": true},
					  {"date": "2023-10-10", "present": false},
					]
				  },
				  {
					"id": "player-045",
					"firstName": "Liam",
					"lastName": "Brown",
					"age": 14,
					"position": "Forward",
					"jerseyNumber": 9,
					"teamId": "team-001",
					"stats": {
					  "gamesPlayed": 10,
					  "goalsScored": 12,
					  "assists": 4,
					  "yellowCards": 1,
					  "redCards": 0
					},
					"attendance": [
					  {"date": "2023-10-05", "present": true},
					  {"date": "2023-10-12", "present": false}
					]
				  },
			],
			teams: [
				{ "id": "team-001", "name": "Team A" }
			],
			loading: false,
			error: null,
		});

		render(<MemoryRouter>
			<LeagueProvider>
			  <Players />
			</LeagueProvider>
		  </MemoryRouter>);

		expect(screen.getByText("Players")).toBeInTheDocument();
		expect(screen.getByText("Olivia Williams")).toBeInTheDocument();
		expect(screen.getByText("Liam Brown")).toBeInTheDocument();
		expect(screen.getByText("Defender")).toBeInTheDocument();
		expect(screen.getByText("Forward")).toBeInTheDocument();
		expect(screen.getByText("Team A")).toBeInTheDocument();
		expect(screen.getByText("team-002")).toBeInTheDocument(); // Fallback for team name

	});
});
