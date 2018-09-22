interface ICanvas {
    Width(): number;
    Height(): number;
    AspectRatio(): number;
    Resize(width: number, height: number);
    SetPixel(x: number, y: number, color: Vector3): void;
    SwapBuffer(): void;
}
