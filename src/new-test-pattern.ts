import { Vector2 } from "./utilities/vectors";

interface Delegate {
  update(): void;
}

class Entity {
  private readonly delegates: Delegate[];

  constructor(...delegates: Delegate[]) {
    this.delegates = delegates;
  }

  public update(): void {
    for (const delegate of this.delegates) {
      delegate.update();
    }
  }
}

class Positionable {
  constructor(
    public position: Vector2,
    public width: number,
    public height: number,
    public rotation: number
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
  }
}

class BitmapRenderable implements Delegate {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private image: HTMLImageElement, // Needs to be async
    private readonly positionable: Positionable
  ) {}
  public update(): void {
    const { position } = this.positionable;
    this.ctx.drawImage(this.image, position[0], position[1]);
  }
}

class RectangleRenderable implements Delegate {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private readonly fill: string,
    private readonly positionable: Positionable
  ) {}
  public update(): void {
    const { position, width, height, rotation } = this.positionable;
    // first save the untranslated/unrotated context
    this.ctx.save();
    this.ctx.beginPath();
    // move the rotation point to the center of the rect
    this.ctx.translate(position[0] + width / 2, position[1] + height / 2);
    // rotate the rect
    this.ctx.rotate(rotation * (Math.PI / 180));
    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    this.ctx.fillStyle = this.fill;
    this.ctx.fillRect(width / -2, height / -2, width, height);
    // restore the context to its untranslated/unrotated state
    this.ctx.restore();
  }
}

class KeyboardInputable implements Delegate {
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

export const createHero = (
  ctx: CanvasRenderingContext2D,
  position: Vector2
): Entity => {
  const positionable = new Positionable(position, 25, 50, 33);
  const rectangleRenderable = new RectangleRenderable(ctx, "red", positionable);
  const keyboardInputable = new KeyboardInputable(positionable);
  return new Entity(rectangleRenderable, keyboardInputable);
};

export const createBullet = (
  ctx: CanvasRenderingContext2D,
  position: Vector2
): Entity => {
  const width = 5;
  const height = 10;
  const rotation = 33;
  const positionable = new Positionable(position, width, height, rotation);
  const rectangleRenderable = new RectangleRenderable(
    ctx,
    "black",
    positionable
  );
  const keyboardInputable = new KeyboardInputable(positionable);
  return new Entity(rectangleRenderable, keyboardInputable);
};

export const createZombie = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  position: Vector2
): Entity => {
  const width = 10;
  const height = 10;
  const rotation = 0;
  const positionable = new Positionable(position, width, height, rotation);
  const bitmapRenderable = new BitmapRenderable(ctx, image, positionable);

  return new Entity(bitmapRenderable);
};
