import { ITeam } from '../../Interfaces/Teams/ITeam';

const TeamMock: ITeam = {
  id: 1,
  teamName: 'TeamMock'
}

const TeamsMock: ITeam[] = [
  {
    id: 1,
    teamName: 'TeamMock'
  },
  {
    id: 2,
    teamName: 'TeamMock2'
  },
  {
    id: 3,
    teamName: 'TeamMock3'
  }
]

export {
  TeamMock,
  TeamsMock
}