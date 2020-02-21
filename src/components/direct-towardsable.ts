import { Vector2, vectors } from "../utilities/vectors";
import { Positionable } from "./positionable";
import { Delegate } from "../new-entities/entity";

export class DirectTowardsable implements Delegate {
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
