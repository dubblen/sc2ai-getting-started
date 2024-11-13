# NodeJs bot development

This tutorial will guide you through setting up a development environment for creating a StarCraft II bot using NodeJs
and the [node-sc2](https://github.com/node-sc2/core) library.

## Prerequisites

- ready StarCraft II installation (see [here](../../README.md#1-get--configure-starcraft-ii) how to install & configure
  it)
- NodeJs installed on your machine (see [here](https://nodejs.org/en/download/) how to install it, newer versions are
  recommended)
- npm installed on your machine (comes with NodeJs)
- some IDE and basic knowledge of JavaScript

## Setting up the project
### 1. Project & dependencies
Create a new project directory and initialize it with npm:
```bash
npm init -y
```
install the node-sc2 library:
```bash
npm install @node-sc2/core
```
### 2. Bot code
Create a new file `index.js` in the project directory `./src` and add the following code:
```javascript
const { createAgent, createEngine, createPlayer } = require('@node-sc2/core');
const { Difficulty, Race, PlayerType } = require('@node-sc2/core/constants/enums');
const { COMMANDCENTER, SCV } = require('@node-sc2/core/constants/unit-type');

const bot = createAgent({
  settings: {
    race: Race.TERRAN
  },
  async onGameStart({ resources }) {
    console.log('start')
    const { units, actions, map } = resources.get();

    const workers = units.getWorkers();

    console.log('end')
    return actions.gather(workers)
    //return actions.attackMove(workers, map.getEnemyMain().townhallPosition);
  },
  async onStep({ agent, data, resources }) {
    const { units, actions } = resources.get();
    //console.log(units)
    const myBase = units.getById(COMMANDCENTER);
    console.log(myBase);
    try {
      actions.train(SCV);
    } catch (error) {
      console.log(error)
    }
  }
});

const engine = createEngine({
  host: "127.0.0.1",
  port: "8084",
  launch: false
});

engine.connect().then(async (ping) => {
  console.log(ping)

  let response = await engine.createGame('Equilibrium513AIE.SC2Map', [
    createPlayer({
      race: Race.TERRAN,
      type: PlayerType.PARTICIPANT
    }, bot),
    createPlayer({
      race: Race.RANDOM,
      difficulty: Difficulty.EASY,
    })
  ], true);

  console.log(response)

  console.log(await engine.joinGame(bot))

  console.log("done")
});
```

### 3. Running the bot
Before running the bot, make sure you have StarCraft II running and listening on the correct port. The bot will try to
connect to the game on `localhost:8084`.

To run the bot, execute the following command in the project directory:
```bash
npm start
```

After a few seconds, you should see the bot connecting to the game and starting to play.
