import { useLeague } from "../context/LeagueContext";
import { GameResultDetail } from "../components/details/GameResultDetail";

export function Games() {

	const { games, players, teams, loading, error } = useLeague();

	const sortedGames = [...games].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const gamesByDate = sortedGames.reduce((acc, game) => {
		const date = new Date(game.date).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(game);
		return acc;
	}, {} as Record<string, typeof games>);

	if (loading) return <p className="p-6">Loading...</p>;
	if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

	function getTeamName(teamId: string): string {
		const team = teams.find((team) => team.id === teamId);
		return team ? team.name : teamId;
	}

	function getPlayerName(playerId: string): string {
		const player = players.find((player) => player.id === playerId);
		return player ? `${player.firstName} ${player.lastName}` : playerId;
	}

	const firstDate = Object.keys(gamesByDate)[0];


	return (
		<div className="mx-auto p-6 grid grid-cols-1 gap-2">
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-4 text-primary justify-self-center">Game Results</h1>
			</div>
			{Object.entries(gamesByDate).map(([date, games]) => (
				<div className="collapse collapse-arrow bg-base-200 border border-base-300 " key={date}>
					<input type="radio" name="games-accordion" defaultChecked={date === firstDate} />
					<div className="collapse-title font-bold text-xl">{date}</div>
					<div className="collapse-content grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
						{games.map((game) => (
							<GameResultDetail key={game.id} game={game} getTeamName={getTeamName} getPlayername={getPlayerName} />
						))}
					</div>
				</div>
			))}
		</div>
	);
}
