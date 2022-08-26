import { v4 as uuidv4 } from 'uuid';
import GameModel from "./gameModel.js";
import PlayerModel from "./playerModel.js";

export default class gameService{
    count = 0;
    //The server object which contains and manipulates game objects, is initialized with two games if it was initialized for testing purposes.
    constructor(serverUrl, port, test) {
        this.serverUrl  = serverUrl;
        this.port = port? ":" + port : ""
        this.games = test ? {
            "1234": new GameModel("1234", new PlayerModel("1111")),
            "12345": new GameModel("12345", new PlayerModel("1112")).addPlayer(new PlayerModel("1113"))
        }
        : {}
    }

    createGame(name){
        this.count ++;
        const uuidGame = uuidv4();
        const uuidPlayer = uuidv4();
        const player1 = new PlayerModel(uuidPlayer, name);
        const game = new GameModel(uuidGame, player1);
        this.games[uuidGame] = game;
    
        return {
            playerID: uuidPlayer,
            gameID: uuidGame,
            gameUrl: "http://"+ this.serverUrl + this.port +"/games/" + uuidGame + "/join"
        }
    }

    joinGame(gameID, name){
        const uuidPlayer = uuidv4();
        const player2 = new PlayerModel(uuidPlayer, name);
        const game = this.getGame(gameID);
        game.addPlayer(player2);
     
        return {
            playerID: uuidPlayer,
            gameID: gameID
        }
    }

    play(gameID, playerID, choice){
        if(!playerID) throw new Error("No playerID provided!");
        const game = this.getGame(gameID);
        const chosen = game.play(playerID, choice);
        return {yourChoice: choice}
    }

    check(gameID, playerID){
        if(!playerID) throw new Error("No playerID provided!");
        const game = this.getGame(gameID);
        return game.getState(playerID);
    }

    getGame(id){
        const game = this.games[id];
        if(!game) throw new Error("Incorrect gameID!")
        return game
    }
}