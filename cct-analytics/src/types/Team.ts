export interface Team {
	id: string;
	name: string;
	division: string;
	coach: string;
	wins: number;
	losses: number;
	ties: number;
	pointsScored: number;
	pointsAllowed: number;
	players: string[];
}
