var Camera = /** @class */ (function () {
    function Camera(alpha, beta, radius, target) {
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
    Camera.prototype.Update = function (alpha, beta, radius, target) {
        this.alpha = alpha;
        this.beta = beta;
        this.radius = radius;
        this.target = target;
        this.ComputePosition();
    };
    /** Must be called to update the camera after either alpha, beta, radius or target have been changed. */
    Camera.prototype.ComputePosition = function () {
        this.forward = Vector3.UnitZ.RotateX(this.beta).RotateY(this.alpha).Scale(-1);
        this.up = Vector3.UnitY.RotateX(this.beta).RotateY(this.alpha);
        this.right = this.forward.Cross(this.up);
        this.position = this.forward.Scale(-this.radius).Add(this.target);
    };
    /**
     * Creates a ray through a pixel on the canvas.
     * @param x The x coordinate of the pixel.
     * @param y The y coordinate of the pixel.
     * @param canvas The canvas object through which to generate rays.
     */
    Camera.prototype.ConstructRay = function (x, y, canvas) {
        var c = this.position.Add(this.forward.Scale(this.focalDistance));
        var xx = x / canvas.Width() - 0.5; // scale to [-0.5, 0.5]
        var yy = y / canvas.Height() - 0.5;
        var dr = this.right.Scale(xx).Scale(canvas.AspectRatio());
        var du = this.up.Scale(yy);
        var dir = c.Add(dr).Add(du).Subtract(this.position).Normalize();
        return new Ray(this.position, dir);
    };
    return Camera;
}());
//# sourceMappingURL=camera.js.map