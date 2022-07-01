const server = require("./index.js");
const chai = require("chai")
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const should = require('chai').should();
chai.use(chaiHttp);

describe('Test /games', () => {
    describe('Post to /games', () => {
      it('Should return a player id and a game id', (done) => {
        chai.request(server)
        .post("/games")
        .end((err, res) => {
            res.body.should.have.property("Your ID");
            res.body.should.have.property("Game URI");
            //res.body.should

        })
        done()
      });
    });
  });