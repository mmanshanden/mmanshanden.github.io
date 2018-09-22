class Vector3 {
    x: number;
    y: number;
    z: number;

    public static Zero = new Vector3(0, 0, 0);
    public static One = new Vector3(1, 1, 1);

    public static UnitX = new Vector3(1, 0, 0);
    public static UnitY = new Vector3(0, 1, 0);
    public static UnitZ = new Vector3(0, 0, 1);

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /** Creates a new Vector3 object with identical values. */
    public Clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * Returns the result of addig two vectors.
     * @param vector The vector to add.
     */
    public Add(vector: Vector3): Vector3 {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    /**
     * Returns the result of subtracting two vectors.
     * @param vector The vector to subtract.
     */
    public Subtract(vector: Vector3): Vector3 {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    /**
     * Returns the result of multiplying a vector by a scalar value.
     * @param scalar The scalar value.
     */
    public Scale(scalar: number): Vector3 {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    /** Returns the result of flooring the individual values to integers. */
    public Floor(): Vector3 {
        return new Vector3(
            Math.floor(this.x),
            Math.floor(this.y),
            Math.floor(this.z)
        );
    }

    /** Returns the unit vector. */
    public Normalize(): Vector3 {
        var l = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new Vector3(this.x * l, this.y * l, this.z * l);
    }

    /** Returns the length of the vector. */
    public Length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * Returns the dot product between two vectors.
     * @param vector The vector to produce the dot product with.
     */
    public Dot(vector: Vector3): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    /**
     * Returns the cross product between two vectors.
     * @param vector The vector to produce the cross product with.
     */
    public Cross(vector: Vector3): Vector3 {
        return new Vector3(
            vector.z * this.y - vector.y * this.z,
            -vector.z * this.x + vector.x * this.z,
            vector.y * this.x - vector.x * this.y
        );
    }

    /**
     * Returns the vector rotated around the x-axis.
     * @param angle The angle of rotation in radians.
     */
    public RotateX(angle: number): Vector3 {
        return new Vector3(
            this.x,
            this.y * Math.cos(angle) - this.z * Math.sin(angle),
            this.y * Math.sin(angle) + this.z * Math.cos(angle)
        );
    }

    /**
     * Returns the vector rotated around the y-axis.
     * @param angle The angle of rotation in radians.
     */
    public RotateY(angle: number): Vector3 {
        return new Vector3(
            this.z * Math.sin(angle) + this.x * Math.cos(angle),
            this.y,
            this.z * Math.cos(angle) - this.x * Math.sin(angle)
        );
    }

    /**
     * Returns the vector rotated around the x-axis.
     * @param angle The angle of rotation in radians.
     */
    public RotateZ(angle: number): Vector3 {
        return new Vector3(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle),
            this.z
        );
    }
}
