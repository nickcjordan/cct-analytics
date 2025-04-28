import { useLeagueData } from "../hooks/useLeagueData";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";

export function Teams() {

	const { teams, loading, error } = useLeagueData({ teams: true });

	if (loading) return <p className="p-6">Loading...</p>;
	if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

	return (
		<div className="max-w-3/4 mx-auto p-6">
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-4 text-primary justify-self-center">Teams</h1>
			</div>
			<div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				
				{teams.map((team) => (
					<Link to={`/teams/${team.id}`} key={team.id} state={{ team }}>
						<Card>
							<h2 className="text-xl font-bold mb-2">{team.name}</h2>
							<p className="text-gray-600 mb-1">Division: {team.division}</p>
							<p className="text-gray-600 mb-1">Coach: {team.coach}</p>
							<p className="text-gray-600">Wins: {team.wins} | Losses: {team.losses} | Ties: {team.ties}</p>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
