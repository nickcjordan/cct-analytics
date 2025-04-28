import games from './games.json';
import players from './players.json';
import teams from './teams.json';

import { Game } from "../types/Game";
import { Player } from "../types/Player";
import { Team } from "../types/Team";

// Simulate network latency (optional for realism)
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const leagueData = {
  async getGames(): Promise<Game[]> {
    await simulateDelay(300); // simulate 300ms delay
	console.log("Fetching games data...");
    return games as Game[];
  },

  async getPlayers(): Promise<Player[]> {
    await simulateDelay(300);
	console.log("Fetching players data...");
    return players as Player[];
  },

  async getTeams(): Promise<Team[]> {
    await simulateDelay(300);
	console.log("Fetching teams data...");
    return teams as Team[];
  }
};
