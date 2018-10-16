function togglePlay (e) {
    console.log('play vid');
    if (viewer.paused) {
        viewer.play();
        return;
    }
    viewer.pause();
}

function toggleButton (e) {
    if (this.paused) {
        playButton.innerHTML = '►';
    } else {
        playButton.innerHTML = '❚ ❚';
    }
}

function skip (e) {
    console.log('skip', viewer.currentTime);
    viewer.currentTime += parseFloat(this.dataset.skip);
    e.stopPropagation();
}

function handleRange() {
    viewer[this.name] = this.value;
}

function handleProgress(e) {
    const percent = viewer.currentTime / viewer.duration * 100;
    progressBar.style.flexBasis = percent + '%';
}

function scrub(e) {
    const scrubTime = e.offsetX / progress.offsetWidth * viewer.duration;
    viewer.currentTime = scrubTime;
}

const player = document.querySelector('.player');
const viewer = player.querySelector('.player .viewer');
const playButton = player.querySelector('.player .toggle');
const skipButtons = player.querySelectorAll('button[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

viewer.addEventListener('click', togglePlay);
viewer.addEventListener('play', toggleButton);
viewer.addEventListener('pause', toggleButton);
viewer.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(btn => {
    btn.addEventListener('click', skip);
});
ranges.forEach(range => {
    range.addEventListener('change', handleRange);
});
progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
