import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import JWT from '../utils/JWT';
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { UserMock } from './mocks/UserMock';

chai.use(chaiHttp);

const fakeEmail = UserMock.email; 
const fakeToken = JWT.createToken({ fakeEmail });

const { expect } = chai;

describe('Login Test', () => {
  describe('Test /login', () => {
    it('should return an ok status and a token if login sucessful', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(UserMock as any);
  
      const { status, body } = await chai.request(app).post('/login').send({ email: 'usermock@test.com', password: 'usermock' });
  
      expect(status).to.equal(200);
      expect(body).to.have.property('token');
    });
  
    it('should return a bad request status if password is missing', async function() {
      const { status, body } = await chai.request(app).post('/login').send({ email: 'usermock@test.com' });
      
      expect(status).to.equal(400);
      expect(body.message).to.deep.equal('All fields must be filled');
    });
  
    it('should return a bad request status if email is missing', async function() {
      const { status, body } = await chai.request(app).post('/login').send({ password: 'usermock' });
      
      expect(status).to.equal(400);
      expect(body.message).to.deep.equal('All fields must be filled');
    });
  
    it('should return an unauthorized status if email is invalid', async function() {
      const { status, body } = await chai.request(app).post('/login').send({ email: 'adada@ada', password: '1234567' });
  
      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Invalid email or password');
    })
  
    it('should return an unauthorized status if password is invalid', async function() {
      const { status, body } = await chai.request(app).post('/login').send({ email: 'usermock@test.com', password: '123' });
  
      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Invalid email or password');
    });
  
    it('should return an unauthorized status if user is not found', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app).post('/login').send({ email: 'usermock@test.com', password: 'usermock' });
      
      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Invalid email or password');
    });
  
    it('should return an unauthorized status if password is incorrect', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(UserMock as any);
  
      const { status, body } = await chai.request(app).post('/login').send({ email: 'usermock@test.com', password: 'idk1234' });
  
      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Invalid email or password');
    });
  });

  describe('Test /login/role', () => {
    it('should return an unauthorized status if token is not found', async () => {
      const { status, body } = await chai.request(app).get('/login/role');

      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token not found' });
    });

    it('should return an unauthorized status if token is invalid', async () => {
      const { status, body } = await chai.request(app).get('/login/role').set('authorization', 'invalid token');

      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('should return an ok status and the user role if token is valid', async () => {
      sinon.stub(SequelizeUser, 'findOne').resolves(UserMock as any);
      const { status, body } = await chai.request(app).get('/login/role').set('authorization', `Bearer ${fakeToken}`);

      expect(status).to.equal(200);
      expect(body).to.deep.equal({ role: 'user' });
    });
  });

  afterEach(function() {
    sinon.restore();
  })
});
