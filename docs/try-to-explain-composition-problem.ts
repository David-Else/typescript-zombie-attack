/**
 * Vectors
 */
type Vector2 = [number, number];

const vectors = {
  add(a: Vector2, b: Vector2): Vector2 {
    return [a[0] + b[0], a[1] + b[1]];
  }
};

/**
 * Pub Sub
 */
export interface EO {
  subscribe(fn: any): void;
  unsubscribe(fn: any): void;
  broadcast(data: any): void;
}

export class EventObserver implements EO {
  constructor(public observers = [] as any) {} // make it private after test

  subscribe(fn: any) {
    this.observers.push(fn);
  }

  unsubscribe(fn: any) {
    this.observers = this.observers.filter(
      (subscriber: any) => subscriber !== fn
    );
  }

  broadcast(data: any) {
    this.observers.forEach((subscriber: any) => subscriber(data));
  }
}

const entityEventObserver = new EventObserver();
entityEventObserver.subscribe(() => console.log("hello from eeo!"));

/**
 * Entity
 */
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
    // this.ctx.drawImage(this.image, position[0], position[1]);
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
    private readonly positionable: Positionable,
    public globalEventObserver: EventObserver
  ) {}
  public update(): void {
    this.globalEventObserver.broadcast("hello");
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
 * Entity constructors
 * ============================================================================
 */

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
    new DirectTowardsable([500, 500], 1, positionable, entityEventObserver)
  );
};

// mocks
const testZombie = new Image();
const ctx = {} as CanvasRenderingContext2D;

const zombie = createZombie({ ctx, image: testZombie, position: [120, 50] });
const zombie2 = createZombie({ ctx, image: testZombie, position: [20, 20] });

zombie.update();
entityEventObserver.subscribe(() => console.log("bottom!"));
zombie.update();
