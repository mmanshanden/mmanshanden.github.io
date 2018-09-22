var Vector3 = /** @class */ (function () {
    function Vector3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /** Creates a new Vector3 object with identical values. */
    Vector3.prototype.Clone = function () {
        return new Vector3(this.x, this.y, this.z);
    };
    /**
     * Returns the result of addig two vectors.
     * @param vector The vector to add.
     */
    Vector3.prototype.Add = function (vector) {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    };
    /**
     * Returns the result of subtracting two vectors.
     * @param vector The vector to subtract.
     */
    Vector3.prototype.Subtract = function (vector) {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    };
    /**
     * Returns the result of multiplying a vector by a scalar value.
     * @param scalar The scalar value.
     */
    Vector3.prototype.Scale = function (scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    };
    /** Returns the result of flooring the individual values to integers. */
    Vector3.prototype.Floor = function () {
        return new Vector3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    };
    /** Returns the unit vector. */
    Vector3.prototype.Normalize = function () {
        var l = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new Vector3(this.x * l, this.y * l, this.z * l);
    };
    /** Returns the length of the vector. */
    Vector3.prototype.Length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    /**
     * Returns the dot product between two vectors.
     * @param vector The vector to produce the dot product with.
     */
    Vector3.prototype.Dot = function (vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    };
    /**
     * Returns the cross product between two vectors.
     * @param vector The vector to produce the cross product with.
     */
    Vector3.prototype.Cross = function (vector) {
        return new Vector3(vector.z * this.y - vector.y * this.z, -vector.z * this.x + vector.x * this.z, vector.y * this.x - vector.x * this.y);
    };
    /**
     * Returns the vector rotated around the x-axis.
     * @param angle The angle of rotation in radians.
     */
    Vector3.prototype.RotateX = function (angle) {
        return new Vector3(this.x, this.y * Math.cos(angle) - this.z * Math.sin(angle), this.y * Math.sin(angle) + this.z * Math.cos(angle));
    };
    /**
     * Returns the vector rotated around the y-axis.
     * @param angle The angle of rotation in radians.
     */
    Vector3.prototype.RotateY = function (angle) {
        return new Vector3(this.z * Math.sin(angle) + this.x * Math.cos(angle), this.y, this.z * Math.cos(angle) - this.x * Math.sin(angle));
    };
    /**
     * Returns the vector rotated around the x-axis.
     * @param angle The angle of rotation in radians.
     */
    Vector3.prototype.RotateZ = function (angle) {
        return new Vector3(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), this.z);
    };
    Vector3.Zero = new Vector3(0, 0, 0);
    Vector3.One = new Vector3(1, 1, 1);
    Vector3.UnitX = new Vector3(1, 0, 0);
    Vector3.UnitY = new Vector3(0, 1, 0);
    Vector3.UnitZ = new Vector3(0, 0, 1);
    return Vector3;
}());
//# sourceMappingURL=vector3.js.map