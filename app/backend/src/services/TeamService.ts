import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam, ILeaderboardFull, ITeamFull, boardType } from '../Interfaces/Teams/ITeam';
import TeamModel from '../models/TeamModel';
import Filter from '../utils/Filters';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    try {
      const teams = await this.teamModel.findAll();

      return {
        status: 'successful',
        data: teams,
      };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }

  public async getTeamById(id: ITeam['id']): Promise<ServiceResponse<ITeam>> {
    try {
      const team = await this.teamModel.findById(id);

      if (!team) {
        return {
          status: 'notFound',
          data: { message: `Team ${id} not found` },
        };
      }

      return { status: 'successful', data: team };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }

  public async getLeaderboardFull(path: string): Promise<ServiceResponse<ILeaderboardFull[]>> {
    try {
      const teams = await this.teamModel.findAllLeaderboardFull(path as boardType);

      return {
        status: 'successful',
        data: Filter.leaderboardFullFormat(teams as unknown as ITeamFull[]),
      };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }
}
