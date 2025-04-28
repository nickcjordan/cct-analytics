export interface Game {
	id: string;
	date: string; 
	homeTeam: string;
	awayTeam: string;
	homeScore: number;
	awayScore: number;
	location: string;
	division: string;
	attendance: number;
	weatherConditions: string;
	scorers: {
		playerId: string;
		goals: number;
		team: string;
	}[];
	referees: string[];
}
