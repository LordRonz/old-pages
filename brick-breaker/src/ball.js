import { detectCollision } from "./collisionDetection.js";

export default class Ball {
    constructor(game) {
        this.ball = document.getElementById("ball");
        this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
        this.reset();
        this.size = (this.gameWidth + this.gameHeight) / 85;
        this.game = game;
    }

    reset() {
        this.speed = {
            x: 5, y: -3
        };
        this.position = {
            x: 10, y: 400
        };
    }

    update(dt) {
        if(this.position.x >= this.gameWidth - this.size || this.position.x <= 0) this.speed.x *= -1;
        if(this.position.y <= 0) this.speed.y *= -1;

        if(this.position.y >= this.gameHeight - this.size) {
            --this.game.lives;
            this.reset();
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        
        if(detectCollision(this, this.game.paddle)) {
            this.speed.y *= -1;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.ball, this.position.x, this.position.y, this.size, this.size);
    }
}