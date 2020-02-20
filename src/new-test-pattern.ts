import { EventObserver } from "../src/EventObserver";
import { Vector2, vectors } from "./utilities/vectors";

const entityEventObserver = new EventObserver();
// entityEventObserver.subscribe((data: any) => console.log(data));

const afunction = (data: any) => console.log(data);

entityEventObserver.subscribe(afunction);
// entityEventObserver.subscribe(() => console.log("foff"));

// entityEventObserver.broadcast("buggeroff");

// entityEventObserver.unsubscribe(() => console.log("foff"));

entityEventObserver.broadcast("main level");

interface Delegate {
  update(): void;
}

class Entity {
  private readonly delegates: Delegate[];
  public entityEventObserver: EventObserver;

  constructor(...delegates: Delegate[]) {
    this.delegates = delegates;
    this.entityEventObserver = new EventObserver();
  }

  public update(): void {
    for (const delegate of this.delegates) {
      delegate.update();
    }
  }
}

/**
 * ============================================================================
 * Graphic components
 * ============================================================================
 */
class BitmapRenderable implements Delegate {
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly image: HTMLImageElement,
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

/**
 * ============================================================================
 * Physics components
 * ============================================================================
 */
class DirectTowardsable implements Delegate {
  constructor(
    private readonly targetPosition: Vector2,
    private readonly speed: number,
    private readonly positionable: Positionable
  ) {}
  public update(): void {
    const { position } = this.positionable;

    // compute delta between the source point and the destination point
    const dx = this.targetPosition[0] - position[0];
    const dy = this.targetPosition[1] - position[1];

    // compute the angle between the two points
    const angle = Math.atan2(dy, dx);

    // return the velocity vector through magnitude (speed) and the angle

    this.positionable.velocity = [
      this.speed * Math.cos(angle),
      this.speed * Math.sin(angle)
    ];
    this.positionable.position = vectors.add(
      this.positionable.position,
      this.positionable.velocity
    );
  }
}
/**
 * this is not a delegate... it is shared state that can be pushed inside a delegate
 */
class Positionable {
  constructor(
    public position: Vector2,
    public width: number,
    public height: number,
    public rotation: number,
    public velocity: Vector2
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.velocity = velocity;
  }
}

/**
 * ============================================================================
 * Input components
 * ============================================================================
 */
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

/**
 * ============================================================================
 * Entity constructors
 * ============================================================================
 */

/**
 * Hero
 */
interface CreateHeroParam {
  ctx: CanvasRenderingContext2D;
  position: Vector2;
}

export const createHero = ({ ctx, position }: CreateHeroParam): Entity => {
  const positionable = new Positionable(position, 25, 50, 33, [0, 0]);
  return new Entity(
    new RectangleRenderable(ctx, "red", positionable),
    new KeyboardInputable(positionable)
  );
};

/**
 * Bullet
 */
interface CreateBulletParam {
  ctx: CanvasRenderingContext2D;
  position: Vector2;
}

export const createBullet = ({ ctx, position }: CreateBulletParam): Entity => {
  const width = 5;
  const height = 10;
  const rotation = 33;
  const positionable = new Positionable(position, width, height, rotation, [
    0,
    0
  ]);
  return new Entity(new RectangleRenderable(ctx, "black", positionable));
};

/**
 * Zombie
 */
interface CreateZombieParam {
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  position: Vector2;
}

export const createZombie = ({
  ctx,
  image,
  position
}: CreateZombieParam): Entity => {
  const width = 10;
  const height = 10;
  const rotation = 0;
  const positionable = new Positionable(position, width, height, rotation, [
    0,
    0
  ]);
  return new Entity(
    new BitmapRenderable(ctx, image, positionable),
    new DirectTowardsable([500, 500], 1, positionable)
  );
};
