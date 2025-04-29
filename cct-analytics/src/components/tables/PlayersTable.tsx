import { Player } from "../../types/Player";
import { Link } from "react-router-dom";

interface PlayersTableProps {
	players: Player[];
	getTeamName: (teamId: string) => string;
}

export function PlayersTable({ players, getTeamName }: PlayersTableProps) {

	return (
		<div className="rounded-2xl bg-base-100 shadow p-6 m-2 overflow-x-auto ">
			<table className="table table-lg w-full">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Age</th>
						<th>Position</th>
						<th>Team</th>
						<th>Games</th>
						<th>Goals</th>
						<th>Assists</th>
						<th>Yellow Cards</th>
						<th>Red cards</th>
					</tr>
				</thead>
				<tbody>
					{players.map(player => (
						<tr className="hover:bg-base-200" key={player.id}>
							<td>{player.jerseyNumber}</td>
							<td className="font-semibold text-secondary underline">
								<Link className="w-full" to={`/players/${player.id}`} key={player.id} state={{ player: player, teamName: getTeamName(player.teamId) }}>
									{`${player.firstName} ${player.lastName}`}
								</Link>
							</td>
							<td>{player.age}</td>
							<td>{player.position}</td>
							<td>{getTeamName(player.teamId)}</td>
							<td>{player.stats.gamesPlayed}</td>
							<td>{player.stats.goalsScored}</td>
							<td>{player.stats.assists}</td>
							<td>{player.stats.yellowCards}</td>
							<td>{player.stats.redCards}</td>
						</tr>

					))}
				</tbody>
			</table>
		</div>
	);
}
