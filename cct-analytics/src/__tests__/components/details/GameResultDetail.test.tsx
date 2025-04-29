import { render, screen } from "@testing-library/react";
import { GameResultDetail } from "../../../components/details/GameResultDetail";
import { Game } from "../../../types/Game";
import { describe, it, vi, expect } from "vitest";

const mockGetTeamName = ((teamId: string) => `Team ${teamId}`);
const mockGetPlayerName = ((playerId: string) => `Player ${playerId}`);

const mockGame: Game = {
	id: "1",
	location: "Stadium A",
	division: "Division 1",
	awayTeam: "team1",
	homeTeam: "team2",
	awayScore: 2,
	homeScore: 3,
	scorers: [
		{ playerId: "player1", goals: 1, team: "team1" },
		{ playerId: "player2", goals: 2, team: "team2" },
	],
	weatherConditions: "Sunny",
	attendance: 5000,
	referees: ["Referee A", "Referee B"],
	date: "2023-09-12"
};

describe("GameResultDetail", () => {

	it("renders the location and division", () => {
		render(
			<GameResultDetail
				game={mockGame}
				getTeamName={mockGetTeamName}
				getPlayername={mockGetPlayerName}
			/>
		);

		expect(screen.getByText("Stadium A")).toBeInTheDocument();
		expect(screen.getByText("Division 1")).toBeInTheDocument();
	});

	it("renders the team names and scores", () => {
		render(
			<GameResultDetail
				game={mockGame}
				getTeamName={mockGetTeamName}
				getPlayername={mockGetPlayerName}
			/>
		);

		expect(screen.getByText("Team team1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("Team team2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("renders the scorers for both teams", () => {
		render(
			<GameResultDetail
				game={mockGame}
				getTeamName={mockGetTeamName}
				getPlayername={mockGetPlayerName}
			/>
		);

		expect(screen.getByText("Player player1 (1)")).toBeInTheDocument();
		expect(screen.getByText("Player player2 (2)")).toBeInTheDocument();
	});

	it("renders the weather icon based on weather conditions", () => {
		assertWeatherConditionIcon("Sunny");
		assertWeatherConditionIcon("Cloudy");
		assertWeatherConditionIcon("Partly Cloudy");
		mockGame.weatherConditions = "Something Else";
		render(
			<GameResultDetail
				game={mockGame}
				getTeamName={mockGetTeamName}
				getPlayername={mockGetPlayerName}
			/>
		);
		expect(screen.getByTitle("unknown-weather")).toBeInTheDocument();
		expect(screen.getByText("Something Else")).toBeInTheDocument();
	});

	it("renders the attendance and referees", () => {
		render(
			<GameResultDetail
				game={mockGame}
				getTeamName={mockGetTeamName}
				getPlayername={mockGetPlayerName}
			/>
		);

		expectValueFromStatCard("Attendees", "5000");
		expect(screen.getByText("5000")).toBeInTheDocument();
		expect(screen.getByText("Referees")).toBeInTheDocument();
		expect(screen.getByText("Referee A")).toBeInTheDocument();
		expect(screen.getByText("Referee B")).toBeInTheDocument();
	});
});

function expectValueFromStatCard(title: string, value: string) {
	expect(screen.getByText(title)).toBeInTheDocument();
	const node = screen.getByText(title).nextSibling;
	expect(node).toHaveTextContent(value);
}

function assertWeatherConditionIcon(weatherCondition: string) {
	mockGame.weatherConditions = weatherCondition;
	render(
		<GameResultDetail
			game={mockGame}
			getTeamName={mockGetTeamName}
			getPlayername={mockGetPlayerName}
		/>
	);

	const icon = screen.getByTitle(weatherCondition);
	expect(icon).toBeInTheDocument();
}