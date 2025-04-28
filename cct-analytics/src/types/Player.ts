export interface PlayerStats {
	gamesPlayed: number;
	goalsScored: number;
	assists: number;
	yellowCards: number;
	redCards: number;
}

export interface Player {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	position: string;
	jerseyNumber: number;
	teamId: string;
	stats: PlayerStats;
	attendance: {
		date: string;
		present: boolean;
	}[];
}
