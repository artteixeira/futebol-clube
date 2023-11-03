import { ITeam } from '../Interfaces/Teams/ITeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

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
}
