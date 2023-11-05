import { ITeamFull, ILeaderboardFull } from '../Interfaces/Teams/ITeam';
import { IMatches } from '../Interfaces/Matches/IMatches';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class Filter {
  public static filterInProgress(matches: IMatches[], inProgress: string) {
    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress === true);
    }
    if (inProgress === 'false') {
      return matches.filter((match) => match.inProgress === false);
    }

    return matches;
  }

  public static leaderboardFullFormat(teams: ITeamFull[]): ILeaderboardFull[] {
    return teams.map((team) => {
      const { homeMatches = [], awayMatches = [], teamName, id } = team;
      const allMatches = [...homeMatches, ...awayMatches]
        .filter((match) => !match.inProgress);

      return {
        name: teamName,
        totalPoints: Filter.totalPoints(allMatches, id),
        totalGames: Filter.totalGames(allMatches),
        totalVictories: Filter.totalVictories(allMatches, id),
        totalDraws: Filter.totalDraws(allMatches),
        totalLosses: Filter.totalGames(allMatches)
        - Filter.totalVictories(allMatches, id) - Filter.totalDraws(allMatches),
        goalsFavor: Filter.totalGoalsFavor(allMatches, id),
        goalsOwn: Filter.totalGoalsOwn(allMatches, id),
        goalsBalance: Filter.totalGoalsFavor(allMatches, id) - Filter.totalGoalsOwn(allMatches, id),
        efficiency: Number(Filter.efficiency(allMatches, id).toFixed(2)),
      };
    }).sort(Filter.sortMatches);
  }

  private static sortMatches(a: ILeaderboardFull, b: ILeaderboardFull): number {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    if (a.goalsFavor !== b.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }
    return 0;
  }

  private static totalVictories(matches: IMatches[], id: number): number {
    return matches.filter((match) =>
      (match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals)
      || (match.awayTeamId === id && match.awayTeamGoals > match.homeTeamGoals)).length;
  }

  private static totalDraws(matches: IMatches[]): number {
    return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  private static totalGoalsFavor(matches: IMatches[], id: number): number {
    return matches.reduce((acc, match) => {
      if (match.homeTeamId === id) {
        return acc + match.homeTeamGoals;
      }
      return acc + match.awayTeamGoals;
    }, 0);
  }

  private static totalGoalsOwn(matches: IMatches[], id: number): number {
    return matches.reduce((acc, match) => {
      if (match.homeTeamId === id) {
        return acc + match.awayTeamGoals;
      }
      return acc + match.homeTeamGoals;
    }, 0);
  }

  private static totalGames(matches: IMatches[]): number {
    return matches.length;
  }

  private static totalPoints(matches: IMatches[], id: number): number {
    const victories = Filter.totalVictories(matches, id);
    const draws = Filter.totalDraws(matches);

    return (victories * 3) + draws;
  }

  private static efficiency(matches: IMatches[], id: number): number {
    const totalPoints = Filter.totalPoints(matches, id);
    const totalGames = Filter.totalGames(matches);

    return ((totalPoints / (totalGames * 3)) * 100);
  }

  public static setBoardTypeIncludes(path: string) {
    const includesArray = [];

    switch (path) {
      case '/home':
        includesArray.push({ model: SequelizeMatch, as: 'homeMatches' });
        break;
      case '/away':
        includesArray.push({ model: SequelizeMatch, as: 'awayMatches' });
        break;
      default:
        includesArray.push(
          { model: SequelizeMatch, as: 'homeMatches' },
          { model: SequelizeMatch, as: 'awayMatches' },
        );
    }

    return includesArray;
  }
}
