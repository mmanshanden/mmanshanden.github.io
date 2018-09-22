class Game {
    canvas: ICanvas;
    camera: Camera;
    box: Box;

    loop: number;
    dloop: number;

    /**
     * Creates a new game object. The game object is responsible for updating and
     * drawing the game state.
     * @param canvas Canvas object to draw on.
     */
    constructor(canvas: ICanvas) {
        this.canvas = canvas;
        this.camera = new Camera(0, 0, 5, Vector3.Zero);

        this.box = new Box(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));

        var dloop = (Math.random() + 1) / 6000;
        
        this.loop = Math.random() * 100;
        this.dloop = Math.random() < 0.5 ? dloop : dloop * -1;
    }

    /**
     * Updates the state of the game.
     * @param dt Number of millseconds elapsed since previous update call.
     */
    Update(dt: number) {
        this.loop = this.loop + this.dloop * dt;

        this.camera.Update(
            this.loop,
            Math.sin(this.loop + 0.3454) * 0.45 + 0.1,
            Math.sin(this.loop * 0.71 + 0.1832) * 1.4 + 5.5,
            new Vector3(0, 0, 0)
        );
    }

    /**
     * Draws the current state of the game to a canvas.
     * @param dt Number of milliseconds elapsed since previous draw call.
     */
    Draw(dt: number) {
        for (var y = 0; y < this.canvas.Height(); y++) {
            for (var x = 0; x < this.canvas.Width(); x++) {
                var ray = this.camera.ConstructRay(x, y, this.canvas);

                this.canvas.SetPixel(x, y, new Vector3(0, 0, 0));

                var hit = this.box.RayIntersect(ray)
                if (hit != null) {
                    this.canvas.SetPixel(x, y, hit.normal.Scale(1 - hit.tmin / 12));
                }
            }
        }
    }
}
