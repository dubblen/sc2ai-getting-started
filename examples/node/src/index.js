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
