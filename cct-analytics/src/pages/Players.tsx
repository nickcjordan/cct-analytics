import { useLeagueData } from "../hooks/useLeagueData";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";

export function Players() {
	const { players, teams, loading, error } = useLeagueData({ players: true, teams: true });

	if (loading) return <p className="p-6">Loading...</p>;
	if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

	players.sort((a, b) => a.lastName.localeCompare(b.lastName));

	function getTeamName(teamId: string): string {
		console.log("teamId", teamId);
		const team = teams.find((team) => team.id === teamId);
		return team ? team.name : teamId;
	}

	return (
		<div className="max-w-3/4 mx-auto p-6">
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-4 text-primary justify-self-center">Players</h1>
			</div>
			<div className="p-6">
				MAKE THIS A TABLE
				<ul className="list bg-base-100 rounded-box shadow-md">
					{players.map((player) => (
						<Link to={`/players/${player.id}`} key={player.id} state={{ player }}>
							<li className="list-row grid grid-cols-4 items-center">
								<div className="grid-rows-2">
									<div className="text-xl font-bold mb-2">
										{player.firstName} {player.lastName}
									</div>
								
									<div className="text-xl font-bold mb-2">
										{getTeamName(player.teamId)}
									</div>
								</div>
								<p className="text-gray-600 mb-1 badge badge-soft">{player.position}</p>
								<p className="text-gray-600 mb-1"> Goals: {player.stats.goalsScored}</p>
								<p className="text-gray-600">
									 | Assists: {player.stats.assists}
								</p>
							</li>
						</Link>
					))}
				</ul>

			</div>
		</div>
	);
}
