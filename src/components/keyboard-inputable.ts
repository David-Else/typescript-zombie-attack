import { Positionable } from "./positionable";
import { Delegate } from "../new-entities/entity";

export class KeyboardInputable implements Delegate {
  private firePaused = false;
  private keysPressed = {
    fire: false,
    left: false,
    right: false,
    pause: false
  };
  constructor(private readonly positionable: Positionable) {
    document.addEventListener("keydown", this.keyHandler);
    document.addEventListener("keyup", this.keyHandler);
  }
  update(): void {
    if (this.keysPressed.right) {
      this.positionable.rotation += 1;
    }
    if (this.keysPressed.left) {
      this.positionable.rotation -= 1;
    }
    // if fire is not pressed then un-pause the firing
    if (!this.keysPressed.fire) {
      this.firePaused = false;
    }

    // if (
    //   this.keysPressed.fire &&
    //   world.numberOfBullets > 0 &&
    //   !this.firePaused
    // ) {
    //   // pause the firing until the fire key is released
    //   this.firePaused = true;
    //   world.entityFactory(GameObject, 'bullets', 1, {
    //     startPosition: () => world.entities.hero[0].position,
    //     startVelocity: [0, 0],
    //     startRotation: world.entities.hero[0].rotation,
    //     Physics: BulletPhysicsComponent,
    //     Graphics: BulletGraphicsComponent,
    //   });
    // }
  }

  private readonly keyHandler = (event: KeyboardEvent): void => {
    switch (event.code) {
      case "KeyF":
        this.keysPressed.fire = event.type === "keydown";
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.keysPressed.left = event.type === "keydown";
        break;
      case "ArrowRight":
        event.preventDefault();
        this.keysPressed.right = event.type === "keydown";
        break;
      case "KeyP":
        if (event.type === "keydown" && !event.repeat) {
          this.keysPressed.pause = !this.keysPressed.pause;
        }
        break;
    }
  };
}
