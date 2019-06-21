import { GameContext } from './context.js';

export interface State {
  transition(context: GameContext): void;
  keyHandler(event: KeyboardEvent, context: GameContext): void;
  update(context: GameContext): void;
}

export interface InGameKeys {
  startPressed: boolean;
  firePressed: boolean;
  leftPressed: boolean;
  rightPressed: boolean;
  pausePressed: boolean;
}

export abstract class Base {
  public keyHandler(event: KeyboardEvent, context: GameContext): void {
    switch (event.code) {
      case 'KeyF':
        context.inGameKeys.firePressed = event.type === 'keydown';
        break;
      case 'ArrowLeft':
        event.preventDefault();
        context.inGameKeys.leftPressed = event.type === 'keydown';
        break;
      case 'ArrowRight':
        event.preventDefault();
        context.inGameKeys.rightPressed = event.type === 'keydown';
        break;
      case 'KeyP':
        if (event.type === 'keydown' && !event.repeat) {
          context.inGameKeys.pausePressed = !context.inGameKeys.pausePressed;
        }
        break;
      // no default
    }
  }
}
