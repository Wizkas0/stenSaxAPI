
module.exports = class Game {
    //The model for a game of rockPaperScissors
    players = [2]
    constructor(gameID, player1) {
        this.id = gameID;
        this.players[0] = player1;
    }

    addPlayer(player2) {
        //Adds a second player to a game or returns false if there are already two players
        if (this.players[1]) throw new Error("Game is full!");
        else {
            this.players[1] = player2;
            return true;
        }
    }

    choose(playerID, choice){
        //Sets the choice player with the given id to the given choice, or returns false if it has already been set

        const thisPlayer = this.getPlayer(playerID);
        this.checkLegality(choice);
        return thisPlayer.choose(choice);
    }

    getState(playerID){
        //Returns the state of the game
        console.log(this.players);
        console.log(playerID);
        const thisPlayer = this.getPlayer(playerID)
        console.log(thisPlayer);
        const otherPlayer  = this.players.filter(player => !(player.id == playerID))[0];
        const returnObject = {
            "Your choice": thisPlayer.choice || "TBD",
            "Their choice": otherPlayer.choice ? "Hidden" : "TBD",
            "Result": "TBD"
        }
        console.log(thisPlayer.choice);
        console.log(otherPlayer.choice);
        if(thisPlayer.choice && otherPlayer.choice) {
            const result = this.didYouWin(thisPlayer.choice, otherPlayer.choice);
            returnObject["Their choice"] = otherPlayer.choice;
            returnObject["Result"] = result;
        }
        return returnObject;
    }

    getPlayer(id){
        const thisPlayer = this.players.filter(player => player.id == id)[0];
        if(!thisPlayer) throw new Error("Incorrect playerID!");
        return thisPlayer;
    }
    checkLegality(choiceToTry){
        const legalChoices = ["Rock", "Paper", "Scissors"]
        if(!legalChoices.filter(choice => choice === choiceToTry)[0]) throw new Error("Illegal choice!")
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