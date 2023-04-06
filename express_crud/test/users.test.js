//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const User = require('../src/modules/user.module.js');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);


//Our Paret Block

describe('Testig Users:', () => {

    //test the get request
    describe('GET users', () => {
        it('it should get all the users', (done) => {

            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('user');
                    res.body.should.have.property('results');
                    done()
                })
        })
    })


    //test post request
    describe('CREATE User', () => {
        it('it should create a user', (done) => {
            let user = {
                name: "sk",
                mobile: 9898909089,
                city: "Pune"
            }
            chai.request(server)
                .post('/api/user')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.user.should.have.property('name');
                    res.body.user.should.have.property('city');
                    res.body.user.should.have.property('mobile');
                    expect(res.body.user.name).to.equal(user.name);
                    expect(res.body.user.mobile).to.equal(user.mobile);
                    expect(res.body.user.city).to.equal(user.city);
                    done();
                })
            user

        })
    })


    //Similler to the Post request you can write the test for patch and delete req as well




});