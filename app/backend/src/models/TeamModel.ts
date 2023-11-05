import { ITeam, boardType } from '../Interfaces/Teams/ITeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import Filter from '../utils/Filters';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);

    if (team === null) return null;

    return team;
  }

  async findAllLeaderboardFull(type: boardType): Promise<ITeam[]> {
    const include = Filter.setBoardTypeIncludes(type);

    const teams = await this.model.findAll({
      include,
    });

    return teams;
  }
}
