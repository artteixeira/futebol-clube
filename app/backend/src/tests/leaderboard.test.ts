import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { 
  LeaderboardFullMockModel, 
  LeaderboardFullMockResult,
  LeaderboardHomeMock,
  LeaderboardHomeMockResult,
  LeaderboardAwayMock,
  LeaderboardAwayMockResult
} from './mocks/LeaderboardMock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Test', () => {
  describe('Test /leaderboard', () => {
    it('should return an ok status and a leaderboard', async function() {
      sinon.stub(SequelizeTeam, 'findAll').resolves(LeaderboardFullMockModel as any);

      const { status, body } = await chai.request(app).get('/leaderboard');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(LeaderboardFullMockResult);
    });

    it('should return error status and message', async function() {
      sinon.stub(SequelizeTeam, 'findAll').throws();

      const { status, body } = await chai.request(app).get('/leaderboard');

      expect(status).to.be.equal(500);
      expect(body).to.have.property('message');
    });
  });

  describe('Test /leaderboard/home', () => {
    it('should return an ok status and a leaderboard', async function() {
      sinon.stub(SequelizeTeam, 'findAll').resolves(LeaderboardHomeMock as any);

      const { status, body } = await chai.request(app).get('/leaderboard/home');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(LeaderboardHomeMockResult);
    });
  });

  describe('Test /leaderboard/away', () => {
    it('should return an ok status and a leaderboard', async function() {
      sinon.stub(SequelizeTeam, 'findAll').resolves(LeaderboardAwayMock as any);

      const { status, body } = await chai.request(app).get('/leaderboard/away');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(LeaderboardAwayMockResult);
    });
  });

  afterEach(function() {
    sinon.restore();
  })
});