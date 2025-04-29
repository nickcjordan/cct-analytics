import { useLeague } from "../context/LeagueContext";
import { PlayersTable } from "../components/tables/PlayersTable";

export function Players() {
	const { players, teams, loading, error } = useLeague();

	if (loading) return <p className="p-6">Loading...</p>;
	if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

	players.sort((a, b) => a.lastName.localeCompare(b.lastName));

	function getTeamName(teamId: string): string {
		const team = teams.find((team) => team.id === teamId);
		return team ? team.name : teamId;
	}

	return (
		<div className="mx-auto p-6">
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-4 text-primary justify-self-center">Players</h1>
			</div>
			<div className="p-6">
				<PlayersTable players={players} getTeamName={getTeamName} />
			</div>
		</div>
	);
}
