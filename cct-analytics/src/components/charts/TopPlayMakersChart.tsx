import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { Player } from "../../types/Player";

interface TopPlayMakersChartProps { players: Player[]; }

export function TopPlayMakersChart({ players }: TopPlayMakersChartProps) {

	const formattedPlayers = players
		.map(player => ({
			...player,
			fullName: `${player.firstName} ${player.lastName}`,
			assists: player.stats.assists,
		}))
		.sort((a, b) => b.assists - a.assists);

  return (
	<div className="bg-base-100 rounded-2xl shadow p-6 m-2">
	  <h2 className="text-xl font-bold mb-4">Top Play Makers</h2>
	  <ResponsiveContainer width="100%" height={200}>
		<BarChart data={formattedPlayers}>
		  <XAxis dataKey="fullName" />
		  <YAxis />
		  <Tooltip />
		  <Bar dataKey="assists" fill="#79b0e8" />
		</BarChart>
	  </ResponsiveContainer>
	</div>
  );
}
