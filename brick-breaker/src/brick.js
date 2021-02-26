import { detectCollision } from "./collisionDetection.js";

export default class Brick {
    constructor(that, position) {
        this.brick = document.getElementById("brick");
        this.gameWidth = that.gameWidth;
		this.gameHeight = that.gameHeight;
        this.position = position;
        this.width = 80;
        this.height = 24;
        this.game = that;
        this.destroy = false;
    }

    update(dt) {
        if(detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y *= -1;
            this.destroy = true;
        }
    }

    draw(ctx) { 
        ctx.drawImage(this.brick, this.position.x, this.position.y, this.width, this.height);
    }
}