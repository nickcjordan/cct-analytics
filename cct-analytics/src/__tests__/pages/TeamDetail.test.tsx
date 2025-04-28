import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TeamDetail } from "../../pages/TeamDetail";
import { Team } from "../../types/Team";
import { Player } from "../../types/Player";

describe("TeamDetail", () => {
	const mockTeam: Team = {
		id: "1",
		name: "Mock Team",
		division: "Mock Division",
		coach: "Mock Coach",
		wins: 10,
		losses: 5,
		ties: 2,
		pointsScored: 300,
		pointsAllowed: 250,
		players: ["player1", "player2"],
	};

	const mockPlayers: Player[] = [
		{
			id: "player1", firstName: "John", lastName: "Doe",
			age: 0,
			position: "",
			jerseyNumber: 0,
			teamId: "",
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
			id: "player2", firstName: "Jane", lastName: "Smith",
			age: 0,
			position: "",
			jerseyNumber: 0,
			teamId: "",
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

	const renderComponent = (state: any) => {
		render(
			<MemoryRouter initialEntries={[{ pathname: "/team-detail", state }]}>
				<Routes>
					<Route path="/team-detail" element={<TeamDetail />} />
				</Routes>
			</MemoryRouter>
		);
	};

	it("renders 'Team not found' if no team is provided", () => {
		renderComponent({});
		expect(screen.getByText("Team not found.")).toBeInTheDocument();
	});

	it("renders team details correctly", () => {
		renderComponent({ team: mockTeam, players: mockPlayers });

		expect(screen.getByText("Mock Team")).toBeInTheDocument();
		expect(screen.getByText("(Mock Division)")).toBeInTheDocument();
		expect(screen.getByText("Coach: Mock Coach")).toBeInTheDocument();
		expect(screen.getByText("Wins")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
		expect(screen.getByText("Losses")).toBeInTheDocument();
		expect(screen.getByText("5")).toBeInTheDocument();
		expect(screen.getByText("Ties")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("Points Scored")).toBeInTheDocument();
		expect(screen.getByText("300")).toBeInTheDocument();
		expect(screen.getByText("Points Allowed")).toBeInTheDocument();
		expect(screen.getByText("250")).toBeInTheDocument();
		expect(screen.getByText("Deficit")).toBeInTheDocument();
		expect(screen.getByText("50")).toBeInTheDocument();
	});

	it("renders players list correctly", () => {
		renderComponent({ team: mockTeam, players: mockPlayers });

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
	});

	it("renders player ID if player is not found", () => {
		const teamWithUnknownPlayer = {
			...mockTeam,
			players: ["unknownPlayer"],
		};

		renderComponent({ team: teamWithUnknownPlayer, players: mockPlayers });

		expect(screen.getByText("unknownPlayer")).toBeInTheDocument();
	});

	it("renders back to teams link", () => {
		renderComponent({ team: mockTeam, players: mockPlayers });

		const backLink = screen.getByText("← Back to Teams");
		expect(backLink).toBeInTheDocument();
		expect(backLink).toHaveAttribute("href", "/teams");
	});
});