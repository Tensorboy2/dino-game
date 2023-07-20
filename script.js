const dino = document.getElementById('dino');
let isJumping = false;
let gravity = 0.9;
let position = 0;

function jump() {
    if (isJumping) return;
    isJumping = true;
    let count = 0;
    const jumpInterval = setInterval(() => {
        const jumpHeight = 150;
        if (count === jumpHeight) {
            clearInterval(jumpInterval);
            let downInterval = setInterval(() => {
                if (count === 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                count--;
                position = Math.max(position, 0);
                dino.style.bottom = position + 'px';
            }, 20);
        }
        position += 5;
        count++;
        position = Math.min(position, jumpHeight);
        dino.style.bottom = position + 'px';
    }, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});
