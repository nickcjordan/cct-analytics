import { useLocation, useParams, Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Player } from "../types/Player";

interface LocationState {
  player: Player;
}

export function PlayerDetail() {
//   const { playerId } = useParams<{ playerId: string }>();

  const location = useLocation();
  const state = location.state as LocationState;

  const player = state.player;

  // Dummy numbers — replace with real calculation based on your games data
	const totalLeagueGames = 50; // e.g., games.length
	const gamesAttended = Object.values(player.attendance).filter(attended => attended).length;

	const attendancePercent = (gamesAttended / totalLeagueGames) * 100;

	const goalContributions = player.stats.goalsScored + player.stats.assists;

	// You would need team total goals to calculate real contribution %
	// For now, you could mock it:
	const teamTotalGoals = 100; // Pretend team scored 100 goals
	const goalContributionPercent = (goalContributions / teamTotalGoals) * 100;


  if (!player) {
    return <p className="p-6">Player not found.</p>;
  }

  return (
    <div className="p-6">
      <Link to="/players" className="btn btn-secondary mb-4">← Back to Players</Link>

      <Card>
		<h3 className="text-2xl font-bold mb-4">Performance Metrics</h3>
		<ul className="space-y-2 text-gray-700">
			<li><strong>Games Played:</strong> {player.stats.gamesPlayed}</li>
			<li><strong>Goals Scored:</strong> {player.stats.goalsScored}</li>
			<li><strong>Assists:</strong> {player.stats.assists}</li>
			<li><strong>Goals per Game:</strong> {(player.stats.goalsScored / player.stats.gamesPlayed).toFixed(2)}</li>
			<li><strong>Assists per Game:</strong> {(player.stats.assists / player.stats.gamesPlayed).toFixed(2)}</li>
			<li><strong>Attendance %:</strong> {attendancePercent.toFixed(1)}%</li>
			<li><strong>Goal Contributions:</strong> {goalContributions}</li>
			<li><strong>Goal Contribution % of Team:</strong> {goalContributionPercent.toFixed(1)}%</li>
			{/* Optional */}
			{/* <li><strong>Win Rate When Played:</strong> {winRate.toFixed(1)}%</li> */}
		</ul>
		</Card>

    </div>
  );
}
