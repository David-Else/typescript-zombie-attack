// import globalState <<<<<<<<<<<<<<<
// is game game context game state? make clearer, internal, global. make state diagram, make clear global state, each level has internal state, >> screenState <<
// draw new diagram! map state

// david-else.github.io/typescript-zombie-attack/
// github.com/David-Else/typescript-zombie-attack

// zoom.us/
export interface State {
  handle(context: Context): void;
}

export class ConcreteStateA implements State {
  public handle(context: Context): void {
    console.log('`handle` method of ConcreteStateA is being called!');
    context.State = new ConcreteStateB();
  }
}

export class ConcreteStateB implements State {
  public handle(context: Context): void {
    console.log('`handle` method of ConcreteStateB is being called!');
    context.State = new ConcreteStateA();
  }
}

export class Context {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  public get State(): State {
    return this.state;
  }

  public set State(state: State) {
    this.state = state;
  }

  public request(): void {
    console.log('request is being called!');
    this.state.handle(this);
  }
}

const context = new Context(new ConcreteStateA());
context.request();
context.request();
context.request();
context.request();
context.request();
context.request();
context.request();
context.request();
