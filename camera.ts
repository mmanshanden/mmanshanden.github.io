class Camera {
    private position: Vector3;
    private forward: Vector3;
    private up: Vector3;
    private right: Vector3;
    private focalDistance: number;

    private alpha: number;
    private beta: number;
    private radius: number;
    private target: Vector3;

    constructor(alpha: number, beta: number, radius: number, target: Vector3) {
        this.position = new Vector3(0, 0, 0);
        this.forward = new Vector3(0, 0, 0);
        this.up = new Vector3(0, 0, 0);
        this.right = new Vector3(0, 0, 0);

        this.Update(alpha, beta, radius, target);

        this.focalDistance = 1;
    }

    /**
     * Updates the camera state.
     * @param alpha The rotation around the y-axis.
     * @param beta The rotation around the x-axis.
     * @param radius The distance between the target position and the camera position.
     * @param target The focus point of the camera.
     */
    public Update(alpha: number, beta: number, radius: number, target: Vector3): void {
        this.alpha = alpha;
        this.beta = beta;
        this.radius = radius;
        this.target = target;
        this.ComputePosition();
    }

    /** Must be called to update the camera after either alpha, beta, radius or target have been changed. */
    private ComputePosition(): void {
        this.forward = Vector3.UnitZ.RotateX(this.beta).RotateY(this.alpha).Scale(-1);
        this.up = Vector3.UnitY.RotateX(this.beta).RotateY(this.alpha);
        this.right = this.forward.Cross(this.up);

        this.position = this.forward.Scale(-this.radius).Add(this.target);
    }

    /**
     * Creates a ray through a pixel on the canvas.
     * @param x The x coordinate of the pixel.
     * @param y The y coordinate of the pixel.
     * @param canvas The canvas object through which to generate rays.
     */
    public ConstructRay(x: number, y: number, canvas: ICanvas): Ray {
        var c = this.position.Add(this.forward.Scale(this.focalDistance));

        var xx = x / canvas.Width() - 0.5;  // scale to [-0.5, 0.5]
        var yy = y / canvas.Height() - 0.5;

        var dr = this.right.Scale(xx).Scale(canvas.AspectRatio());
        var du = this.up.Scale(yy);

        var dir = c.Add(dr).Add(du).Subtract(this.position).Normalize();

        return new Ray(this.position, dir);
    }
}
