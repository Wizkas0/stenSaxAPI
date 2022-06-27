const { v4: uuidv4 } = import('uuid');
import Game from "./game.js";
import Player from "./player.js";

export default class Server{
    games = {}
    constructor() {
    }

    createGame(){
        const uuidGame = uuidv4();
        const uuidPlayer = uuidv4();
        const player1 = new Player(uuidPlayer);
        const game = new Game(uuidGame, player1);
        games[uuidGame] = game;
        return {
            "Your ID": uuidPlayer,
            "Game URI": "/game/" + uuidGame
        }
    }

    joinGame(gameID){
        const uuidPlayer = uuidv4();
        const player2 = new Player(uuidPlayer);
        const game = games[gameID];
        const added = game.addPlayer(player2);
        
        return added ? {"Your ID": uuidPlayer} : false
    }

    choose(gameID, playerID, choice){
        const game = games[gameID];
        const chosen = game.choose(playerID, choice);
        return chosen ? {"Your choice": choice} : false
    }

    check(gameID, playerID){
        const game = games[gameID];
        return game.getState(playerID);
    }
}