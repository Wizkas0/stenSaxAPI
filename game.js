class Game {
    //The model for a game of rockPaperScissors
    players = [2]
    constructor(gameID, player1) {
        this.id = gameID;
        this.players[0] = player1;
    }

    addPlayer(player2) {
        //Adds a second player to a game or returns false if there are already two players
        if (!this.players[1]) return false;
        this.players[1] = player2;
    }

    choose(playerID, choice){
        //Sets the choice player with the given id to the given choice, or returns false if it has already been set
        return this.players.filter(player => player.id === playerID)[0].choose(choice);
    }

    getState(playerID){
        //Returns the state of the game
        const thisPlayer = this.players.filter(player => player.id === playerID)[0];
        const otherPlayer  = this.players.filter(player => !(player.id === playerID))[0];
        const returnObject = {
            "Your choice": thisPlayer.choice || "TBD",
            "Their choice": otherPlayer.choice ? "Hidden" : "TBD",
            "Result": "TBD"
        }
        if(thisPlayer.choice && otherPlayer.choice) {
            const result = this.didYouWin(thisPlayer.choice, otherPlayer.choice);
            returnObject["Their choice"] = otherPlayer.choice;
            returnObject["Result"] = result;
        }
        return returnObject;
    }

    didYouWin(yourChoice, theirChoice){
        //Determines whether or not yourChoice beats theirChoice
        const choiceMap = {
            "Rock": 0,
            "Paper": 1,
            "Scissors": 2
        }
        if(yourChoice === theirChoice){return "Draw"}
        else if(
            (choiceMap[theirChoice] + 1)%3 === choiceMap[yourChoice]
        ){return "You win!"}
        else {return "You lose!"}
    }
  }