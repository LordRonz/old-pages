export function detectCollision(ball, gameObject) {
    let top = ball.position.y;
    let bot = top + ball.size;
    let objectTop = gameObject.position.y;
    let objectBottom = objectTop + gameObject.height;
    let tipLeft = ball.position.x;
    let tipRight = ball.position.x + ball.size;
    let tipLeftObject = gameObject.position.x;
    let tipRightObject = tipLeftObject + gameObject.width;
    
    return bot >= objectTop && top <= objectBottom && (tipLeft >= tipLeftObject && tipRight <= tipRightObject);
}