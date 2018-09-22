class Box implements IShape {
    min: Vector3;
    max: Vector3;

    constructor(min: Vector3, max: Vector3) {
        this.min = min;
        this.max = max;
    }

    /**
     * Returns a RayHit object indicating that a given ray intersects with this box, or
     * null to indicate a miss. 
     * @param ray The ray to intersect with.
     */
    RayIntersect(ray: Ray): RayHit {
        var t1 = (this.min.x - ray.origin.x) * ray.inverse.x;
        var t2 = (this.max.x - ray.origin.x) * ray.inverse.x;
        var t3 = (this.min.y - ray.origin.y) * ray.inverse.y;
        var t4 = (this.max.y - ray.origin.y) * ray.inverse.y;
        var t5 = (this.min.z - ray.origin.z) * ray.inverse.z;
        var t6 = (this.max.z - ray.origin.z) * ray.inverse.z;

        var txmin = Math.min(t1, t2);
        var tymin = Math.min(t3, t4);
        var tzmin = Math.min(t5, t6);

        var tmax = Math.min(Math.max(t1, t2), Math.max(t3, t4), Math.max(t5, t6));
        var tmin = Math.max(txmin, tymin, tzmin);

        if (tmax > 0 && tmin < tmax) {
            var hit = new RayHit();
            hit.tmin = tmin;
            hit.tmax = tmax;

            if (tmin == txmin) {
                hit.normal = new Vector3(1, 0, 0);
            }
            if (tmin == tymin) {
                hit.normal = new Vector3(0, 1, 0);
            }
            if (tmin == tzmin) {
                hit.normal = new Vector3(0, 0, 1);
            }

            return hit;
        }

        return null;
    }
}
