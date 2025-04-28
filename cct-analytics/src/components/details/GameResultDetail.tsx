import { Game } from "../../types/Game";
import { Card } from "../ui/Card";
import { WiDaySunny } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";

interface GameResultDetailProps {
    game: Game;
    getTeamName: (teamId: string) => string;
    getPlayername: (playerId: string) => string;
}

function filterScorersByTeam(scorers: { playerId: string; goals: number; team: string }[], teamId: string) {
	return scorers.filter(scorer => scorer.team === teamId);
}

function getWeatherIcon(weather: string) {
	// need the rest of the allowed values for full implementation 
	switch (weather) {
		case "Sunny":
			return <WiDaySunny className="text-yellow-500 text-6xl" />;
		case "Cloudy":
			return <WiDayCloudy className="text-gray-300 text-6xl" />;
		case "Partly Cloudy":
			return <WiCloudy className="text-gray-400 text-6xl" />;
		default:
			return null;
	}
}

export function GameResultDetail({ game, getTeamName, getPlayername }: GameResultDetailProps) {
	return (
	  <Card key={game.id}>
		<div className="text-sm text-base-content grid grid-cols-2 text-center mb-6">
			<div className="text-xl font-bold justify-self-start">{game.location}</div>
			<div className="badge badge-outline justify-self-end">{game.division}</div>
		</div>
		<div className="grid justify-items-center">
			<div className="grid grid-cols-7 mb-4 w-full">
				<div className=" col-span-3 justify-self-end grid-rows-2 justify-items-center">
					<div className="justify-content-center text-2xl font-bold text-secondary pr-2">{getTeamName(game.awayTeam)}</div>
					<div className="justify-content-center text-align-center  text-2xl">{game.awayScore}</div>
				</div>
				<div className=" col-span-1 justify-self-center grid-rows-2 justify-items-center self-center">
					<div className="justify-content-center text-align-center"> @ </div>
				</div>
				<div className=" col-span-3 justify-self-start grid-rows-2 justify-items-center">
					<div className="justify-content-center text-2xl font-bold text-accent pl-2">{getTeamName(game.homeTeam)}</div>
					<div className="justify-content-center text-align-center text-2xl">{game.homeScore}</div>
				</div>
			</div>
			<div className="grid grid-cols-7 mb-4 w-full  border-b-2 border-base-300 pb-4">
				<div className="rounded-md col-span-3 justify-self-end justify-items-right">
						{filterScorersByTeam(game.scorers, game.awayTeam).map((scorer, index) => (
							<div key={index} className="pl-2 pr-2">
								<span>{getPlayername(scorer.playerId)} ({scorer.goals})</span>
							</div>
						))}
				</div>
				<div className="grid col-span-1 justify-items-center">
					<div className="border-l-2 border-base-300 w-1"></div>
				</div>
				<div className="grid col-span-3 justify-self-start justify-items-left">
						{filterScorersByTeam(game.scorers, game.homeTeam).map((scorer, index) => (
							<div key={index} className="pl-2 pr-2">
								<span>{getPlayername(scorer.playerId)} ({scorer.goals})</span>
							</div>
						))}
				</div>
			</div>
			
			<div className="grid grid-cols-2 mb-4 w-full">
				<p className="justify-self-center text-xl  self-center">
					{getWeatherIcon(game.weatherConditions)}
				</p>
				<p className="justify-self-center text-xl self-center">
					{game.attendance} Attendees
				</p>
			</div>
			<div className="grid grid-cols-1 justify-items-center">
				<p className="text-md font-bold text-l">Referees</p>
				{game.referees.map((referee, index) => (
					<div key={index} className="text-center text-l">
						{referee}
					</div>
				))}
			</div>
			
		</div>

	</Card>
  );
}