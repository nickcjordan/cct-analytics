import { Link } from "react-router-dom";

export function Navbar() {
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
      </div>
    </div>
  );
}
