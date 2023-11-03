import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeams from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchesModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const match = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (match === null) return null;

    return match;
  }

  async update(id: IMatches['id'], data: Partial<Omit<IMatches, 'id'>>): Promise<IMatches | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async create(data: Omit<IMatches, 'id'>): Promise<IMatches> {
    const match = await this.model.create(data);

    return match;
  }
}
