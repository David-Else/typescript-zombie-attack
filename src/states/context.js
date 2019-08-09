// ???!! implements State
export class GameContext {
    // ? gameState? rename context to state
    constructor(state, ctx) {
        this.state = state;
        this.ctx = ctx;
        this.entities = {
            hero: {},
            zombies: [],
            bullets: [],
            screenText: [],
        };
        this.score = 0;
        this.inGameKeys = {
            startPressed: false,
            firePressed: false,
            leftPressed: false,
            rightPressed: false,
            pausePressed: false,
        };
    }
    get State() {
        return this.state;
    }
    set State(state) {
        this.state = state;
        // this.pause = false;
    }
    transition() {
        console.log(`Transitioning`);
        this.state.transition(this);
    }
    keyHandler(event) {
        this.state.keyHandler(event, this.inGameKeys);
    }
    updateCurrentState() {
        this.state.update(this);
    }
}
//# sourceMappingURL=context.js.map