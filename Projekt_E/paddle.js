const leftPaddle = {
    x: th * 2,
    y: canvas.height / 2 - paddleH / 2,

    dy: 0,

    width: th,
    height: paddleH
};

const rightPaddle = {
    x: canvas.width - th * 3,
    y: canvas.height / 2 - paddleH / 2,

    dy: 0,

    width: th,
    height: paddleH
};