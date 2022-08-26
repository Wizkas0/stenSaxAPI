export default class GameModel {
  //The model for a game of rockPaperScissors
  players = [null, null];
  constructor(gameID, player1) {
    this.id = gameID;
    this.addPlayer(player1);
  }

  addPlayer(player) {
    //Adds a second player to a game or returns false if there are already two players

    if (!this.players[0]) this.players[0] = player;
    else if (!this.players[1]) this.players[1] = player;
    else {
      throw new Error("Game is full!");
    }
  }

  play(playerID, choice) {
    //Sets the choice player with the given id to the given choice, or returns false if it has already been set

    const thisPlayer = this.getPlayer(playerID);
    const standardized = this.checkLegality(choice);
    return thisPlayer.play(standardized);
  }

  getState(playerID) {
    //Returns the state of the game

    const thisPlayer = this.getPlayer(playerID);

    const otherPlayer = this.players
      .filter((thing) => thing !== null)
      .filter((player) => !(player.id == playerID))[0];
    const returnObject = {
      players: [
        thisPlayer
          ? (thisPlayer.name || "Anonymous") + " (you)"
          : "Player has not joined",
        otherPlayer ? otherPlayer.name || "Anonymous" : "Player has not joined",
      ],
      yourChoice: thisPlayer.choice || "TBD",
      result: "TBD",
    };
    if (otherPlayer) {
      returnObject.theirChoice = otherPlayer.choice ? "Hidden" : "TBD";
      if (thisPlayer.choice && otherPlayer.choice) {
        const result = this.didYouWin(thisPlayer.choice, otherPlayer.choice);
        returnObject.theirChoice = otherPlayer.choice;
        returnObject.result = result;
      }
    }
    return returnObject;
  }

  getPlayer(id) {
    const thisPlayer = this.players
      .filter((thing) => thing != null)
      .filter((player) => player.id == id)[0];
    if (!thisPlayer) {
      throw new Error("Incorrect playerID!");
    }
    return thisPlayer;
  }
  checkLegality(choiceToTry) {
    if (!choiceToTry) throw new Error("No choice provided!");
    const legalChoices = ["Rock", "Paper", "Scissors"];
    const legalchoice = legalChoices.filter(
      (choice) => choice.toLowerCase() === choiceToTry.toLowerCase()
    )[0];
    if (!legalchoice) throw new Error("Illegal choice!");
    return legalchoice;
  }

  didYouWin(yourChoice, theirChoice) {
    //Determines whether or not yourChoice beats theirChoice
    const choiceMap = {
      Rock: 0,
      Paper: 1,
      Scissors: 2,
    };
    if (yourChoice === theirChoice) {
      return "Draw";
    } else if ((choiceMap[theirChoice] + 1) % 3 === choiceMap[yourChoice]) {
      return "You win!";
    } else {
      return "You lose!";
    }
  }
}
