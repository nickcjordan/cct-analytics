import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TeamStandingsTable } from "../../../components/tables/TeamStandingsTable";
import { Team } from "../../../types/Team";
import { Player } from "../../../types/Player";

describe("TeamStandingsTable", () => {
	const mockTeams: Team[] = [
		{
			id: "1",
			name: "Team A",
			division: "Division 1",
			wins: 10,
			losses: 2,
			ties: 1,
			pointsScored: 300,
			pointsAllowed: 200,
			coach: "",
			players: []
		},
		{
			id: "2",
			name: "Team B",
			division: "Division 2",
			wins: 8,
			losses: 4,
			ties: 1,
			pointsScored: 250,
			pointsAllowed: 220,
			coach: "",
			players: []
		},
	];

	const mockPlayers: Player[] = [
		{
			id: "1", firstName: "Player 1", teamId: "1",
			lastName: "",
			age: 0,
			position: "",
			jerseyNumber: 0,
			stats: {
				gamesPlayed: 0,
				goalsScored: 0,
				assists: 0,
				yellowCards: 0,
				redCards: 0
			},
			attendance: []
		},
		{
			id: "2", firstName: "Player 2", teamId: "2",
			lastName: "",
			age: 0,
			position: "",
			jerseyNumber: 0,
			stats: {
				gamesPlayed: 0,
				goalsScored: 0,
				assists: 0,
				yellowCards: 0,
				redCards: 0
			},
			attendance: []
		},
	];

	it("renders the table with correct headers", () => {
		render(
			<MemoryRouter>
				<TeamStandingsTable teams={mockTeams} players={mockPlayers} />
			</MemoryRouter>
		);

		const headers = ["#", "Team", "Division", "Wins", "Losses", "Ties", "Scored", "Allowed", "Differential"];
		headers.forEach((header) => {
			expect(screen.getByText(header)).toBeInTheDocument();
		});
	});

	it("renders the correct number of rows", () => {
		render(
			<MemoryRouter>
				<TeamStandingsTable teams={mockTeams} players={mockPlayers} />
			</MemoryRouter>
		);

		const rows = screen.getAllByRole("row");
		// 1 header row + 2 team rows
		expect(rows).toHaveLength(mockTeams.length + 1);
	});

	it("renders team data correctly", () => {
		render(
			<MemoryRouter>
				<TeamStandingsTable teams={mockTeams} players={mockPlayers} />
			</MemoryRouter>
		);

		mockTeams.forEach((team, index) => {
			expect(screen.getByText(team.name)).toBeInTheDocument();
			expect(screen.getByText(team.division)).toBeInTheDocument();
		});
	});

	it("sorts teams by wins and losses", () => {
		const unsortedTeams: Team[] = [
			{
				id: "1", name: "Team A", division: "Division 1", wins: 8, losses: 4, ties: 1, pointsScored: 300, pointsAllowed: 200,
				coach: "",
				players: []
			},
			{
				id: "2", name: "Team B", division: "Division 2", wins: 10, losses: 2, ties: 1, pointsScored: 250, pointsAllowed: 220,
				coach: "",
				players: []
			},
		];

		render(
			<MemoryRouter>
				<TeamStandingsTable teams={unsortedTeams} players={mockPlayers} />
			</MemoryRouter>
		);

		const rows = screen.getAllByRole("row");
		expect(rows[1]).toHaveTextContent("Team B");
		expect(rows[2]).toHaveTextContent("Team A");
	});

	it("renders links to team pages", () => {
		render(
			<MemoryRouter>
				<TeamStandingsTable teams={mockTeams} players={mockPlayers} />
			</MemoryRouter>
		);

		mockTeams.forEach((team) => {
			const link = screen.getByText(team.name).closest("a");
			expect(link).toHaveAttribute("href", `/teams/${team.id}`);
		});
	});
});