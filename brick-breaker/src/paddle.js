export default class Paddle {
    constructor(that) {
		this.gameWidth = that.gameWidth;
		this.gameHeight = that.gameHeight;
		this.width = 169;
		this.height = 30;

		this.maxSpeed = 100;
		this.speed = 0;

		this.position = {
			x: this.gameWidth / 2 - this.width / 2,
			y: this.gameHeight - this.height - 10
		};
    }

	brake() {
		this.speed = 0;
	}

	moveLeft() {
		this.speed = -this.maxSpeed; 
	}

	moveRight() {
		this.speed = this.maxSpeed; 
	}

	update(dt) {
		if(!dt) return;
		this.position.x += this.speed / dt;
		if(this.position.x <= 0) this.position.x = 0;
		if(this.position.x + this.width >= this.gameWidth) this.position.x = this.gameWidth -this.width;
	}

    draw(ctx) {
		if(!ctx) return;
		ctx.fillStyle = "Magenta";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
