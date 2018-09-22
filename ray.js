var Ray = /** @class */ (function () {
    function Ray(origin, direction) {
        this.origin = origin;
        this.direction = direction;
        this.inverse = new Vector3(1 / direction.x, 1 / direction.y, 1 / direction.z);
    }
    return Ray;
}());
//# sourceMappingURL=ray.js.map