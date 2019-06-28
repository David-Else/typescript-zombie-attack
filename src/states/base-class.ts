import { GameContext, InGameKeys } from './context.js';
import { Drawable } from '../entities/base-classes.js';

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
    // Object.keys(context.entities).forEach(characterGroup =>
    //   context.entities[characterGroup].forEach(character => {
    //     character.updatePosition(context);
    //     character.draw(context.ctx);
    //   }),
    // );

    Object.entries(context.entities)
      .flatMap(keyValueArray => {
        const [key, objOrArrayValue] = keyValueArray;
        if (objOrArrayValue instanceof Array) {
          return objOrArrayValue;
        }
        return [objOrArrayValue];
      })
      .forEach((obj: Drawable) => {
        obj.updatePosition(context);
        obj.draw(context.ctx);
      });

    // Object.entries(context.entities)
    //   .flatMap(
    //     ({ 1: objOrArray }: { [key: string]: Drawable | Drawable[] }) => {
    //       if (objOrArray instanceof Array) {
    //         return objOrArray;
    //       }
    //       return [objOrArray];
    //     },
    //   )
    //   .forEach((obj: Drawable) => {
    //     obj.updatePosition(context);
    //     obj.draw(context.ctx);
    //   });

    Object.entries(context.entities)
      .flatMap((keyValueArray: [any, any]) => {
        const [key, objOrArrayValue] = keyValueArray;
        if (objOrArrayValue instanceof Array) {
          return objOrArrayValue;
        }
        return [objOrArrayValue];
      })
      .forEach((obj: Drawable) => {
        obj.updatePosition(context);
        obj.draw(context.ctx);
      });
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
