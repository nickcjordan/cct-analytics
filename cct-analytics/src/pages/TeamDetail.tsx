import { useLocation, Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Team } from "../types/Team";
import { StatCard } from "../components/ui/StatCard";
import { Player } from "../types/Player";

interface LocationState {
	team: Team;
	players: Player[];
}

export function TeamDetail() {
	const location = useLocation();
	const state = location.state as LocationState;
	const team = state.team
	const players = state.players

	if (!team) {
		return <p className="p-6">Team not found.</p>;
	}

	function getPlayer(playerId: string): Player | undefined {
		const player = players.find((p) => p.id === playerId);
		return player;
	}

	return (
		<div className="p-6">
			<Link to="/teams" className="btn btn-primary mb-4">← Back to Teams</Link>

			<div className="p-6 grid grid-cols-1">
				<h1 className="text-5xl font-bold text-primary justify-self-center">{team.name}
					<span className="text-3xl font-bold text-secondary justify-self-start pl-4">{`(${team.division})`}</span>
				</h1>
				<h1 className="text-3xl text-gray-500 font-thin justify-self-center mt-2">
					Coach: {team.coach}
				</h1>
			</div>

			<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
				<div>
					<Card>
						<div className="grid sm:grid-cols-1 md:grid-cols-3">
							<StatCard title={"Wins"} value={team.wins} />
							<StatCard title={"Losses"} value={team.losses} />
							<StatCard title={"Ties"} value={team.ties} />
						</div>
					</Card>
					<Card>
						<div className="grid sm:grid-cols-1 md:grid-cols-3">
							<StatCard title={"Points Scored"} value={team.pointsScored} />
							<StatCard title={"Points Allowed"} value={team.pointsAllowed} />
							<StatCard title={"Deficit"} value={team.pointsScored - team.pointsAllowed} />
						</div>
					</Card>
				</div>
				<Card>
					<h2 className="text-2xl font-bold mb-4">Players</h2>
					<ul className="list mb-4 ">
						{team.players.map((playerId, index) => {
							const player = getPlayer(playerId);
							return player ?
								<li key={index} className="list-row p-2">
									<Link to={`/players/${playerId}`} state={{ player: player, teamName: team.name }} className="text-secondary underline">{`${player.firstName} ${player.lastName}`}</Link>
								</li>
								:
								<li key={index} className="list-row p-2">
									<div className="text-secondary">{playerId}</div>
								</li>
						})}
					</ul>
				</Card>
			</div>


		</div>
	);
}
