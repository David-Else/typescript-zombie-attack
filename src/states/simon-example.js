// import globalState <<<<<<<<<<<<<<<
// is game game context game state? make clearer, internal, global. make state diagram, make clear global state, each level has internal state, >> screenState <<
// draw new diagram! map state
export class ConcreteStateA {
    handle(context) {
        console.log('`handle` method of ConcreteStateA is being called!');
        context.State = new ConcreteStateB();
    }
}
export class ConcreteStateB {
    handle(context) {
        console.log('`handle` method of ConcreteStateB is being called!');
        context.State = new ConcreteStateA();
    }
}
export class Context {
    constructor(state) {
        this.state = state;
    }
    get State() {
        return this.state;
    }
    set State(state) {
        this.state = state;
    }
    request() {
        console.log('request is being called!');
        this.state.handle(this);
    }
}
var context = new Context(new ConcreteStateA());
context.request();
context.request();
context.request();
context.request();
context.request();
context.request();
context.request();
context.request();
//# sourceMappingURL=simon-example.js.map