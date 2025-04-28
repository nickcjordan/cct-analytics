import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { Player } from "../../types/Player";

interface TopScorersChartProps { players: Player[]; }

export function TopScorersChart({ players }: TopScorersChartProps) {



	const formattedPlayers = players
		.map(player => ({
			...player,
			fullName: `${player.firstName} ${player.lastName}`,
			goals: player.stats.goalsScored,
		}))
		.sort((a, b) => b.goals - a.goals);

	return (
		<div className="bg-base-100 rounded-2xl shadow p-6 m-2">
			<h2 className="text-xl font-bold mb-4">Top Scorers</h2>
			<ResponsiveContainer width="100%" height={200}>
				<BarChart data={formattedPlayers}>
					<XAxis dataKey="fullName" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="goals" fill="#348feb" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
