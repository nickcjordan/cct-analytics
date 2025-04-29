import { Link } from "react-router-dom";

export function Navbar() {

	// grabbed icon svg from web
	const sunIcon = <svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<circle cx="12" cy="12" r="5" />
		<path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
	</svg>;

	const moonIcon = <svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>;

	return (
		<div className="navbar bg-base-100 shadow mb-6">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost normal-case text-xl">
					CCT Analytics
				</Link>
			</div>
			<div className="flex-none gap-2">
				<Link to="/" className="btn btn-ghost">Dashboard</Link>
				<Link to="/teams" className="btn btn-ghost">Teams</Link>
				<Link to="/players" className="btn btn-ghost">Players</Link>
				<Link to="/games" className="btn btn-ghost">Games</Link>
				<div className="btn btn-ghost">
					<label className="flex cursor-pointer gap-2">
						{moonIcon}
						<input type="checkbox" value="light" className="toggle theme-controller" />
						{sunIcon}
					</label>
				</div>
			</div>
		</div>
	);
}
