﻿class CanvasHTML5 implements ICanvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    pixels: ImageData

    dim_width: number;
    dim_height: number;
    dim_ar: number;

    constructor(element: HTMLElement) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        element.appendChild(this.canvas);
    }

    public Width(): number {
        return this.dim_width;
    }

    public Height(): number {
        return this.dim_height;
    }

    public AspectRatio(): number {
        return this.dim_ar;
    }

    public Resize(width: number, height: number): void {
        this.dim_width = Math.min(480, width);
        this.dim_height = Math.min(360, height);

        this.dim_ar = this.dim_width / this.dim_height;

        this.canvas.width = this.dim_width;
        this.canvas.height = this.dim_height;

        this.pixels = new ImageData(this.dim_width, this.dim_height);
    }

    public SetPixel(x: number, y: number, color: Vector3) {
        var pos = (x + y * this.dim_width) << 2;

        this.pixels.data[pos + 0] = Math.floor(color.x * 255);
        this.pixels.data[pos + 1] = Math.floor(color.y * 255);
        this.pixels.data[pos + 2] = Math.floor(color.z * 255);
        this.pixels.data[pos + 3] = 255;
    }

    public SwapBuffer(): void {
        this.context.putImageData(this.pixels, 0, 0);
    }
}

class Canvas implements ICanvas {
    element: HTMLElement;
    pixels: string[]

    dim_width: number;
    dim_height: number;
    dim_ar: number;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    /** Returns the width of the canvas. */
    public Width(): number {
        return this.dim_width;
    }

    /** Returns the height of the canvas. */
    public Height(): number {
        return this.dim_height;
    }

    /** Returns the aspect ratio of the canvas. The aspect ratio is the width devided by the height. */
    public AspectRatio(): number {
        return this.dim_ar;
    }

    /**
     * Instructs the canvas to resize to the given dimensions.
     * @param width The new width of the canvas.
     * @param height The new height of the canvas.
     */
    public Resize(width: number, height: number): void {
        this.element.innerHTML = "<span>&nbsp;</span>"
        var rect = this.element.getElementsByTagName("span")[0].getBoundingClientRect();

        this.dim_width = Math.floor(width / rect.width);
        this.dim_height = Math.floor(height / rect.height);
        this.dim_ar = (this.dim_width * rect.width) / (this.dim_height * rect.height);

        this.pixels = Array(this.dim_width * this.dim_height);
        
        var c = this.dim_width * this.dim_height;
        for (var i = 0; i < c; i++) {
            this.pixels[i] = "<span>&nbsp;</span>";
        }

        this.SwapBuffer();
    }

    /**
     * Changes a pixel in the canvas to a given color. The origin (0, 0) is top left.
     * @param x The x coordinate of the pixel.
     * @param y The y coordinate of the pixel.
     * @param color The new color of the pixel. Values are in range [0, 1].
     */
    public SetPixel(x: number, y: number, color: Vector3): void {

        var b = Math.floor(Math.max(color.x, color.y, color.z) * 8); // brightness
        var c = color.Scale(255).Floor();                            // color

        this.pixels[x + y * this.dim_width] =
            "<span style='color:rgb(" + c.x + "," + c.y + "," + c.z + ")'>" +
            (b > 0 ? "'^*o0$#@"[b - 1] : "&nbsp;") +
            "</span>";
    }

    /** Pushes a new frame to the screen. */
    public SwapBuffer() {
        var html = "";
        var idx = 0;
        for (var y = 0; y < this.dim_height; y++) {
            for (var x = 0; x < this.dim_width; x++) {
                html += this.pixels[idx++];
            }
            html += "</br>"
        }

        this.element.innerHTML = html;
    }
}