import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { leagueData } from "../data/leagueData";
import { Game } from "../types/Game";
import { Player } from "../types/Player";
import { Team } from "../types/Team";

interface LeagueContextType {
	games: Game[];
	players: Player[];
	teams: Team[];
	loading: boolean;
	error: string | null;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export function LeagueProvider({ children }: { children: ReactNode }) {
	const [games, setGames] = useState<Game[]>([]);
	const [players, setPlayers] = useState<Player[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			setError(null); // Reset any previous errors
			try {
				const [fetchedGames, fetchedPlayers, fetchedTeams] = await Promise.all([
					leagueData.getGames(),
					leagueData.getPlayers(),
					leagueData.getTeams(),
				]);
				setGames(fetchedGames);
				setPlayers(fetchedPlayers);
				setTeams(fetchedTeams);
			} catch (err: any) {
				console.error("Failed to load league data:", err);
				setError(err.message || "An unknown error occurred.");
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	return (
		<LeagueContext.Provider value={{ games, players, teams, loading, error }}>
			{children}
		</LeagueContext.Provider>
	);
}

export function useLeague() {
	const context = useContext(LeagueContext);
	if (!context) {
		throw new Error("useLeague must be used within a LeagueProvider");
	}
	return context;
}
