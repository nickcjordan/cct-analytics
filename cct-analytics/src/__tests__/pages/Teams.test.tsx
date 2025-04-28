import { render, screen } from "@testing-library/react";
import { Teams } from "../../pages/Teams";
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

describe("Teams", () => {

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
			  <Teams />
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
			  <Teams />
			</LeagueProvider>
		  </MemoryRouter>);
		expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
	})

	it("renders Teams page with details", () => {
		(useLeague as vi.Mock).mockReturnValue({
			games: [],
			players: [],
			teams: [
				{
					"id": "team-001",
					"name": "Thunderbolts",
					"division": "U12",
					"coach": "Sarah Johnson",
					"wins": 8,
					"losses": 2,
					"ties": 1,
					"pointsScored": 42,
					"pointsAllowed": 18,
					"players": ["player-045", "player-002", "player-003", "player-004", "player-005", "player-006", "player-007", "player-008", "player-009", "player-010", "player-011"]
				  },
				  {
					"id": "team-001",
					"name": "Lightning",
					"division": "U14",
					"coach": "Sarah Johnson",
					"wins": 8,
					"losses": 2,
					"ties": 1,
					"pointsScored": 42,
					"pointsAllowed": 18,
					"players": ["player-045", "player-002", "player-003", "player-004", "player-005", "player-006", "player-007", "player-008", "player-009", "player-010", "player-011"]
				  }
			],
			loading: false,
			error: null,
		});

		render(<MemoryRouter>
			<LeagueProvider>
			  <Teams />
			</LeagueProvider>
		  </MemoryRouter>);

		expect(screen.getByText("Teams")).toBeInTheDocument();
		expect(screen.getByText("Thunderbolts")).toBeInTheDocument();
		expect(screen.getByText("Lightning")).toBeInTheDocument();
		expect(screen.getByText("U12")).toBeInTheDocument();
		expect(screen.getByText("U14")).toBeInTheDocument();

	});
});
