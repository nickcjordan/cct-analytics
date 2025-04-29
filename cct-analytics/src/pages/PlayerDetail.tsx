import { useLocation, Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Player } from "../types/Player";
import { StatCard } from "../components/ui/StatCard";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsDashCircle } from "react-icons/bs";

interface LocationState {
	player: Player;
	teamName: string;
}

export function PlayerDetail() {

	const location = useLocation();
	const state = location.state as LocationState;

	const player = state.player;
	const teamName = state.teamName;


	if (!player) {
		return <p className="p-6">Player not found.</p>;
	}

	const attendancePercentage = ((player.attendance.filter(a => a.present).length / player.attendance.length) * 100).toFixed(0);

	return (
		<div className="p-6">
			<Link to="/players" className="btn btn-primary mb-4">← Back to Players</Link>

			<div className="p-6 grid grid-cols-1">
				<h1 className="text-5xl font-bold text-primary justify-self-center">{`${player.firstName} ${player.lastName}`}
					<span className="text-3xl font-bold text-secondary justify-self-start pl-4">{`#${player.jerseyNumber}`}</span>
				</h1>
				<h1 className="text-3xl text-gray-500 font-thin justify-self-center mt-2">
					{player.position}
				</h1>
				<h1 className="text-3xl text-accent justify-self-center font-bold mt-2">
					{teamName}
				</h1>
			</div>
			<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mb-4">
				<Card>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
						<StatCard title={"Games Played"} value={player.stats.gamesPlayed} />
						<StatCard title={"Goals Scored"} value={player.stats.goalsScored} />
						<StatCard title={"Goals per Game"} value={(player.stats.goalsScored / player.stats.gamesPlayed).toFixed(1)} />
						<StatCard title={"Assists"} value={player.stats.assists} />
						<StatCard title={"Assists per Game"} value={(player.stats.assists / player.stats.gamesPlayed).toFixed(1)} />
						<StatCard title={"Yellow Cards"} value={player.stats.yellowCards} />
						<StatCard title={"Red Cards"} value={player.stats.redCards} />
						<StatCard title={"Attendance"} value={`${attendancePercentage}%`} />
					</div>
				</Card>
				<Card>
					<h2 className="text-2xl font-bold mb-2 justify-self-center">Attendance Record</h2>
					<table className="table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Present</th>
							</tr>
						</thead>
						<tbody>
							{player.attendance.map((attendance, index) => (
								<tr key={index} className="hover:bg-base-300">
									<td>{attendance.date}</td>
									<td>{attendance.present ? <BsCheckCircleFill style={{ color: "green" }} /> : <BsDashCircle style={{ color: "red" }} />}</td>
								</tr>
							))}
						</tbody>
					</table>
				</Card>
			</div>

		</div>
	);
}
