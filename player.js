
module.exports = class Player{
    //The model for a player
    constructor(id) {
        this.id = id;
    }

    choose(choice){
        if (this.choice) throw new Error("You have already chosen!");
        this.choice = choice;
    }
}