class Player{
    //The model for a player
    constructor(id) {
        this.id = id;
    }

    choose(choice){
        if (this.choice) return false;
        this.choice = choice;
    }
}