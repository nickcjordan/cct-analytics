import { render, screen } from "@testing-library/react";
import { Dashboard } from "../../pages/Dashboard";
import { useLeague } from "../../context/LeagueContext";
import { LeagueProvider } from "../../context/LeagueContext";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Game } from "../../types/Game";
import { Player } from "../../types/Player";
import { Team } from "../../types/Team";


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
				buildGame("game-001"),
				buildGame("game-002"),
			].map((game, index) => ({
				...game,
				attendance: index === 0 ? 100 : 200,
				homeScore: index === 0 ? 2 : 3,
				awayScore: index === 0 ? 1 : 2,
			})),
			players: [
				buildPlayer("player-001"),
				buildPlayer("player-002"),
			].map((player, index) => ({
				...player,
				stats: {
					...player.stats,
					goalsScored: index === 0 ? 5 : 2,
					assists: index === 0 ? 3 : 4,
					gamesPlayed: index === 0 ? 10 : 8,
				},
			})),
			teams: [
				buildTeam("team-001"),
				buildTeam("team-002"),
			].map((team, index) => ({
				...team,
				name: index === 0 ? "Team A" : "Team B",
			})),
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


function buildGame(id: string): Game {
	return {
		id: id,
		date: "2023-09-05",
		homeTeam: "team-001",
		awayTeam: "team-002",
		homeScore: 3,
		awayScore: 2,
		location: "",
		division: "",
		attendance: 0,
		weatherConditions: "",
		scorers: [],
		referees: []
	}
}

function buildPlayer(id: string): Player {
	return {
		id: id,
		firstName: "First " + id,
		lastName: "Last " + id,
		stats: {
			goalsScored: 0,
			assists: 0,
			gamesPlayed: 0,
			yellowCards: 0,
			redCards: 0
		},
		age: 0,
		position: "",
		jerseyNumber: 0,
		teamId: "",
		attendance: []
	}
}

function buildTeam(id: string): Team {
	return {
		id: id,
		name: "Team " + id,
		division: "",
		coach: "",
		players: [],
		wins: 0,
		losses: 0,
		ties: 0,
		pointsScored: 0,
		pointsAllowed: 0,
	}
}