let time1 = Date.now();

import para from "./data.js";

let paragraph = document.getElementById("paragraph");
//generate paragraph randomly
paragraph.innerText = para[Math.floor(Math.random() * para.length)];
//
let start = document.getElementById("start");
let skip = document.getElementById("skip");
let txtarea = document.getElementById("txtarea");
let time = document.getElementById("time");
let mode = document.getElementById("mode");
let wcount = document.getElementById("wcount");
let wpm = document.getElementById("wpm");
let count = 0;
let status = false; //Timer is or is not
let darkMode = false; //Dark mode is or is not
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
        txtarea.style.backgroundColor = "white";
    }
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

start.onclick = function() {
    alert("Reset Success!");
    reset();
}

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

            if (highlightAlp[i].classList.contains("wrong")) {
                highlightAlp[i].classList.remove("wrong");
            }

            highlightAlp[i].classList.add("light");
        } else {
            highlightAlp[i].classList.add("wrong");
        }
    })
};

function stopTimer() {
    window.clearInterval(clearTimer);
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

txtarea.onclick = function() {
    txtarea.style.transition = "all 0.3s ease";
    if (!status) {
        clearTimer = triggerTimer();
        status = true;
    }

}


let time2 = Date.now();
console.log(time2 - time1, para.length);