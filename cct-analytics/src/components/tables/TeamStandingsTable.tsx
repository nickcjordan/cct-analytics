import { Link } from "react-router-dom";
import { Team } from "../../types/Team";
import { Player } from "../../types/Player";

interface TeamStandingsTableProps {
	teams: Team[];
	players: Player[];
}

export function TeamStandingsTable({ teams, players }: TeamStandingsTableProps) {

	const sortedTeams = [...teams].sort((a, b) => {
		return b.wins === a.wins ? a.losses - b.losses : b.wins - a.wins
	});

	return (
		<div className="rounded-2xl bg-base-100 shadow p-6 m-2 overflow-x-auto">
			<h2 className="text-xl font-bold mb-4">Team Standings</h2>
			<table className="table table-lg w-full">
				<thead>
					<tr>
						<th>#</th>
						<th>Team</th>
						<th>Division</th>
						<th>Wins</th>
						<th>Losses</th>
						<th>Ties</th>
						<th>Scored</th>
						<th>Allowed</th>
						<th>Differential</th>
					</tr>
				</thead>
				<tbody>
					{sortedTeams.map((team, index) => (
						<tr className="hover:bg-base-300" key={team.id}>
							<td className="font-thin">{index + 1}</td>
							<td className="font-semibold text-secondary underline">
								<Link className="w-full" to={`/teams/${team.id}`} key={team.id} state={{ team: team, players: players }}>{team.name}</Link>
							</td>
							<td>{team.division}</td>
							<td>{team.wins}</td>
							<td>{team.losses}</td>
							<td>{team.ties}</td>
							<td>{team.pointsScored}</td>
							<td>{team.pointsAllowed}</td>
							<td>{team.pointsScored - team.pointsAllowed}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
