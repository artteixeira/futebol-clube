import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import JWT from '../utils/JWT';
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';

import { MatchMock, MatchesMock, MatchUpdateMock } from './mocks/MatchMock';
import { UserMock } from './mocks/UserMock';
chai.use(chaiHttp);

const { expect } = chai;
const fakeEmail = UserMock.email; 
const fakeToken = JWT.createToken({ fakeEmail });

describe('Matches Test', () => {
  describe('Test /matches', () => {
    it('should return a list of matches', async function() {
      sinon.stub(SequelizeMatch, 'findAll').resolves(MatchesMock as any);
  
      const { status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(MatchesMock);
    });
  })

  describe('Test /matches/:id', () => {
    it('should return a match by id', async function() {
      sinon.stub(SequelizeMatch, 'findByPk').resolves(MatchMock as any);
  
      const { status, body } = await chai.request(app).get('/matches/1');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(MatchMock);
    });
  
    it('should return not found if the match doesn\'t exists', async function() {
      sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
  
      const { status, body } = await chai.request(app).get('/matches/1');
  
      expect(status).to.equal(404);
      expect(body).to.deep.equal({
        message: 'Match not found'
      });
    });


  });

  describe('Test /matches/:id/finish', () => {
    it('should finish a match with valid token', async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
    
      const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${fakeToken}`)
    
      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        message: 'Finished'
      });
    });
    
    it('should return not found if the match doesn\'t exists', async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([0]);
    
      const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${fakeToken}`)
    
      expect(status).to.equal(404);
      expect(body).to.deep.equal({
        message: 'Match not found'
      });
    });
  });
  
  describe('Test patch /matches/:id', () => {
    it('should update a match', async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
    
      const { status } = await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${fakeToken}`).send(MatchUpdateMock);
    
      expect(status).to.equal(200);
    });
  
    it('should return not found if the match doesn\'t exists', async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([0]);
    
      const { status } = await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${fakeToken}`).send(MatchUpdateMock);
    
      expect(status).to.equal(404);
    });
  });

  describe('Test POST /matches', () => {
    it('should create a match', async function() {
      sinon.stub(SequelizeMatch, 'create').resolves(MatchMock as any);
    
      const { status, body } = await chai.request(app).post('/matches').set('Authorization', `Bearer ${fakeToken}`).send(MatchMock);
    
      expect(status).to.equal(201);
      expect(body).to.deep.equal(MatchMock);
    });

    it('should return an unprocessable content status if the homeTeamId and awayTeamId are equal', async function() {
      const { status, body } = await chai.request(app).post('/matches').set('Authorization', `Bearer ${fakeToken}`).send({ homeTeamId: 1, awayTeamId: 1 });

      expect(status).to.equal(422);
      expect(body).to.deep.equal({
        message: 'It is not possible to create a match with two equal teams',
      });
    });

    it('should return a not found status if the homeTeamId or awayTeamId are invalid', async function() {
      sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

      const { status, body } = await chai.request(app).post('/matches').set('Authorization', `Bearer ${fakeToken}`).send({ homeTeamId: 1, awayTeamId: 2 });

      expect(status).to.equal(404);
      expect(body).to.deep.equal({
        message: 'There is no team with such id!',
      });
    });
  });

  afterEach(function() {
    sinon.restore();
  })
});