import { useLeague } from "../context/LeagueContext";
import { TeamsTable } from "../components/tables/TeamsTable";
import { Team } from "../types/Team";

export function Teams() {

	const { players, teams, loading, error } = useLeague();

	if (loading) return <p className="p-6">Loading...</p>;
	if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

	const teamsByDivision = teams.reduce((acc: Record<string, Team[]>, team: Team) => {
		const division = team.division;
		if (!acc[division]) {
			acc[division] = [];
		}
		acc[division].push(team);
		return acc;
	}, {} as Record<string, Team[]>);

	return (
		<div className="mx-auto p-6">
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-4 text-primary justify-self-center">Teams</h1>
			</div>
			<div className="p-6">
				{Object.entries(teamsByDivision).map(([division, teamsList]) => (
					<div key={division} className="mb-6">
						<h2 className="text-2xl font-semibold mb-2">{division + " Division"}</h2>
							<TeamsTable teams={teamsList} players={players} />
					</div>
				))}
				
			</div>
		</div>
	);
}
