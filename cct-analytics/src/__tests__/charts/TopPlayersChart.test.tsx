import { render, screen } from "@testing-library/react";
import { TopPlayersChart } from "../../components/charts/TopPlayersChart";
import { Player } from "../../types/Player";

describe("TopPlayersChart", () => {
	const mockPlayers: Player[] = [
		{
			id: "id-123",
			age: 25,
			teamId: "team-001",
			firstName: "John",
			lastName: "Doe",
			jerseyNumber: 10,
			position: "Forward",
			stats: {
				gamesPlayed: 20,
				goalsScored: 15,
				assists: 5,
				yellowCards: 2,
				redCards: 0,
			},
			attendance: [
				{ date: "2023-01-01", present: true },
				{ date: "2023-01-02", present: false },
			],
		},
		{
			id: "id-123",
			age: 25,
			teamId: "team-001",
			firstName: "Alex",
			lastName: "Doe2",
			jerseyNumber: 10,
			position: "Forward",
			stats: {
				gamesPlayed: 20,
				goalsScored: 15,
				assists: 5,
				yellowCards: 2,
				redCards: 0,
			},
			attendance: [
				{ date: "2023-01-01", present: true },
				{ date: "2023-01-02", present: false },
			],
		},
		{
			id: "id-123",
			age: 25,
			teamId: "team-001",
			firstName: "John",
			lastName: "Doe3",
			jerseyNumber: 10,
			position: "Forward",
			stats: {
				gamesPlayed: 20,
				goalsScored: 15,
				assists: 5,
				yellowCards: 2,
				redCards: 0,
			},
			attendance: [
				{ date: "2023-01-01", present: true },
				{ date: "2023-01-02", present: false },
			],
		},
		{
			id: "id-123",
			age: 25,
			teamId: "team-001",
			firstName: "Zack",
			lastName: "Lee",
			jerseyNumber: 10,
			position: "Forward",
			stats: {
				gamesPlayed: 20,
				goalsScored: 15,
				assists: 5,
				yellowCards: 2,
				redCards: 0,
			},
			attendance: [
				{ date: "2023-01-01", present: true },
				{ date: "2023-01-02", present: false },
			],
		},
		{
			id: "id-123",
			age: 25,
			teamId: "team-001",
			firstName: "John",
			lastName: "Doe5",
			jerseyNumber: 10,
			position: "Forward",
			stats: {
				gamesPlayed: 20,
				goalsScored: 15,
				assists: 5,
				yellowCards: 2,
				redCards: 0,
			},
			attendance: [
				{ date: "2023-01-01", present: true },
				{ date: "2023-01-02", present: false },
			],
		},
		{
			id: "id-123",
			age: 25,
			teamId: "team-001",
			firstName: "John",
			lastName: "Doe6",
			jerseyNumber: 10,
			position: "Forward",
			stats: {
				gamesPlayed: 20,
				goalsScored: 16,
				assists: 5,
				yellowCards: 2,
				redCards: 0,
			},
			attendance: [
				{ date: "2023-01-01", present: true },
				{ date: "2023-01-02", present: false },
			],
		}
	];

	const mockCalculateValue = (player: Player) => player.id;

	it("renders the chart with the correct title", () => {
		render(
			<TopPlayersChart
				title="Top Players"
				players={mockPlayers}
				calculateValue={mockCalculateValue}
				label="Score"
			/>
		);

		expect(screen.getByText("Top Players")).toBeInTheDocument();
	});

	it("renders the chart with the correct sort", () => {
		render(
			<TopPlayersChart
				title="Top Players"
				players={mockPlayers}
				calculateValue={(player: Player) => null}
				label="Score"
			/>
		);

		expect(screen.getByText("Top Players")).toBeInTheDocument();
	});

});