const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/index');

// Test unitario que retorna lista de invitados.
describe('GET /guests', function () {
    it('should return an array of guests', function(done) {
        request(app)
          .get('/guests')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body).to.be.an('array');
            done();
          });
      });
});

// Test para verificar devolución de invitado por id específico.
describe('GET /guests/:id', function () {
    it('should return a guest by id', function(done) {
        request(app)
          .get('/guests/2')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id', 2);
                expect(res.body).to.have.property('userName');
                expect(res.body).to.have.property('confirmation');
                expect(res.body).to.have.property('meat');
                expect(res.body).to.have.property('salad');
            done();
          });
      });
});

// Verifica creación de un nuevo invitado.
describe('POST /guests', function() {
    it('should create a new guest and return an array of guests', function(done) {
      request(app)
        .post('/guests')
        .send({ userName: 'Carla Blanco', 
            confirmation: true,
            meat: 800,
            salad: ["tomate"] })
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
});

// Modifica un invitado ya existente.
describe('PUT /guests/:id', function() {
    it('should update a guest', function(done) {
      request(app)
        .put('/guests/2')
        .send({ userName: 'Carla Blanco', 
            confirmation: false,
            meat: 1200,
            salad: ["tomate", "cebolla"] })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id', 2);
          expect(res.body).to.have.property('userName', "Carla Blanco");
          expect(res.body).to.have.property('confirmation', false);
          expect(res.body).to.have.property('meat', 1200);
          expect(res.body).to.have.property('salad');
          done();
        });
    });
});