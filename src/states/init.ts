import { Base } from "./base-class";
import { GlobalState, StatePattern } from "./global-state";
import { StartScreen } from "./start-screen";

export class Init extends Base implements StatePattern {
  private runAsyncInitFunctionOnce = false; // HACK?

  public transition(globalState: GlobalState): void {
    globalState.State = new StartScreen(globalState);
  }

  public update(context: GlobalState): void {
    if (!this.runAsyncInitFunctionOnce) {
      this.runAsyncInitFunctionOnce = true;
      // it transitions at end of this async
      GlobalState.loadAssets(context).catch(message => console.error(message));
    }
  }
}
