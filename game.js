class Game {
    //The model for a game of rockPaperScissors
    players = [2]
    constructor(gameID, player1) {
        this.id = gameID;
        this.players[0] = player1;
    }

    addPlayer(player2) {
        if (!this.players[1]) return false;
        this.players[1] = player2;
    }

    choose(playerID, choice){
        return this.players.filter(player => player.id === playerID)[0].choose(choice);
    }

    getStatus(playerID){
        const thisPlayer = this.players.filter(player => player.id === playerID)[0];
        const otherPlayer  = this.players.filter(player => !(player.id === playerID))[0];
        const returnObject = {
            "Your choice": thisPlayer.choice || "TBD",
            "Their choice": "TBD",
            "Result": "TBD"
        }
    }

    determineWinner(){
        const possibleChoices = {
            "Rock": 1,
            "Paper": 2,
            "Scissors": 3
        }
    }
  }