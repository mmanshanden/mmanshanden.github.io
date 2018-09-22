class Ray {
    origin: Vector3;
    direction: Vector3;
    inverse: Vector3;

    constructor(origin: Vector3, direction: Vector3) {
        this.origin = origin;
        this.direction = direction;
        this.inverse = new Vector3(1 / direction.x, 1 / direction.y, 1 / direction.z);
    }
}
