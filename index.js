function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function playSound(audio) {
    if(audio.ended) audio.currentTime = 0;
    audio.play();
}

function loadImage(uri) {
    const image = new Image();
    image.src = uri;
    return image;
}

const imageUp = loadImage('res/up.png');
const imageDown = loadImage('res/down.png');

const soundPoke = new Audio('res/poke.mp3');
const soundReactions = [...Array(2).keys()].map(i => new Audio(`res/react-${i}.mp3`));

let counterText = document.getElementById('counter');

let counter = 0;
let lastReaction = null;

function toggle(state) {
    const element = document.getElementById('kesshouban');
    element.src = state ? imageDown.src : imageUp.src;
}

function pok(e) {
    toggle(true);

    counterText.innerText = `${++counter}`;

    playSound(soundPoke);

    if(!(counter % 3)) {
        if(!lastReaction || lastReaction.ended) {
            lastReaction = soundReactions[randomInt(0, soundReactions.length - 1)];
            playSound(lastReaction);
        }
    }

    counterText.style.animation = 'none';
    counterText.offsetHeight;
    counterText.style.animation = 'shrink 0.5s';
}

function releas(e) {
    toggle(false);
}

window.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); return false; });
window.addEventListener('load', e => {
    releas(e);

    document.addEventListener('mousedown', e => { if(e.button === 0) pok(e); });
    document.addEventListener('mouseup', e => { if(e.button === 0) releas(e); });
    document.addEventListener('touchstart', e => { pok(e); e.preventDefault(); });
    document.addEventListener('touchmove', e => { e.preventDefault(); });
    document.addEventListener('touchend', e => { releas(e); });
    document.addEventListener('touchcancel', e => { releas(e); });
});
