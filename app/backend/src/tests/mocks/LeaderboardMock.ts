import { ILeaderboardFull, ITeamFull } from '../../Interfaces/Teams/ITeam'

const LeaderboardFullMockModel: ITeamFull[] = 
[
  {
    "id": 1,
    "teamName": "Team Mock1",
    "homeMatches": 
    [
      {
        "id": 2,
        "homeTeamId": 1,
        "homeTeamGoals": 3,
        "awayTeamId": 3,
        "awayTeamGoals": 3,
        "inProgress": false
      },
      {
        "id": 5,
        "homeTeamId": 1,
        "homeTeamGoals": 2,
        "awayTeamId": 3,
        "awayTeamGoals": 0,
        "inProgress": true
      },
    ],
    "awayMatches": 
    [
      {
        "id": 7,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": true
      },
      {
        "id": 10,
        "homeTeamId": 3,
        "homeTeamGoals": 3,
        "awayTeamId": 1,
        "awayTeamGoals": 10,
        "inProgress": false
      }
    ]    
  },
  {
    "id": 2,
    "teamName": "Team Mock2",
    "homeMatches": 
    [
      {
        "id": 1,
        "homeTeamId": 2,
        "homeTeamGoals": 1,
        "awayTeamId": 3,
        "awayTeamGoals": 1,
        "inProgress": false
      },
      {
        "id": 4,
        "homeTeamId": 2,
        "homeTeamGoals": 0,
        "awayTeamId": 3,
        "awayTeamGoals": 0,
        "inProgress": true
      },
    ],
    "awayMatches": 
    [
      {
        "id": 6,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 2,
        "awayTeamGoals": 0,
        "inProgress": true
      },
      {
        "id": 9,
        "homeTeamId": 3,
        "homeTeamGoals": 3,
        "awayTeamId": 2,
        "awayTeamGoals": 10,
        "inProgress": false
      }
    ]
  }
]

const LeaderboardFullMockResult: ILeaderboardFull[] = 
[
  {
    "name": "Team Mock1",
    "totalPoints": 4,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 13,
    "goalsOwn": 6,
    "goalsBalance": 7,
    "efficiency": 66.67
  },
  {
    "name": "Team Mock2",
    "totalPoints": 4,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 11,
    "goalsOwn": 4,
    "goalsBalance": 7,
    "efficiency": 66.67
  }
]

const LeaderboardHomeMock: ITeamFull[] = 
[
  {
    "id": 1,
    "teamName": "Team Mock1",
    "homeMatches": 
    [
      {
        "id": 2,
        "homeTeamId": 1,
        "homeTeamGoals": 3,
        "awayTeamId": 3,
        "awayTeamGoals": 3,
        "inProgress": false
      },
      {
        "id": 5,
        "homeTeamId": 1,
        "homeTeamGoals": 2,
        "awayTeamId": 3,
        "awayTeamGoals": 0,
        "inProgress": true
      },
    ],
  },
  {
    "id": 2,
    "teamName": "Team Mock2",
    "homeMatches": 
    [
      {
        "id": 1,
        "homeTeamId": 2,
        "homeTeamGoals": 1,
        "awayTeamId": 3,
        "awayTeamGoals": 1,
        "inProgress": false
      },
      {
        "id": 4,
        "homeTeamId": 2,
        "homeTeamGoals": 0,
        "awayTeamId": 3,
        "awayTeamGoals": 0,
        "inProgress": true
      },
    ],
  }
];

const LeaderboardHomeMockResult: ILeaderboardFull[] =
[
  {
    "name": "Team Mock1",
    "totalPoints": 1,
    "totalGames": 1,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 3,
    "goalsBalance": 0,
    "efficiency": 33.33
  },
  {
    "name": "Team Mock2",
    "totalPoints": 1,
    "totalGames": 1,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 1,
    "goalsOwn": 1,
    "goalsBalance": 0,
    "efficiency": 33.33
  }
]

const LeaderboardAwayMock: ITeamFull[] = 
[
  {
    "id": 1,
    "teamName": "Team Mock1",
    "awayMatches": 
    [
      {
        "id": 7,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": true
      },
      {
        "id": 10,
        "homeTeamId": 3,
        "homeTeamGoals": 3,
        "awayTeamId": 1,
        "awayTeamGoals": 10,
        "inProgress": false
      }
    ]    
  },
  {
    "id": 2,
    "teamName": "Team Mock2",
    "awayMatches": 
    [
      {
        "id": 6,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 2,
        "awayTeamGoals": 0,
        "inProgress": true
      },
      {
        "id": 9,
        "homeTeamId": 3,
        "homeTeamGoals": 3,
        "awayTeamId": 2,
        "awayTeamGoals": 10,
        "inProgress": false
      }
    ]
  }
]

const LeaderboardAwayMockResult: ILeaderboardFull[] =
[
  {
    "name": "Team Mock1",
    "totalPoints": 3,
    "totalGames": 1,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 3,
    "goalsBalance": 7,
    "efficiency": 100
  },
  {
    "name": "Team Mock2",
    "totalPoints": 3,
    "totalGames": 1,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 3,
    "goalsBalance": 7,
    "efficiency": 100
  }
]

export {
  LeaderboardFullMockModel,
  LeaderboardFullMockResult,
  LeaderboardHomeMock,
  LeaderboardHomeMockResult,
  LeaderboardAwayMock,
  LeaderboardAwayMockResult
}