import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { TeamMock, TeamsMock } from './mocks/TeamMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Test', () => {
  it('should return a list of team', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(TeamsMock as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(TeamsMock);
  });

  it('should return a team by id', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(TeamMock as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(TeamMock);
  });

  it('should return not found if the team doesn\'t exists', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({
      message: 'Team 1 not found'
    });
  });

  afterEach(function() {
    sinon.restore();
  })
});
