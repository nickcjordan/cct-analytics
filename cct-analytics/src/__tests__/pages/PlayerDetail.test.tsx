import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PlayerDetail } from "../../pages/PlayerDetail";
import { Player } from "../../types/Player";

const mockPlayer: Player = {
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
};

const mockLocationState = {
	player: mockPlayer,
	teamName: "Dream Team",
};

describe("PlayerDetail", () => {
	it("renders player details correctly", () => {
		render(
			<MemoryRouter initialEntries={[{ pathname: "/player-detail", state: mockLocationState }]}>
				<Routes>
					<Route path="/player-detail" element={<PlayerDetail />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("#10")).toBeInTheDocument();
		expect(screen.getByText("Forward")).toBeInTheDocument();
		expect(screen.getByText("Dream Team")).toBeInTheDocument();
		expect(screen.getByText("Games Played")).toBeInTheDocument();
		expect(screen.getByText("20")).toBeInTheDocument();
		expect(screen.getByText("Goals Scored")).toBeInTheDocument();
		expect(screen.getByText("15")).toBeInTheDocument();
		expectValueFromStatCard("Assists", "5");
		expectValueFromStatCard("Yellow Cards", "2");
		expectValueFromStatCard("Red Cards", "0");
		expectValueFromStatCard("Attendance", "50%");
	});

	it("renders attendance table correctly", () => {
		render(
			<MemoryRouter initialEntries={[{ pathname: "/player-detail", state: mockLocationState }]}>
				<Routes>
					<Route path="/player-detail" element={<PlayerDetail />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByText("2023-01-01")).toBeInTheDocument();
		expect(screen.getByText("2023-01-02")).toBeInTheDocument();
	});

	it("renders 'Player not found' if no player is provided", () => {
		render(
			<MemoryRouter initialEntries={[{ pathname: "/player-detail", state: {} }]}>
				<Routes>
					<Route path="/player-detail" element={<PlayerDetail />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByText("Player not found.")).toBeInTheDocument();
	});

	it("renders back to players link", () => {
		render(
			<MemoryRouter initialEntries={[{ pathname: "/player-detail", state: mockLocationState }]}>
				<Routes>
					<Route path="/player-detail" element={<PlayerDetail />} />
				</Routes>
			</MemoryRouter>
		);

		const backLink = screen.getByText("← Back to Players");
		expect(backLink).toBeInTheDocument();
		expect(backLink).toHaveAttribute("href", "/players");
	});
});

function expectValueFromStatCard(title: string, value: string) {
	expect(screen.getByText(title)).toBeInTheDocument();
	const node = screen.getByText(title).nextSibling;
	expect(node).toHaveTextContent(value);
}