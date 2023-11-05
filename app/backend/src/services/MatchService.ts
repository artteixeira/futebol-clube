import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/Matches/IMatches';
import MatchModel from '../models/MatchModel';
import Filter from '../utils/Filters';

export default class MatchesService {
  constructor(
    private matchModel = new MatchModel(),
    private notFoundMessage: string = 'Match not found',
  ) { }

  public async getAllMatches(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    try {
      const Matches = await this.matchModel.findAll();

      return {
        status: 'successful',
        data: Filter.filterInProgress(Matches, inProgress),
      };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }

  public async updateMatch(id: IMatches['id'], data: Partial<Omit<IMatches, 'id'>>):
  Promise<ServiceResponse<IMatches | null>> {
    try {
      const match = await this.matchModel.update(id, data);

      if (match === null) {
        return { status: 'notFound', data: { message: this.notFoundMessage },
        };
      }

      return { status: 'successful', data: match };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }

  public async finishMatch(id: IMatches['id']): Promise<ServiceResponse<{ message: string }>> {
    try {
      const match = await this.matchModel.update(id, { inProgress: false });

      if (match === null) {
        return { status: 'notFound', data: { message: this.notFoundMessage },
        };
      }

      return { status: 'successful', data: { message: 'Finished' } };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }

  public async getMatchById(id: IMatches['id']): Promise<ServiceResponse<IMatches | null>> {
    try {
      const match = await this.matchModel.findById(id);

      if (match === null) {
        return { status: 'notFound', data: { message: this.notFoundMessage },
        };
      }

      return { status: 'successful', data: match };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }

  public async createMatch(data: Omit<IMatches, 'id'>): Promise<ServiceResponse<IMatches>> {
    try {
      const homeTeam = await this.matchModel.findById(data.homeTeamId);
      const awayTeam = await this.matchModel.findById(data.awayTeamId);

      if (homeTeam === null || awayTeam === null) {
        return { status: 'notFound', data: { message: 'There is no team with such id!' } };
      }

      const match = await this.matchModel.create(data);

      return { status: 'created', data: match };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }
}
