export default class PlayerModel {
  //The model for a player
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  play(choice) {
    if (this.choice) throw new Error("You have already chosen!");
    this.choice = choice;
  }
}
