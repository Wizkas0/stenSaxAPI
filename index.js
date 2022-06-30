import Server from "./server.js";
import express from "express";

const app = express();
const port = 8080;
const server = new Server();
app.use(express.json())

//app.all("/games/:gameID*", (req, res, next) => {
//  if(!req.params.gameID) res.send(400);
//  next();
//})

app.post("/games", (req, res) => {
  res.send(server.createGame())
})

app.post("/games/:gameID/join", (req, res) => {
  try {
    res.send(server.joinGame(req.params.gameID))
  } catch (error) {
    res.send(error.message + "\n")
  }
})

app.post("/games/:gameID/choose", (req, res) => {
  const playerID = req.body.playerID;
  const choice = req.body.choice;
  console.log(req.body)
  try {
    res.send(server.choose(req.params.gameID, playerID, choice))
  } catch (error) {
    res.send(error.message + "\n")
  }
})

app.get("/games/:gameID", (req, res) => {
  const playerID = req.body.playerID;
  console.log(req.body)
  try {
    res.send(server.check(req.params.gameID, playerID))
  } catch (error) {
    res.send(error.message + "\n")
  }

})

app.listen(
    port, () => console.log("Server started")
);