const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container .pc-back");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}0`;



sounds.forEach(sound => { 
    sound.onclick = function () {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlaying(song);
    };
});


play.onclick = function () {
    checkPlaying(song);
};

replay.onclick = function () {
    restartSong(song);

};


const restartSong = song => {
    let currentTime = song.currentTime;
    song.currentTime = 0;
}

timeSelect.forEach(option => {
    option.addEventListener("click", function () {
        fakeDuration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}0`;
    });
});

const checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svgs/pause.svg";
    } else {
        song.pause();
        video.pause();
        play.src = "./svgs/play.svg";
    }
};


song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = "./svgs/play.svg";
        video.pause();
        phoneVideo.pause();
    }
};



//Segunda parte
const circle = document.querySelector('.circle-container');
const text = document.querySelector('#text');
const breather = document.querySelector(".breathe-container")
const changeBknd = document.querySelector(".change-background")

changeBknd.onclick = function (){
    breather.classList.toggle("city")
}


const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
    text.innerText = 'Breathe In!';
    circle.className = 'container grow';

    setTimeout(() => {
        text.innerText = 'Hold';

        setTimeout(() => {
            text.innerText = 'Breathe Out!';
            circle.className = 'container shrink';
        }, holdTime);
    }, breatheTime);
}

setInterval(breathAnimation, totalTime);