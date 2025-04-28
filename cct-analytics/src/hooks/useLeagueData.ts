import { useEffect, useState } from "react";
import { leagueData } from "../data/leagueData";
import { Game } from "../types/Game";
import { Player } from "../types/Player";
import { Team } from "../types/Team";

interface LeagueData {
  games: Game[];
  players: Player[];
  teams: Team[];
}

interface UseLeagueDataOptions {
  games?: boolean;
  players?: boolean;
  teams?: boolean;
}

export function useLeagueData(options: UseLeagueDataOptions = { games: true, players: true, teams: true }) {
  const [data, setData] = useState<LeagueData>({
    games: [],
    players: [],
    teams: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [games, players, teams] = await Promise.all([
          options.games ? leagueData.getGames() : Promise.resolve([]),
          options.players ? leagueData.getPlayers() : Promise.resolve([]),
          options.teams ? leagueData.getTeams() : Promise.resolve([]),
        ]);
        setData({ games, players, teams });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
}, [options.games, options.players, options.teams]);

  return { ...data, loading, error };
}
