export class GlobalState {
    // levelState
    constructor(ctx) {
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
}
//# sourceMappingURL=global-state.js.map