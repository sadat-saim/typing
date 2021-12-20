let time1 = Date.now();

import para from "./data.js";

let paragraph = document.getElementById("paragraph");
//generate paragraph randomly
paragraph.innerText = para[Math.floor(Math.random() * para.length)];
//dom variables
let start = document.getElementById("start");
let skip = document.getElementById("skip");
let txtarea = document.getElementById("txtarea");
let time = document.getElementById("time");
let mode = document.getElementById("mode");
let wcount = document.getElementById("wcount");
let wpm = document.getElementById("wpm");
let logo = document.getElementById("logo");
let btn = document.querySelector(".button-primary");
let body = document.querySelector("body");
let stroke = document.querySelector(".audio");
//theme variables
let orange = document.querySelector(".color1");
let purple = document.querySelector(".color2");
let green = document.querySelector(".color3");
let blue = document.querySelector(".color4");
let right = "light";
let wrong = "wrong";
//helper variables
let count = 0;
let status = false; //Timer is on or off
let darkMode = false; //Dark mode is on or off
let muted = false; //audio is on
let clearTimer;
let paraLength = paragraph.innerText.length;
let highlight = paragraph.innerText.split("").map(alp => {
    return `<span class="highlight">${alp}</span>`
});

paragraph.innerHTML = highlight.join("");
//should maintatin this serial
let highlightAlp = document.querySelectorAll(".highlight");

console.log(highlight);
console.log(highlightAlp);

//dom events

//mode switch
mode.onclick = function() {
    let bodyStyle = document.body.style;
    bodyStyle.transition = 'all 0.3s ease';
    if (!darkMode) {
        bodyStyle.backgroundColor = "#161616";
        bodyStyle.color = "#fff";
        darkMode = true;
        mode.innerText = "☀️";
        txtarea.style.backgroundColor = "#161616";
    } else {
        bodyStyle.backgroundColor = "#fff";
        bodyStyle.color = "#161616";
        darkMode = false;
        mode.innerText = "🌒";
        txtarea.style.backgroundColor = "#fff";
    }
}

//theme switch
orange.onclick = function() {
    themeSwitch("orange", "#FF6723");
}

purple.onclick = function() {
    themeSwitch("purple", "#8D65C5");
}

green.onclick = function() {
    themeSwitch("green", "#00D26A");
}

blue.onclick = function() {
    themeSwitch("light", "rgb(25, 221, 247)")
}


//reset button event
start.onclick = function() {
        alert("Reset Success!");
        reset();
    }
    //skip
skip.onclick = function() {
    paragraph.innerText = para[Math.floor(Math.random() * para.length)];
    reset();
}

txtarea.oninput = function() {
    txtarea.style.height = ""; /* Reset the height*/
    txtarea.style.height = txtarea.scrollHeight + "px";
    let wordLength = this.value.length;
    wcount.innerText = `Alphabet Count: ${wordLength}`;
    if (paraLength <= wordLength) {
        stopTimer();
        this.disabled = true;
        let wpm = Math.round(wordLength / (count / 60));
        alert(`Your typing speed is ${wpm} alphabet per minute`);
    }

    let userInput = this.value.split('');
    wpm.innerText = `${Math.trunc(txtarea.value.split(" ").length)/(count/60)}`.split(".")[0] + " wpm"
    userInput.forEach((val, i) => {
        if (val === highlightAlp[i].innerText) {

            if (highlightAlp[i].classList.contains(wrong)) {
                highlightAlp[i].classList.remove(wrong);
            }

            highlightAlp[i].classList.add(right);
        } else {
            highlightAlp[i].classList.add(wrong);
        }
    })
};

txtarea.onclick = function() {
    if (!status) {
        clearTimer = triggerTimer();
        status = true;
    }
}

//preventing pasting on txtarea
txtarea.onpaste = (e) => e.preventDefault();

stroke.onclick = function() {
    if (!muted) {
        muted = true;
        stroke.innerText = "🔇";
    } else {
        muted = false;
        stroke.innerText = "🔊";
    }
}

body.onkeyup = function() {
    if (status && !muted) {
        let audio = new Audio('./stroke.mp3');
        audio.playbackRate = 3; //
        audio.play();
    }
}

//helper functions

function themeSwitch(color, colorCode) {
    right = color;
    logo.className = "";
    if (!logo.classList.contains(color)) {
        logo.classList.add(color);
    }
    btn.style.backgroundColor = colorCode;
}


function reset() {
    paraLength = paragraph.innerText.length;
    count = 0;
    txtarea.value = "";
    txtarea.style.height = "";
    stopTimer();
    time.innerText = "Time: 00s";
    status = false;
    wcount.innerText = "Alphabet Count: 00";
    txtarea.disabled = false;
    highlight = paragraph.innerText.split("").map(alp => {
        return `<span class="highlight">${alp}</span>`
    });
    paragraph.innerHTML = highlight.join("");
    highlightAlp = document.querySelectorAll(".highlight");
    wpm.innerHTML = "00 wpm";
}


function triggerTimer() {
    return setInterval(() => {
        count++;
        if (count < 10) {
            time.innerText = `Time: 0${count}s`
        } else {
            time.innerText = `Time: ${count}s`
        }
    }, 1000);
}


function stopTimer() {
    window.clearInterval(clearTimer);
}

let time2 = Date.now();
console.log(time2 - time1, para.length);