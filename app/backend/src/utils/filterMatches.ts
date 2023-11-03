import { IMatches } from '../Interfaces/Matches/IMatches';

export default function filterMatches(matches: IMatches[], inProgress: string) {
  if (inProgress === 'true') {
    return matches.filter((match) => match.inProgress === true);
  }
  if (inProgress === 'false') {
    return matches.filter((match) => match.inProgress === false);
  }

  return matches;
}
