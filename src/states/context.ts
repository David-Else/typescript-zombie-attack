import { State } from './base-class.js';

export class GameContext {
  public constructor(
    private state: State,
    public ctx: CanvasRenderingContext2D,
  ) {
    this.state = state;
  }

  public get State(): State {
    return this.state;
  }

  public set State(state: State) {
    this.state = state;
  }

  public transition(): void {
    console.log(`Transitioning`);
    this.state.transition(this);
  }

  public keyHandler(ev: KeyboardEvent): void {
    this.state.keyHandler(ev);
  }

  public update(): void {
    this.state.update(this);
  }

  public renderAll(): void {
    this.state.renderAll(this);
  }
}
