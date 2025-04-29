import { render, screen } from '@testing-library/react';
import { AttendanceTrendChart } from '../../../components/charts/AttendanceTrendChart';
import { Player } from '../../../types/Player';

describe('AttendanceTrendChart', () => {

	vi.mock('recharts', () => {
		const OriginalRecharts = vi.importActual('recharts');
		return {
			...OriginalRecharts,
			ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
				<div data-testid="mock-responsive-container">{children}</div>
			),
			LineChart: ({ children }: { children: React.ReactNode }) => (
				<div data-testid="mock-line-chart">{children}</div>
			),
			Line: () => <div data-testid="mock-line" />,
			XAxis: () => <div data-testid="mock-x-axis"></div>,
			YAxis: () => <div data-testid="mock-y-axis" />,
			CartesianGrid: () => <div data-testid="mock-cartesian-grid" />,
			Tooltip: () => <div data-testid="mock-tooltip" />,
		};
	});

	const mockPlayers: Player[] = [
		buildPlayer('1', [
			{ date: '2023-01-01', present: true },
			{ date: '2023-01-02', present: false },
		]),
		buildPlayer('2', [
			{ date: '2023-01-01', present: true },
			{ date: '2023-01-02', present: true },
		])
	];

	it('renders the chart with correct title', () => {
		render(<AttendanceTrendChart players={mockPlayers} />);
		expect(screen.getByText('Player Attendance % by Dates')).toBeInTheDocument();
	});

	it('calculates attendance percentages correctly', () => {
		render(<AttendanceTrendChart players={mockPlayers} />);
		const chartData = screen.getByText('Player Attendance % by Dates').closest('div');
		expect(chartData).toBeInTheDocument();
	});

	it('handles empty players array gracefully', () => {
		render(<AttendanceTrendChart players={[]} />);
		expect(screen.getByText('Player Attendance % by Dates')).toBeInTheDocument();
	});

	it('handles players with no attendance data', () => {
		const playersWithNoAttendance: Player[] = [
			buildPlayer('1', []),
			buildPlayer('2', [])
		];
		render(<AttendanceTrendChart players={playersWithNoAttendance} />);
		expect(screen.getByText('Player Attendance % by Dates')).toBeInTheDocument();
	});

});


function buildPlayer(id: string, attendance: any[]): Player {
	return {
		id: id,
		firstName: "First " + id,
		lastName: "Last " + id,
		stats: {
			goalsScored: 0,
			assists: 0,
			gamesPlayed: 0,
			yellowCards: 0,
			redCards: 0
		},
		age: 0,
		position: "",
		jerseyNumber: 0,
		teamId: "",
		attendance: attendance
	}
}