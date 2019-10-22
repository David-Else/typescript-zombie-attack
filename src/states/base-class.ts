import { Drawable } from '../entities/base-class.js';
import { GlobalState, InGameKeys } from './global-state.js';

export abstract class Base {
  public update(globalState: GlobalState): void {
    globalState.ctx.clearRect(
      0,
      0,
      globalState.ctx.canvas.width,
      globalState.ctx.canvas.height,
    );

    // Object.keys(context.entities).forEach(characterGroup =>
    //   context.entities[characterGroup].forEach(character => {
    //     character.updatePosition(context);
    //     character.draw(context.ctx);
    //   }),
    // );

    // STUDY THE DIFFERENCE enteries and values

    // Object.entries(context.entities)
    //   .flatMap(keyValueArray => {
    //     const [key, objOrArrayValue] = keyValueArray;
    //     if (objOrArrayValue instanceof Array) {
    //       return objOrArrayValue;
    //     }
    //     return [objOrArrayValue];
    //   })
    //   .forEach((obj: Drawable) => {
    //     obj.updatePosition(context);
    //     obj.draw(context.ctx);
    //   });

    Object.values(globalState.entities)
      .flatMap(val => (val instanceof Array ? val : [val]))
      .forEach((entity: Drawable) => {
        entity.updatePosition(globalState);
        entity.draw(globalState.ctx);
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
    }
  }
}
