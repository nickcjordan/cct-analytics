import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { Player } from "../../types/Player";

interface TopPlayersChartProps { 
	title: string;
	players: Player[]; 
	calculateValue: (player: Player) => number | string;
}

export function TopPlayersChart({ title, players, calculateValue }: TopPlayersChartProps) {

	const formattedPlayers = players
		.map(player => ({
			...player,
			fullName: `${player.firstName} ${player.lastName}`,
			value: calculateValue(player),
		}))
		.sort((a, b) => 
			typeof a.value === "number" && typeof b.value === "number"
				? b.value - a.value
				: typeof a.value === "string" && typeof b.value === "string"
				? a.value.localeCompare(b.value)
				: 0
		);

  return (
	<div className="bg-base-100 rounded-2xl shadow p-6 m-2">
	  <h2 className="text-xl font-bold mb-4">{title}</h2>
	  <ResponsiveContainer width="100%" height={200}>
		<BarChart data={formattedPlayers}>
		  <XAxis dataKey="fullName" />
		  <YAxis />
		  <Tooltip />
		  <Bar dataKey="value" fill="#79b0e8" />
		</BarChart>
	  </ResponsiveContainer>
	</div>
  );
}
