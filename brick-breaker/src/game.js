import Paddle from "/brick-breaker/src/paddle.js";
import Ball from "/brick-breaker/src/ball.js";
import Brick from "/brick-breaker/src/brick.js";
import { buildLevel, level1, level2, level3 } from "/brick-breaker/src/levels.js";
import InputHandler from "/brick-breaker/src/input.js";

const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
};

export default class Game {
    constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        new InputHandler(this.paddle, this);
        this.levels = [level1, level2, level3];
        this.currentLevel = 0;
        this.gameState = GAME_STATE.MENU;
    }

    start() {
        if(this.gameState !== GAME_STATE.MENU && this.gameState !== GAME_STATE.NEWLEVEL) return;
        this.gameState = GAME_STATE.RUNNING;
        this.lives = 3;
        this.ball.reset();
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.gameObjects = [this.ball, this.paddle];
    }

    update(dt) {
        if(this.lives === 0)
            this.gameState = GAME_STATE.GAMEOVER;
        if(this.gameState === GAME_STATE.PAUSED || this.gameState === GAME_STATE.MENU || this.gameState === GAME_STATE.GAMEOVER) return;

        [...this.gameObjects, ...this.bricks].forEach(object => object.update(dt));

        this.bricks = this.bricks.filter(brick=>!brick.destroy);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        if(this.gameState !== GAME_STATE.MENU && this.gameState !== GAME_STATE.GAMEOVER)
            [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

        if(this.bricks && !this.bricks.length) {
            ++this.currentLevel;
            this.gameState = GAME_STATE.NEWLEVEL;
            this.start();
        }
        if(this.gameState === GAME_STATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();
            ctx.font = "30px Times New Roman";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        else if(this.gameState === GAME_STATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();
            ctx.font = "30px Times New Roman";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to start", this.gameWidth / 2, this.gameHeight / 2);
        }
        else if(this.gameState === GAME_STATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();
            ctx.font = "30px Times New Roman";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAMEOVER", this.gameWidth / 2, this.gameHeight / 2);
        }     
    }

    togglePause() {
        if(this.gameState === GAME_STATE.PAUSED) {
            this.gameState = GAME_STATE.RUNNING;
        }
        else {
            this.gameState = GAME_STATE.PAUSED;
        }
    }
}