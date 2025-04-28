import { render, screen } from "@testing-library/react";
import { Dashboard } from "../../pages/Dashboard";
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

describe("Dashboard", () => {

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
			  <Dashboard />
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
			  <Dashboard />
			</LeagueProvider>
		  </MemoryRouter>);
		expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
	})

	it("renders dashboard with stats and charts", () => {
		(useLeague as vi.Mock).mockReturnValue({
			games: [
				{ attendance: 100, homeScore: 2, awayScore: 1 },
				{ attendance: 200, homeScore: 3, awayScore: 2 },
			],
			players: [
				{ stats: { goalsScored: 5, assists: 3, gamesPlayed: 10 } },
				{ stats: { goalsScored: 2, assists: 4, gamesPlayed: 8 } },
			],
			teams: [{ name: "Team A" }, { name: "Team B" }],
			loading: false,
			error: null,
		});

		render(<MemoryRouter>
			<LeagueProvider>
			  <Dashboard />
			</LeagueProvider>
		  </MemoryRouter>);

		expectValueFromStatCard("Total Games Played", "2");
		expectValueFromStatCard("Average Attendance", "150");
		expectValueFromStatCard("Average Scores", "4.0");
		expectValueFromStatCard("Average Deficit", "1.0");


		expect(screen.getByText("Top Scorers")).toBeInTheDocument();
		expect(screen.getByText("Top Play Makers")).toBeInTheDocument();
		expect(screen.getByText("Top Contributors")).toBeInTheDocument();
		expect(screen.getByText("Best Attendance")).toBeInTheDocument();

		expect(screen.getByText("Team A")).toBeInTheDocument();
		expect(screen.getByText("Team B")).toBeInTheDocument();
	});
});

function expectValueFromStatCard(title: string, value: string) {
	expect(screen.getByText(title)).toBeInTheDocument();
	const totalGamesPlayedNode = screen.getByText(title).nextSibling;
	expect(totalGamesPlayedNode).toHaveTextContent(value);
}