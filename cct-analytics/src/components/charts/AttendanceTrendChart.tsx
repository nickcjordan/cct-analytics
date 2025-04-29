import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Player } from '../../types/Player';


interface AttendanceTrendChartProps {
	players: Player[];
}

export function AttendanceTrendChart({players}:AttendanceTrendChartProps)  {
	// Calculate attendance percentages by date
	const attendanceMap: Record<string, { attended: number; total: number }> = {};

	players.forEach((player) => {
		player.attendance.forEach(({ date, present }) => {
			if (!attendanceMap[date]) {
				attendanceMap[date] = { attended: 0, total: 0 };
			}
			attendanceMap[date].total += 1;
			if (present) {
				attendanceMap[date].attended += 1;
			}
		});
	});
	

	const data = Object.keys(attendanceMap)
		.sort() 
		.map((date) => ({
			date,
			percentage: ((attendanceMap[date].attended / attendanceMap[date].total) * 100).toFixed(1),
		}));

	return (
		<div className="bg-base-100 rounded-2xl shadow p-6 m-2">
			<h2 className="text-xl font-bold mb-4">Player Attendance % by Dates</h2>
			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date"/>
					<YAxis domain={[0, 100]} />
					<Tooltip />
					<Line type="monotone" dataKey="percentage" stroke="#79b0e8" activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
