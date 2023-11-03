import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeams from './SequelizeTeam';

class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
    defaultValue: true,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

SequelizeMatch.belongsTo(SequelizeTeams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatch.belongsTo(SequelizeTeams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeams.hasMany(SequelizeMatch, { foreignKey: 'homeTeamId', as: 'homeMatches' });
SequelizeTeams.hasMany(SequelizeMatch, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default SequelizeMatch;
