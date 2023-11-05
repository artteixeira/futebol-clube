import { IMatches } from '../Matches/IMatches';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamFull extends ITeam {
  homeMatches?: IMatches[];
  awayMatches?: IMatches[];
}

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

export interface ILeaderboardFull extends ILeaderboard {
  goalsBalance: number;
  efficiency: number;
}

export type boardType = '/home' | '/away';
