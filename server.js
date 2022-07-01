const { v4: uuidv4 } = require('uuid');
const Game = require("./game.js");
const Player = require("./player.js");

module.exports = class Server{
    games = {}
    constructor() {
    }

    createGame(){
        const uuidGame = 1 //uuidv4();
        const uuidPlayer = 2  //uuidv4();
        const player1 = new Player(uuidPlayer);
        const game = new Game(uuidGame, player1);
        this.games[uuidGame] = game;
        console.log(this.games);
        return {
            "Your ID": uuidPlayer,
            "Game URI": "/game/" + uuidGame
        }
    }

    joinGame(gameID){
        const uuidPlayer = 3 //uuidv4();
        const player2 = new Player(uuidPlayer);
        const game = this.getGame(gameID);
        const added = game.addPlayer(player2);
        console.log(added);
        return added ? {"Your ID": uuidPlayer} : false
    }

    choose(gameID, playerID, choice){
        const game = this.getGame(gameID);
        const chosen = game.choose(playerID, choice);
        return chosen ? {"Your choice": choice} : false
    }

    check(gameID, playerID){
        const game = this.getGame(gameID);
        return game.getState(playerID);
    }

    getGame(id){
        const game = this.games[id];
        if(!game) throw new Error("Incorrect gameID!")
        return game
    }
}