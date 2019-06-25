import { GameContext, InGameKeys } from './context.js';

export interface State {
  transition(context: GameContext): void;
  keyHandler(event: KeyboardEvent, inGameKeys: InGameKeys): void;
  update(context: GameContext): void;
  //   draw(): void;
}

export abstract class Base {
  public update(context: GameContext): void {
    context.ctx.clearRect(
      0,
      0,
      context.ctx.canvas.width,
      context.ctx.canvas.height,
    );
    Object.keys(context.entities).forEach(characterGroup =>
      context.entities[characterGroup].forEach(character => {
        character.updatePosition(context);
        character.draw(context.ctx);
      }),
    );
  }
  public keyHandler(event: KeyboardEvent, inGameKeys: InGameKeys): void {
    switch (event.code) {
      case 'KeyF':
        inGameKeys.firePressed = event.type === 'keydown';
        break;
      case 'ArrowLeft':
        event.preventDefault();
        inGameKeys.leftPressed = event.type === 'keydown';
        break;
      case 'ArrowRight':
        event.preventDefault();
        inGameKeys.rightPressed = event.type === 'keydown';
        break;
      case 'KeyP':
        if (event.type === 'keydown' && !event.repeat) {
          inGameKeys.pausePressed = !inGameKeys.pausePressed;
        }
        break;
      // no default
    }
  }
}
