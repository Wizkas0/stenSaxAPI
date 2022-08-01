import Server from "./server.js";
import express, { json } from 'express';

const app = express();
const serverDomain = "localhost";
const port = process.env.PORT || 8080;

const server = new Server(serverDomain, port);
app.use(json())


app.post("/games", (req, res) => {
  res.send(server.createGame(req.body.name))
})

app.post("/games/:gameID/join", (req, res) => {
  try {
    res.send(server.joinGame(req.params.gameID, req.body.name))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

app.post("/games/:gameID/play", (req, res) => {
  const playerID = req.body.playerID;
  const choice = req.body.choice;
  //console.log(req.body)
  try {
    res.send(server.play(req.params.gameID, playerID, choice))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

app.get("/games/:gameID", (req, res) => {
  const playerID = req.body.playerID;
  //console.log(req.body)
  try {
    res.send(server.check(req.params.gameID, playerID))
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message)
  }

})

export const serverApp = app.listen( port, () => console.log("Server started"));