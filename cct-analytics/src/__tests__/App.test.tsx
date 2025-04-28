import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("App Component", () => {
	test("renders Navbar component", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("CCT Analytics")).toBeInTheDocument();
	});

	test("renders Dashboard page by default", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
	});

	test("renders Teams page when navigating to /teams", () => {
		render(
			<MemoryRouter initialEntries={["/teams"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText(/teams/i)).toBeInTheDocument();
	});

	test("renders Players page when navigating to /players", () => {
		render(
			<MemoryRouter initialEntries={["/players"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText(/players/i)).toBeInTheDocument();
	});

	test("renders Games page when navigating to /games", () => {
		render(
			<MemoryRouter initialEntries={["/games"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText(/games/i)).toBeInTheDocument();
	});

});