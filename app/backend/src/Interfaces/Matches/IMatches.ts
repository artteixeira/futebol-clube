export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesIncludes extends IMatches {
  homeTeam: {
    teamName: string,
  },
  awayTeam: {
    teamName: string,
  },
}
