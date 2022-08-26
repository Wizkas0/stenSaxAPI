import {serverApp} from "./index.js"
import chai from "chai"
import {use, should, expect } from "chai";
import chaiHttp from "chai-http";
import gameService from "./gameService.js";
should()
use(chaiHttp);

describe('Test /games', function () {
  
  const requester = chai.request(serverApp).keepOpen()

  after(function () {
    requester.close();
  });

  describe('Test POST to /games', function () {
    
    it("Should return gameID, playerID and gameUrl", function(done) {
      requester
      .post('/games')
      .send()
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("gameID")
        expect(res.body).to.have.property("playerID")
        expect(res.body).to.have.property("gameUrl")
        done()
     });
    })
  })

  describe('Test POST to /games/:gameID/join', function () {
    it("Should be able to join game", function(done) {
      requester.post('/games')
      .end(function (err, res) {
        const {gameID, playerID} = res.body;
        requester.post("/games/"+gameID + "/join")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done()
        })
      })
    })

    it("Should not be able to join game that does not exist", function(done) {
      requester.post('/games')
      .end(function (err, res) {
        const {gameID, playerID} = res.body;
        requester.post("/games/"+"123412asd3" + "/join")
        .end(function (err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.equal("Incorrect gameID!");
          done()
        })
      })
    })

    it("Should not be able to join game that is full", function(done) {
      requester.post('/games')
      .end(function (err, res) {
        const {gameID, playerID} = res.body;
        requester.post("/games/"+gameID+"/join")
        .end(function (err, res) {
          requester.post("/games/"+gameID+"/join")
          .end(function (err, res) {
            expect(res).to.have.status(404);
            expect(res.text).to.equal("Game is full!");
            done()
          })
        })
      })
    })
  })

  describe('Test GET to /games/:gameID', function () {

    it("Should display your name", function(done) {
      requester.post('/games').send({name: "Kalle"})
      .end(function (err, res) {
        const {gameID, playerID} = res.body;
        requester.get("/games/"+gameID).send({playerID: playerID})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.players[0]).to.equal("Kalle (you)")
          done()
        })
      })
    })

    it("Should display names of other players who have joined but not their choices", function(done) {
      requester.post('/games').send({name: "Kalle"})
      .end(function (err, res) {
        const {gameID, playerID: player1} = res.body;
        requester.post("/games/"+gameID+"/join").send({name: "Guy"})
        .end(function (err, res) {
          const {playerID: player2} = res.body;
          requester.post("/games/"+gameID+"/play").send({choice: "Rock", playerID: player2})
          .end(function (err, res) {
            requester.get("/games/"+gameID).send({playerID: player1})
            .end(function (err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.players[1]).to.equal("Guy")
              expect(res.body.theirChoice).to.equal("Hidden")
              done()
            })
          })
        })
      })
    })

    it("Should display your choice", function(done) {
      requester.post('/games').send({name: "Kalle"})
      .end(function (err, res) {
        const {gameID, playerID} = res.body;
        requester.post("/games/"+gameID+"/play").send({choice: "Paper", playerID: playerID})
        .end(function (err, res) {
          requester.get("/games/"+gameID).send({playerID: playerID})
          .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.yourChoice).to.equal("Paper")
            done()
          })
        })
      })
    })

    it("Should display the correct result", function(done) {
      requester.post('/games').send({name: "Kalle"})
      .end(function (err, res) {
       
        const {gameID, playerID: player1} = res.body;
        requester.post("/games/"+gameID+"/join").send({name: "Guy"})
        .end(function (err, res) {
          const {playerID: player2} = res.body;
          
          requester.post("/games/"+gameID+"/play").send({choice: "Paper", playerID: player1})
          .end(function (err, res) {
            requester.post("/games/"+gameID+"/play").send({choice: "Rock", playerID: player2})
            .end(function (err, res) {
              requester.get("/games/"+gameID).send({playerID: player2})
              .end(function (err, res) {
                const resP2 = res
                requester.get("/games/"+gameID).send({playerID: player1})
                .end(function (err, res) {
                  expect(res).to.have.status(200);
                  expect(resP2).to.have.status(200);
                  expect(res.body.result).to.equal("You win!")
                  expect(resP2.body.result).to.equal("You lose!")
                })
              })
            })

          })
        })
      })


      requester.post('/games').send({name: "Kalle"})
      .end(function (err, res) {
        
        const {gameID, playerID: player1} = res.body;
        requester.post("/games/"+gameID+"/join").send({name: "Guy"})
        .end(function (err, res) {
          const {playerID: player2} = res.body;
          
          requester.post("/games/"+gameID+"/play").send({choice: "Scissors", playerID: player1})
          .end(function (err, res) {
            requester.post("/games/"+gameID+"/play").send({choice: "Scissors", playerID: player2})
            .end(function (err, res) {
              requester.get("/games/"+gameID).send({playerID: player2})
              .end(function (err, res) {
                const resP2 = res
                requester.get("/games/"+gameID).send({playerID: player1})
                .end(function (err, res) {
                  expect(res).to.have.status(200);
                  expect(resP2).to.have.status(200);
                  expect(res.body.result).to.equal("Draw")
                  expect(resP2.body.result).to.equal("Draw")
                  done()
                })
              })
            })

          })
        })
      })
    })
  })
})

  describe('Test Server', function () {
    const testServer = new gameService("localhost", 1337);

    describe('Test createGame', function () {
      const {gameID, playerID} = testServer.createGame();
      it("Should create a game", function(done) {
        
        expect(() => testServer.getGame(gameID)).to.not.throw("Incorrect gameID!");
        done()
      })
      it("Should add player1 to game", function(done) {
        expect(() => testServer.getGame(gameID).getPlayer(playerID)).to.not.throw("Incorrect playerID!");
       
        done()
      })
    })

    describe('Test joinGame', function () {
      const {gameID} = testServer.createGame();
      it("Should add player to game", function(done) {
        const {playerID} = testServer.joinGame(gameID);
        
        testServer.getGame(gameID).players[1].should.exist;
        testServer.getGame(gameID).players[1].id.should.equal(playerID);
        done()
      })
      it("Should not be able to add more than one player", function(done) {
        expect(() => testServer.joinGame(gameID)).to.throw("Game is full!");
        done()
      })

    })

    describe('Test play', function () {
      const {gameID, playerID: player1} = testServer.createGame();
      const {playerID: player2} = testServer.joinGame(gameID);
      it("Should make choice", function(done) {
        testServer.play(gameID, player1, "paper")
        testServer.play(gameID, player2, "Rock")
        testServer.getGame(gameID).getPlayer(player1).choice.should.equal("Paper")
        testServer.getGame(gameID).getPlayer(player2).choice.should.equal("Rock")
        done()
      })
      it("Should not be able to play more than once", function(done) {
        expect(() => testServer.play(gameID, player1, "paper")).to.throw("You have already chosen!");
        expect(() => testServer.play(gameID, player2, "paper")).to.throw("You have already chosen!");
        done()
      })

    })

    describe('', function () {
      const {gameID, playerID: player1} = testServer.createGame();
      const {playerID: player2} = testServer.joinGame(gameID);

      it("Should not allow illegal choices", function(done) {
        expect(() => testServer.play(gameID, player1, "grass")).to.throw("Illegal choice!");
        expect(() => testServer.play(gameID, player2, "Leaf")).to.throw("Illegal choice!");

        done()
      })
      it("Should be able to make choice", function(done) {
        testServer.play(gameID, player1, "paper")
        testServer.play(gameID, player2, "Rock")
        testServer.getGame(gameID).getPlayer(player1).choice.should.equal("Paper")
        testServer.getGame(gameID).getPlayer(player2).choice.should.equal("Rock")
        done()
      })
      it("Should not be able to play more than once", function(done) {
        expect(() => testServer.play(gameID, player1, "paper")).to.throw("You have already chosen!");
        expect(() => testServer.play(gameID, player2, "paper")).to.throw("You have already chosen!");
        done()
      })

    })

    describe('Test check', function () {
      
      const {gameID, playerID: player1} = testServer.createGame();

      it("Should show TBD if no choice has been made", function(done) {

        const messageP1 = testServer.check(gameID, player1);

        messageP1.yourChoice.should.equal("TBD");
        messageP1.theirChoice.should.equal("TBD");
        messageP1.result.should.equal("TBD");

        done()
      })

      const {playerID: player2} = testServer.joinGame(gameID);
      
      it("Should not show your opponents choice if game is not over", function(done) {
        testServer.play(gameID, player1, "paper")

        const messageP1 = testServer.check(gameID, player1);
        const messageP2 = testServer.check(gameID, player2);
        
        messageP1.yourChoice.should.equal("Paper");
        messageP1.theirChoice.should.equal("TBD");
        messageP1.result.should.equal("TBD");
        messageP2.yourChoice.should.equal("TBD");
        messageP2.theirChoice.should.equal("Hidden");
        messageP2.result.should.equal("TBD");

        testServer.play(gameID, player2, "Rock")

        messageP1.yourChoice.should.equal("Paper");
        messageP1.theirChoice.should.equal("TBD");
        messageP1.result.should.equal("TBD");
        messageP2.yourChoice.should.equal("TBD");
        messageP2.theirChoice.should.equal("Hidden");
        messageP2.result.should.equal("TBD");
        testServer.getGame(gameID).getPlayer(player2).choice.should.equal("Rock")
        done()
      })
    })
  })