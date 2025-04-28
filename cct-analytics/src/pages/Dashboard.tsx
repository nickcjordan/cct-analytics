import { useLeagueData } from "../hooks/useLeagueData";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { TopScorersChart } from "../components/charts/TopScorersChart";
import { TopPlayMakersChart } from "../components/charts/TopPlayMakersChart";
import { TeamStandingsTable } from "../components/tables/TeamStandingsTable";
import { TopPlayersChart } from "../components/charts/TopPlayersChart";
import { Player } from "../types/Player";

export function Dashboard() {
	const { games, players, teams, loading, error } = useLeagueData();

	if (loading) return <p className="p-6">Loading...</p>;
	if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

	const totalGamesPlayed = games.length;
	const averageAttendance = games.reduce((sum, game) => sum + game.attendance, 0) / games.length;
	const totalGoals = games.reduce((sum, game) => sum + (game.homeScore + game.awayScore), 0);
	const averageGoalsPerGame = totalGoals / games.length;
	const averageScoreDeficit = games.reduce((sum, game) => sum + Math.abs(game.homeScore - game.awayScore), 0) / games.length;

	return (
		<div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<StatCard title={"Total Games Played"} value={totalGamesPlayed} />
			<StatCard title={"Average Attendance"} value={averageAttendance.toFixed(0)} description={"people per game"} />
			<StatCard title={"Average Scores"} value={averageGoalsPerGame.toFixed(1)} description={"goals per game"} />
			<StatCard title={"Average Deficit"} value={averageScoreDeficit.toFixed(1)} description={"more goals scored by winner"} />

			<div className="col-span-1 md:col-span-2 lg:col-span-2">
				<TopScorersChart players={players} />
			</div>

			<div className="col-span-1 md:col-span-2 lg:col-span-2">
				<TopPlayMakersChart players={players} />
			</div>
			
			<div className="col-span-1 md:col-span-2 lg:col-span-2">
				<TopPlayersChart players={players} title={"Top Contributors"} calculateValue={(player: Player) => player.stats.assists + player.stats.goalsScored}/>
			</div>

			<div className="col-span-1 md:col-span-2 lg:col-span-4">
				<TeamStandingsTable teams={teams} />
			</div>
		</div>
	);
}
