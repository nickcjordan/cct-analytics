import { useLeagueData } from "../hooks/useLeagueData";
import { GameResultDetail } from "../components/details/GameResultDetail";

export function Games() {

	const { games, teams, players, loading, error } = useLeagueData();
	const sortedGames = [...games].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const gamesByDate = sortedGames.reduce((acc, game) => {
		const date = new Date(game.date).toLocaleDateString();
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


	return (
		<div className="max-w-3/4 mx-auto p-6 grid grid-cols-1 gap-2">
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-4 text-primary justify-self-center">Games</h1>
			</div>
			{Object.entries(gamesByDate).map(([date, games]) => (
				<div className="collapse bg-base-200 border border-base-300 " key={date}>
					<input type="radio" name="games-accordion" defaultChecked />
					<div className="collapse-title font-bold text-xl">{date}</div>
					<div className="collapse-content grid grid-cols-2">
						{games.map((game) => (
							<GameResultDetail key={game.id} game={game} getTeamName={getTeamName} getPlayername={getPlayerName} />
						))}
					</div>
				</div>
			))}
		</div>
	);
}
