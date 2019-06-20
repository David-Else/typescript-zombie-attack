import { GameContext } from './context.js';

export interface State {
  transition(context: GameContext): void;
  keyHandler(event: KeyboardEvent, context: GameContext): void;
  update(context: GameContext): void;
  renderAll(context: GameContext): void;

  //   draw(): void;
  // levelDate
}

export interface InGameKeys {
  startPressed: boolean;
  firePressed: boolean;
  leftPressed: boolean;
  rightPressed: boolean;
  pausePressed: boolean;
}

export abstract class Base {
  public renderAll(context: GameContext): void {
    context.ctx.clearRect(
      0,
      0,
      context.ctx.canvas.width,
      context.ctx.canvas.height,
    );
    Object.keys(context.entities).forEach(characterGroup =>
      context.entities[characterGroup].forEach(character => {
        character.update(context);
        character.draw(context.ctx);
      }),
    );
  }

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
