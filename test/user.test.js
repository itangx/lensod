let mongoose = require("mongoose");
let User = require('../app/models/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => { 
      User.remove({}, (err) => { 
        done();         
      });     
  });

  /*
  * Test the /GET route
  */
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/user')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  /*
  * Test the /POST route 
  */
  describe('/POST user', () => {
      it('it should not POST a user without firstName', (done) => {
        let user = {
          lastName: "last", 
          telNo: "0655899215"
        }
        chai.request(server)
            .post('/api/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('firstName');
                res.body.errors.firstName.should.have.property('kind').eql('required');
              done();
            });
      });

      it('it should POST a user', (done) => {
        let user = {
          firstName: "hoy",
          lastName: "last", 
          telNo: "028941874"
        }
        chai.request(server)
            .post('/api/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('telNo');
                res.body.firstName.should.equal('hoy');
                res.body.lastName.should.equal('last');
                res.body.telNo.should.equal('028941874');
              done();
            });
      });
  });

  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id user', () => {
      it('it should GET a user by the given id', (done) => {
        let user = new User({ firstName:"stang", lastName:"pornpawit", telNo:"0969011556" });
        user.save((err, user) => {
            chai.request(server)
            .get('/api/user/' + user.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('telNo');
                res.body.should.have.property('_id').eql(user.id);
              done();
            });
        });

      });
  });

  /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id user', () => {
      it('it should UPDATE a user given the id', (done) => {
        let user = new User({ firstName:"stangTester", lastName:"sirirapa", telNo:"0969011556" })
        user.save((err, user) => {
                chai.request(server)
                .put('/api/user/' + user.id)
                .send({ telNo:"1112" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User successfully updated!');
                    res.body.user.should.have.property('telNo').eql("1112");
                  done();
                });
          });
      });
  });

});