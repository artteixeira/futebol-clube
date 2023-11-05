import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(progress?: string): Promise<IMatches[]>;
  update(id: IMatches['id'], data: Partial<Omit<IMatches, 'id'>>): Promise<IMatches | null>;
  findById(id: IMatches['id']): Promise<IMatches | null>;
  create(data: Omit<IMatches, 'id'>): Promise<IMatches>;
}
