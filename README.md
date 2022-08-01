# stenSaxAPI
Presenting stenSaxAPI, an API that let's you play rock-paper-scissors with your friends! 
*By Kalle Meurman*
# Instructions

## How to run:
The server is run with the command:

`npm start`

To run the test-suite:

`npm test`

The server is run on port 8080 by default. You can change the port by editing the port constant in the index file. The server address is
localhost by default, but can be changed by editing the serverDomain constant. The instructions assume the default port and server address are used.

*The following instructions are for the command-line tool curl, though others could be used as well.*
## Creating a game
To create a new game, you simply send a POST request to the server's /games endpoint. 
Optionally, you can add a payload containing a name to the request, otherwise your name will be "Anonymous".
The server will respond with a json object containing your playerID (that you will use when
interacting with your game), the gameID of the game you just created, and a URL for you to
share with a friend (for them to use to join your game).
### example request:
`curl -X POST -d '{"name": "Kalle"}' -H "Content-Type: application/json" http://localhost:8080/games`

### example response:
`{"playerID":"23886430-470c-40af-945c-cb111a87ba8b", "gameID":"46d51b49-a20c-43e7-8e73-b8ec6e0fa3da", "gameUrl":"http://localhost:8080/games/46d51b49-a20c-43e7-8e73-b8ec6e0fa3da/join"}`

## Joining a game
To join a game, you make a POST request to the /games/gameID/join endpoint. 
If you have recieved a game-URL, you can simply make a POST request to that URL. 
Again, you can optionally add a payload containing a name to the request, 
otherwise your name will be "Anonymous". The server will respond with your player ID 
and the ID of the game you just joined.

### example request:
`curl -X POST -d '{"name": "Guy"}' -H "Content-Type: application/json" http://localhost:8080/games/46d51b49-a20c-43e7-8e73-b8ec6e0fa3da/join`

### example response:
`{"playerID":"ee95c8a5-a9eb-4992-8417-a0d4f36df785", "gameID":"46d51b49-a20c-43e7-8e73-b8ec6e0fa3da"}`

## Playing the game
In order to play the game, i.e. make your choice of either rock, paper or scissors, you make a POST request to the /games/gameID/play endpoint.
 The payload should be a json object containing your playerID and your choice. The server will echo back your choice to let you know the
 request was successful.

### example request:
`curl -X POST -d '{"playerID": "23886430-470c-40af-945c-cb111a87ba8b", "choice": "Rock"}' -H "Content-Type: application/json" http://localhost:8080/games/46d51b49-a20c-43e7-8e73-b8ec6e0fa3da/play`

### example response:
`{"yourChoice":"Rock"}`

## Checking the result
You can check the state of a game at any point after it has been created by making a GET request to the /games/gameID endpoint. 
The server will respond with a json representing the current state of the game.
Before both players have made their choices, your opponent's choice will be hidden from you. 
When both players have made their choices, your opponent's choice, as well as the results, will be displayed.

### example request:
`curl -X GET -d '{"playerID": "ee95c8a5-a9eb-4992-8417-a0d4f36df785"}' -H "Content-Type: application/json" http://localhost:8080/games/46d51b49-a20c-43e7-8e73-b8ec6e0fa3da`

### example response:
`{ players: [ 'Guy (you)', 'Kalle' ], yourChoice: 'Rock', result: 'You lose!', theirChoice: 'Paper'}`

