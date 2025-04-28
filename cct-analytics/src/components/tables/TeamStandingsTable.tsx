import { Team } from "../../types/Team";

interface TeamStandingsTableProps {	teams: Team[]; }

export function TeamStandingsTable({ teams }: TeamStandingsTableProps) {

  return (
    <div className="rounded-2xl bg-base-100 shadow p-6 m-2 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Team Standings</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Team</th>
            <th>Division</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
            <th>Scored</th>
            <th>Allowed</th>
            <th>Differential</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team.id}>
              <td className="font-semibold">{team.name}</td>
              <td>{team.division}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.ties}</td>
              <td>{team.pointsScored}</td>
              <td>{team.pointsAllowed}</td>
              <td>{team.pointsScored - team.pointsAllowed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
