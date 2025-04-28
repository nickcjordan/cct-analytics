import { useLocation, useParams, Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Team } from "../types/Team";

interface LocationState {
  team: Team;
}

export function TeamDetail() {
//   const { teamId } = useParams<{ teamId: string }>();
  const location = useLocation();
  const state = location.state as LocationState;
  const team = state.team

  if (!team) {
    return <p className="p-6">Team not found.</p>;
  }

  return (
    <div className="p-6">
      <Link to="/teams" className="btn btn-secondary mb-4">← Back to Teams</Link>

      <Card>
        <h2 className="text-2xl font-bold mb-2">{team.name}</h2>
        <p className="text-gray-600 mb-1">Division: {team.division}</p>
        <p className="text-gray-600 mb-1">Coach: {team.coach}</p>
        <p className="text-gray-600 mb-1">Wins: {team.wins} | Losses: {team.losses} | Ties: {team.ties}</p>
        <p className="text-gray-600">
          Points Scored: {team.pointsScored} | Points Allowed: {team.pointsAllowed}
        </p>
      </Card>
    </div>
  );
}
