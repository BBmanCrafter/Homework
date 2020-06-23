const canvas = document.getElementById('hra');
const cont = canvas.getContext('2d');
const th = 17;
const paddleH = th * 6;
const paddleY = canvas.height - th - paddleH;

var ballSpeed = 4;
var paddleSpeed = 5;

function loop() {
    requestAnimationFrame(loop);
    cont.clearRect(0, 0, canvas.width, canvas.height);

    cont.fillStyle = 'white';
    cont.fillRect(ball.x, ball.y, ball.width, ball.height);
    cont.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    cont.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    
    cont.fillStyle = 'grey';
    cont.fillRect(0, canvas.height - th, canvas.width, canvas.height);
    cont.fillRect(0, 0, canvas.width, th);

    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;
    
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (leftPaddle.y < th) {
        leftPaddle.y = th;
    }
    else if (leftPaddle.y > paddleY) {
        leftPaddle.y = paddleY;
    }

    if (rightPaddle.y < th) {
        rightPaddle.y = th;
    }
    else if (rightPaddle.y > paddleY) {
        rightPaddle.y = paddleY;
    }

    if (collides(ball, leftPaddle)) {
        ball.dx *= -1;

        ball.x = leftPaddle.x + leftPaddle.width;
    }else if (collides(ball, rightPaddle)) {
        ball.dx *= -1;

        ball.x = rightPaddle.x - ball.width;
    }

    if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
        ball.resetting = true;

        setTimeout(() => {
            ball.resetting = false;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
        }, 400);
    }

    if (ball.y < th) {
        ball.y = th;
        ball.dy *= -1;
    }else if (ball.y + th > canvas.height - th) {
        ball.y = canvas.height - th * 2;
        ball.dy *= -1;
    }

    for (let b = th; b < canvas.height - th; b += th * 2) {
        cont.fillRect(canvas.width / 2 - th / 2, b, th, th);
    }
}

function collides(object1, object2) {
    return object1.x + object1.width > object2.x && object1.x < object2.x + object2.width && object1.y + object1.height > object2.y && object1.y < object2.y + object2.height;
}

document.addEventListener('keyup', function (e) {
    if (e.which === 83 || e.which === 87) {
        leftPaddle.dy = 0;
    }

    if (e.which === 38 || e.which === 40) {
        rightPaddle.dy = 0;
    }
}
);

document.addEventListener('keydown', function (e) {

    if (e.which === 83) {
        leftPaddle.dy = paddleSpeed;
    }else if (e.which === 87) {
        leftPaddle.dy = -paddleSpeed;
    }

    if (e.which === 38) {
        rightPaddle.dy = -paddleSpeed;
    }else if (e.which === 40) {
        rightPaddle.dy = paddleSpeed;
    }
}
);

requestAnimationFrame(loop);