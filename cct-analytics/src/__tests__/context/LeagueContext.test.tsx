import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { LeagueProvider, useLeague } from "../../context/LeagueContext";

vi.mock("../../data/leagueData", () => ({
	leagueData: {
		getGames: vi.fn(),
		getPlayers: vi.fn(),
		getTeams: vi.fn(),
	},
}));

import { leagueData } from "../../data/leagueData";
import { Game } from "../../types/Game";
import { Player } from "../../types/Player";
import { Team } from "../../types/Team";
const mockedLeagueData = vi.mocked(leagueData, true);

function TestConsumer() {
	const { games, players, teams, loading, error } = useLeague();

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<div data-testid="games">{games.length}</div>
			<div data-testid="players">{players.length}</div>
			<div data-testid="teams">{teams.length}</div>
		</div>
	);
}

describe("LeagueContext", () => {
	beforeEach(() => {
		vi.clearAllMocks(); // reset mocked fn calls
	});

	it("provides loaded data to children", async () => {
		mockedLeagueData.getGames.mockResolvedValue([buildGame("game1")]);
		mockedLeagueData.getPlayers.mockResolvedValue([buildPlayer("player1")]);
		mockedLeagueData.getTeams.mockResolvedValue([buildTeam("team1")]);

		render(
			<LeagueProvider>
				<TestConsumer />
			</LeagueProvider>
		);

		await waitFor(() => {
			expect(screen.getByTestId("games")).toHaveTextContent("1");
			expect(screen.getByTestId("players")).toHaveTextContent("1");
			expect(screen.getByTestId("teams")).toHaveTextContent("1");
		});
	});

	it("shows an error if a fetch fails", async () => {
		mockedLeagueData.getGames.mockRejectedValueOnce(new Error("Failure"));
		mockedLeagueData.getPlayers.mockResolvedValue([]);
		mockedLeagueData.getTeams.mockResolvedValue([]);

		render(
			<LeagueProvider>
				<TestConsumer />
			</LeagueProvider>
		);

		await waitFor(() => {
			expect(screen.getByText(/error/i)).toBeInTheDocument();
			expect(screen.getByText(/failure/i)).toBeInTheDocument();
		});
	});

	it("shows an error if a fetch fails more coverage", async () => {
		mockedLeagueData.getGames.mockRejectedValueOnce({ whatThisIs: "error"});
		mockedLeagueData.getPlayers.mockResolvedValue([]);
		mockedLeagueData.getTeams.mockResolvedValue([]);

		render(
			<LeagueProvider>
				<TestConsumer />
			</LeagueProvider>
		);

		await waitFor(() => {
			expect(screen.getByText(/error/i)).toBeInTheDocument();
			expect(screen.getByText(/An unknown error occurred./i)).toBeInTheDocument();
		});

		
	});

	it("handles unknown errors gracefully", async () => {
		mockedLeagueData.getGames.mockRejectedValueOnce(null); // Simulate an unknown error
		mockedLeagueData.getPlayers.mockResolvedValue([]);
		mockedLeagueData.getTeams.mockResolvedValue([]);

		try {
			render(
					<TestConsumer />
			);
		} catch (e: any) {
			expect(e.message).toBe("useLeague must be used within a LeagueProvider");
		}

	});
});

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