import { Link } from "react-router-dom";
import { Team } from "../../types/Team";
import { Player } from "../../types/Player";

interface TeamsTableProps {
	teams: Team[];
	players: Player[];
}

export function TeamsTable({ teams, players }: TeamsTableProps) {

	return (
		<div className="rounded-2xl bg-base-100 shadow p-6 m-2 overflow-x-auto">
			<table className="table table-lg w-full">
				<thead>
					<tr>
						<th>Team</th>
						<th>Division</th>
						<th>Coach</th>
						<th>Record</th>
						<th>Scored</th>
						<th>Allowed</th>
						<th>Differential</th>
					</tr>
				</thead>
				<tbody>
					{teams.map(team => (
						<tr className="hover:bg-base-300" key={team.id}>
							<td className="font-semibold text-secondary underline">
								<Link className="w-full" to={`/teams/${team.id}`} key={team.id} state={{ team: team, players: players }}>{team.name}</Link>
							</td>
							<td>{team.division}</td>
							<td>{team.coach}</td>
							<td>{`${team.wins}-${team.losses}-${team.ties}`}</td>
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