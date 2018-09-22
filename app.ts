var game: Game;
var loop_time = 1000 / 5;
window.onload = () => {
    var canvas = new Canvas(document.body);
    canvas.Resize(window.innerWidth, window.innerHeight);

    game = new Game(canvas);
    loop();
};

window.onresize = () => {
    game.canvas.Resize(Math.min(screen.width, window.innerWidth), Math.min(screen.height, window.innerHeight));
}

function loop() {
    game.Update(loop_time);
    game.Draw(loop_time);
    game.canvas.SwapBuffer();

    window.setTimeout(loop, loop_time);
}
