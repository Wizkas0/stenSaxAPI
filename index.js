import Server from "./server.js";
import express from "express";

const app = express();
const port = 8080;

const server = new Server();

app.post("/games", (req, res) => {
  res.send(server.createGame())
})

app.post("/games/:gameID/join", (req, res) => {
  res.send(server.joinGame(req.params.gameID))
})

app.post("/games/:gameID/choose", (req, res) => {
  const playerID = req.params.playerID;
  const choice = req.params.choice;
  res.send(server.choose(req.params.gameID, playerID, choice))
})

app.get("/games/:gameID", (req, res) => {
  const playerID = req.params.playerID;
  res.send(server.check(req.params.gameID, playerID))
})

app.listen(
    port, () => console.log("Server started")
);