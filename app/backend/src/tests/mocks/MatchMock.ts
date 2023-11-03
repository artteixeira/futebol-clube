import { IMatchesIncludes } from '../../Interfaces/Matches/IMatches'

const MatchMock: IMatchesIncludes = {
  id: 1,
  homeTeamId: 12,
  homeTeamGoals: 2,
  awayTeamId: 13,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'TeamMock'
  },
  awayTeam: {
    teamName: 'TeamMock2'
  }
}

const MatchesMock: IMatchesIncludes[] = [
  {
    id: 1,
    homeTeamId: 12,
    homeTeamGoals: 2,
    awayTeamId: 13,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'TeamMock'
    },
    awayTeam: {
      teamName: 'TeamMock2'
    }
  },
  {
    id: 2,
    homeTeamId: 14,
    homeTeamGoals: 3,
    awayTeamId: 15,
    awayTeamGoals: 2,
    inProgress: false,
    homeTeam: {
      teamName: 'TeamMock3'
    },
    awayTeam: {
      teamName: 'TeamMock4'
    }
  },
  {
    id: 3,
    homeTeamId: 16,
    homeTeamGoals: 4,
    awayTeamId: 17,
    awayTeamGoals: 3,
    inProgress: false,
    homeTeam: {
      teamName: 'TeamMock5'
    },
    awayTeam: {
      teamName: 'TeamMock6'
    }
  },
  {
    id: 4,
    homeTeamId: 18,
    homeTeamGoals: 5,
    awayTeamId: 19,
    awayTeamGoals: 4,
    inProgress: false,
    homeTeam: {
      teamName: 'TeamMock7'
    },
    awayTeam: {
      teamName: 'TeamMock8'
    }
  },
  {
    id: 5,
    homeTeamId: 20,
    homeTeamGoals: 6,
    awayTeamId: 21,
    awayTeamGoals: 5,
    inProgress: false,
    homeTeam: {
      teamName: 'TeamMock9'
    },
    awayTeam: {
      teamName: 'TeamMock10'
    }
  },
  {
    id: 6,
    homeTeamId: 22,
    homeTeamGoals: 7,
    awayTeamId: 23,
    awayTeamGoals: 6,
    inProgress: false,
    homeTeam: {
      teamName: 'TeamMock11'
    },
    awayTeam: {
      teamName: 'TeamMock12'
    }
  },
  {
    id: 7,
    homeTeamId: 24,
    homeTeamGoals: 8,
    awayTeamId: 25,
    awayTeamGoals: 7,
    inProgress: false,
    homeTeam: {
      teamName: 'TeamMock13'
    },
    awayTeam: {
      teamName: 'TeamMock14'
    }
  },
  {
    id: 8,
    homeTeamId: 26,
    homeTeamGoals: 9,
    awayTeamId: 27,
    awayTeamGoals: 8,
    inProgress: false,
    homeTeam: {
      teamName: 'TeamMock15'
    },
    awayTeam: {
      teamName: 'TeamMock16'
    }
  }
]

const MatchUpdateMock = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}

export {
  MatchMock,
  MatchesMock,
  MatchUpdateMock,
}