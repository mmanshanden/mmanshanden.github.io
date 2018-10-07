var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    /** Returns the vector with for each axis the absolute value. */
    Vector3.prototype.Abs = function () {
        return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
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
/// <reference path="vector3.ts" />
/// <reference path="vector3.ts" />
var Ray = /** @class */ (function () {
    function Ray(origin, direction) {
        this.origin = origin;
        this.direction = direction;
        this.inverse = new Vector3(1 / direction.x, 1 / direction.y, 1 / direction.z);
    }
    Ray.prototype.Shoot = function (distance) {
        return this.origin.Add(this.direction.Scale(distance));
    };
    return Ray;
}());
/// <reference path="icanvas.ts" />
/// <reference path="vector3.ts" />
/// <reference path="ray.ts" />
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
/// <reference path="vector3.ts" />
var RayHit = /** @class */ (function () {
    function RayHit() {
    }
    return RayHit;
}());
/// <reference path="ray.ts" />
/// <reference path="rayhit.ts" />
/// <reference path="vector3.ts" />
/// <reference path="ishape.ts" />
/// <reference path="ray.ts" />
/// <reference path="rayhit.ts" />
var Box = /** @class */ (function () {
    function Box(min, max) {
        this.min = min;
        this.max = max;
    }
    /**
     * Returns a RayHit object indicating that a given ray intersects with this box, or
     * null to indicate a miss.
     * @param ray The ray to intersect with.
     */
    Box.prototype.RayIntersect = function (ray) {
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
    };
    return Box;
}());
/// <reference path="ishape.ts" />
/// <reference path="vector3.ts" />
/// <reference path="ray.ts" />
/// <reference path="rayhit.ts" />
function max(a, b) {
    return Math.max(a, b);
}
function min(a, b) {
    return Math.min(a, b);
}
var e = 0.001; // epsilon
var s = 128; // nr of steps
var n = 0.00001;
var l = new Vector3(0, 100, 0);
var SdfShape = /** @class */ (function () {
    function SdfShape(position, radius) {
        this.position = position;
        this.radius = radius;
    }
    SdfShape.prototype.Scene = function (p) {
        return Infinity;
    };
    SdfShape.prototype.Scene3 = function (x, y, z) {
        return this.Scene(new Vector3(x, y, z));
    };
    SdfShape.prototype.RayIntersect = function (ray, si) {
        if (si === void 0) { si = 0; }
        var depth = e * 2;
        for (var i = 0; i < s; i++) {
            var p = ray.Shoot(depth);
            var d = this.Scene(p);
            if (d < e) {
                var hit = new RayHit();
                hit.tmin = d;
                hit.tmax = Infinity;
                hit.normal = new Vector3(this.Scene3(p.x - n, p.y, p.z) - this.Scene3(p.x + n, p.y, p.z), this.Scene3(p.x, p.y - n, p.z) - this.Scene3(p.x, p.y + n, p.z), this.Scene3(p.x, p.y, p.z - n) - this.Scene3(p.x, p.y, p.z + n)).Normalize();
                if (si > 0) {
                    var os = hit.normal.Scale(e);
                    var p2 = p.Add(os);
                    var sr = p2.Subtract(l).Normalize();
                    var shadow = new Ray(p2, sr);
                    if (this.RayIntersect(shadow, 0) != null)
                        return null;
                }
                return hit;
            }
            depth += d;
            if (depth >= 100)
                return null;
        }
        return null;
    };
    return SdfShape;
}());
/// <reference path="sdfshape.ts" />
var SdfTorus = /** @class */ (function (_super) {
    __extends(SdfTorus, _super);
    function SdfTorus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SdfTorus.prototype.Torus = function (p) {
        var xz = Math.sqrt(p.x * p.x + p.z * p.z);
        var qx = xz - 1.4;
        var qy = p.y;
        return Math.sqrt(qx * qx + qy * qy) - 0.5;
    };
    SdfTorus.prototype.Displacement = function (p, func) {
        var d = Math.PI * 1.183274;
        var d1 = func(p);
        var d2 = 0.2 * Math.sin(p.x * d) * Math.sin(p.y * d) * Math.sin(p.z * d);
        return d1 + d2;
    };
    SdfTorus.prototype.Scene = function (p) {
        return this.Displacement(p, this.Torus);
    };
    return SdfTorus;
}(SdfShape));
/// <reference path="icanvas.ts" />
/// <reference path="camera.ts" />
/// <reference path="vector3.ts" />
/// <reference path="box.ts" />
/// <reference path="sdftorus.ts" />
var Game = /** @class */ (function () {
    /**
     * Creates a new game object. The game object is responsible for updating and
     * drawing the game state.
     * @param canvas Canvas object to draw on.
     */
    function Game(canvas) {
        this.canvas = canvas;
        this.camera = new Camera(0, 0, 5, Vector3.Zero);
        this.shape = new Box(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
        this.shape = new SdfTorus(Vector3.Zero, 1.5);
        var dloop = (Math.random() + 1) / 10000;
        this.loop = Math.random() * 1000;
        this.dloop = Math.random() < 0.5 ? dloop : dloop * -1;
    }
    /**
     * Updates the state of the game.
     * @param dt Number of millseconds elapsed since previous update call.
     */
    Game.prototype.Update = function (dt) {
        this.loop = this.loop + this.dloop * dt;
        this.camera.Update(this.loop * 0.4, Math.sin(this.loop + 0.3454) * 0.65 + 0.1, Math.sin(this.loop * 0.71 + 0.1832) * 1.4 + 4.5, new Vector3(0, 0, 0));
    };
    /**
     * Draws the current state of the game to a canvas.
     * @param dt Number of milliseconds elapsed since previous draw call.
     */
    Game.prototype.Draw = function (dt) {
        for (var y = 0; y < this.canvas.Height(); y++) {
            for (var x = 0; x < this.canvas.Width(); x++) {
                var ray = this.camera.ConstructRay(x, y, this.canvas);
                this.canvas.SetPixel(x, y, new Vector3(0, 0, 0));
                var hit = this.shape.RayIntersect(ray);
                if (hit != null) {
                    var color = new Vector3(hit.normal.x < 0 ? 0 : hit.normal.x, hit.normal.y < 0 ? 0 : hit.normal.y, hit.normal.z < 0 ? 0 : hit.normal.z);
                    this.canvas.SetPixel(x, y, color);
                }
            }
        }
    };
    return Game;
}());
/// <reference path="vector3.ts" />
var CanvasHTML5 = /** @class */ (function () {
    function CanvasHTML5(element) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = element.clientWidth;
        this.canvas.height = element.clientHeight;
        this.context = this.canvas.getContext("2d");
        element.appendChild(this.canvas);
    }
    CanvasHTML5.prototype.Width = function () {
        return this.dim_width;
    };
    CanvasHTML5.prototype.Height = function () {
        return this.dim_height;
    };
    CanvasHTML5.prototype.AspectRatio = function () {
        return this.dim_ar;
    };
    CanvasHTML5.prototype.Resize = function (width, height) {
        width = Math.min(width, 240);
        height = Math.min(height, 240);
        this.canvas.width = this.dim_width = width;
        this.canvas.height = this.dim_height = height;
        this.dim_ar = this.dim_width / this.dim_height;
        this.canvas.width = this.dim_width;
        this.canvas.height = this.dim_height;
        this.pixels = new ImageData(this.dim_width, this.dim_height);
    };
    CanvasHTML5.prototype.SetPixel = function (x, y, color) {
        var pos = (x + y * this.dim_width) << 2;
        this.pixels.data[pos + 0] = Math.floor(color.x * 255);
        this.pixels.data[pos + 1] = Math.floor(color.y * 255);
        this.pixels.data[pos + 2] = Math.floor(color.z * 255);
        this.pixels.data[pos + 3] = 255;
    };
    CanvasHTML5.prototype.SwapBuffer = function () {
        this.context.putImageData(this.pixels, 0, 0);
    };
    return CanvasHTML5;
}());
var CanvasAsciiColor = /** @class */ (function () {
    function CanvasAsciiColor(element) {
        this.element = element;
    }
    /** Returns the width of the canvas. */
    CanvasAsciiColor.prototype.Width = function () {
        return this.dim_width;
    };
    /** Returns the height of the canvas. */
    CanvasAsciiColor.prototype.Height = function () {
        return this.dim_height;
    };
    /** Returns the aspect ratio of the canvas. The aspect ratio is the width devided by the height. */
    CanvasAsciiColor.prototype.AspectRatio = function () {
        return this.dim_ar;
    };
    /**
     * Instructs the canvas to resize to the given dimensions.
     * @param width The new width of the canvas.
     * @param height The new height of the canvas.
     */
    CanvasAsciiColor.prototype.Resize = function (width, height) {
        this.element.innerHTML = "<span>&nbsp</span>";
        var rect = this.element.getElementsByTagName("span")[0].getBoundingClientRect();
        this.dim_width = Math.floor(width / rect.width);
        this.dim_height = Math.floor(height / rect.height);
        this.dim_ar = (this.dim_width * rect.width) / (this.dim_height * rect.height);
        var c = this.dim_width * this.dim_height;
        this.buffer = new Array(c);
        for (var i = 0; i < c; i++) {
            this.buffer[i] = Vector3.Zero;
        }
        this.SwapBuffer();
    };
    /**
     * Changes a pixel in the canvas to a given color. The origin (0, 0) is top left.
     * @param x The x coordinate of the pixel.
     * @param y The y coordinate of the pixel.
     * @param color The new color of the pixel. Values are in range [0, 1].
     */
    CanvasAsciiColor.prototype.SetPixel = function (x, y, color) {
        this.buffer[x + y * this.dim_width] = color;
        return;
        var m = Math.max(color.x, color.y, color.z);
        var b = Math.floor(m * m * 12); // brightness
        var c = color.Scale(255).Floor(); // color
        b = Math.min(b, 11);
        var char = b > 0 ? "-:;oO0%$&#@"[b - 1] : "&nbsp;";
        //this.buffer[x + y * this.dim_width] = `<span style="color:rgb(${c.x}, ${c.y}, ${c.z})">${char}</span>`;
    };
    /** Pushes a new frame to the screen. */
    CanvasAsciiColor.prototype.SwapBuffer = function () {
        var html = "<pre>";
        var line = "";
        var current = Vector3.Zero;
        var idx = 0;
        for (var y = 0; y < this.dim_height; y++) {
            for (var x = 0; x < this.dim_width; x++) {
                var color = this.buffer[idx];
                var m = Math.max(color.x, color.y, color.z);
                var b = Math.floor(m * m * 12); // brightness
                var c = color.Scale(255).Floor(); // color
                var char = " -:;oO0%$&#@"[b];
                c.x = c.x & 224;
                c.y = c.y & 224;
                c.z = c.z & 224;
                if (c.x == current.x && c.y == current.y && c.z == current.z) {
                    line += char;
                }
                else {
                    if (line.length > 0) {
                        html += "<span style=\"color:rgb(" + current.x + ", " + current.y + ", " + current.z + ")\">" + line + "</span>";
                    }
                    line = char;
                    current = c;
                }
                idx++;
            }
            line += "</br>";
        }
        if (line.length > 0) {
            html += "<span style=\"color:rgb(" + current.x + ", " + current.y + ", " + current.z + ")\">" + line + "</span>";
        }
        this.element.innerHTML = html + "</pre>";
    };
    return CanvasAsciiColor;
}());
var CanvasAsciiWhite = /** @class */ (function () {
    function CanvasAsciiWhite(element) {
        this.element = element;
    }
    /** Returns the width of the canvas. */
    CanvasAsciiWhite.prototype.Width = function () {
        return this.dim_width;
    };
    /** Returns the height of the canvas. */
    CanvasAsciiWhite.prototype.Height = function () {
        return this.dim_height;
    };
    /** Returns the aspect ratio of the canvas. The aspect ratio is the width devided by the height. */
    CanvasAsciiWhite.prototype.AspectRatio = function () {
        return this.dim_ar;
    };
    /**
     * Instructs the canvas to resize to the given dimensions.
     * @param width The new width of the canvas.
     * @param height The new height of the canvas.
     */
    CanvasAsciiWhite.prototype.Resize = function (width, height) {
        this.element.innerHTML = "<span>&nbsp;</span>";
        var rect = this.element.getElementsByTagName("span")[0].getBoundingClientRect();
        this.dim_width = Math.floor(width / rect.width);
        this.dim_height = Math.floor(height / rect.height);
        this.dim_ar = (this.dim_width * rect.width) / (this.dim_height * rect.height);
        this.pixels = Array(this.dim_width * this.dim_height);
        var c = this.dim_width * this.dim_height;
        for (var i = 0; i < c; i++) {
            this.pixels[i] = " ";
        }
        this.element.innerHTML = "<pre></pre>";
        this.pre = this.element.getElementsByTagName("pre")[0];
        this.SwapBuffer();
    };
    /**
     * Changes a pixel in the canvas to a given color. The origin (0, 0) is top left.
     * @param x The x coordinate of the pixel.
     * @param y The y coordinate of the pixel.
     * @param color The new color of the pixel. Values are in range [0, 1].
     */
    CanvasAsciiWhite.prototype.SetPixel = function (x, y, color) {
        var m = Math.max(color.x, color.y, color.z);
        var b = Math.floor(m * m * 4);
        b = Math.min(b, 4);
        if (m == color.x) {
            this.pixels[x + y * this.dim_width] = " oO08"[b];
            return;
        }
        if (m == color.y) {
            this.pixels[x + y * this.dim_width] = " :;%$"[b];
            return;
        }
        this.pixels[x + y * this.dim_width] = " vxwm"[b];
    };
    /** Pushes a new frame to the screen. */
    CanvasAsciiWhite.prototype.SwapBuffer = function () {
        var idx = 0;
        var text = "";
        for (var y = 0; y < this.dim_height; y++) {
            for (var x = 0; x < this.dim_width; x++) {
                text += this.pixels[idx++];
            }
            text += "\n";
        }
        this.pre.textContent = text;
    };
    return CanvasAsciiWhite;
}());
/// <reference path="game.ts" />
/// <reference path="icanvas.ts" />
/// <reference path="canvas.ts" />
var game;
var canvas;
var frame_time;
var paused = false;
var element;
window.onload = function () {
    element = document.getElementById("center-block");
    canvas = new CanvasAsciiColor(element);
    game = new Game(canvas);
    canvas.Resize(element.clientWidth, element.clientHeight);
    frame_time = new Date();
    startgame();
};
window.onresize = function () {
    canvas.Resize(element.clientWidth, element.clientHeight);
    game.Draw(0);
    canvas.SwapBuffer();
};
function loop() {
    var time = new Date();
    var elapsed = frame_time.getTime() - time.getTime();
    frame_time = time;
    game.Update(elapsed);
    game.Draw(elapsed);
    canvas.SwapBuffer();
    if (!paused)
        window.requestAnimationFrame(loop);
}
function startgame() {
    paused = false;
    loop();
}
function stopgame() {
    paused = true;
}
var Matrix = /** @class */ (function () {
    function Matrix(test) {
        this.test = test;
    }
    return Matrix;
}());
/// <reference path="vector3.ts" />
/// <reference path="ishape.ts" />
/// <reference path="ray.ts" />
/// <reference path="rayhit.ts" />
var Sphere = /** @class */ (function () {
    function Sphere(center, radius) {
        this.center = center;
        this.radius = radius;
        this.radius2 = radius * radius;
    }
    /**
     * Returns a RayHit object indicating that a given ray intersects with this box, or
     * null to indicate a miss.
     * @param ray The ray to intersect with.
     */
    Sphere.prototype.RayIntersect = function (ray) {
        var t1, t0;
        var L = this.center.Subtract(ray.origin);
        var tca = L.Dot(ray.direction);
        if (tca < 0)
            return null;
        var d2 = L.Dot(L) - tca * tca;
        if (d2 > this.radius2)
            return null;
        var thc = Math.sqrt(this.radius2 - d2);
        t1 = tca - thc;
        t0 = tca + thc;
        if (t1 > t0) {
            var t = t0;
            t0 = t1;
            t1 = t;
        }
        if (t0 == 0 && t1 == 0)
            return null;
        var hit = new RayHit();
        hit.tmin = t0;
        hit.tmax = t1;
        return hit;
    };
    return Sphere;
}());
//# sourceMappingURL=app.js.map