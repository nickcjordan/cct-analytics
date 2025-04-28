import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navigation/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Teams } from "./pages/Teams";
import { Players } from "./pages/Players";
import { Games } from "./pages/Games";
import { TeamDetail } from "./pages/TeamDetail";
import { PlayerDetail } from "./pages/PlayerDetail";
import { LeagueProvider } from "./context/LeagueContext";

function App() {
  return (
	<LeagueProvider>
		<div className="min-h-screen bg-base-300">
		<Navbar />
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/teams" element={<Teams />} />
			<Route path="/teams/:teamId" element={<TeamDetail />} />
			<Route path="/players" element={<Players />} />
			<Route path="/players/:playerId" element={<PlayerDetail />} />
			<Route path="/games" element={<Games />} /> 
		</Routes>
		</div>
	</LeagueProvider>
  );
}

export default App;
