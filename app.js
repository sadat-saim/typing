import para from "./data.js";

let paragraph = document.getElementById("paragraph");
let start = document.getElementById("start");
let skip = document.getElementById("skip");
let txtarea = document.getElementById("txtarea");
let time = document.getElementById("time");
let mode = document.getElementById("mode");
let wcount = document.getElementById("wcount");
let count = 0;
let status = false;
let darkMode = false;
let clearTimer;

console.log(para);

txtarea.style.color = "black";

mode.onclick = function() {
    let bodyStyle = document.body.style;
    bodyStyle.transition = 'all 0.3s ease';
    if (!darkMode) {
        bodyStyle.backgroundColor = "#161616";
        bodyStyle.color = "#fff";
        darkMode = true;
        mode.innerText = "☀️";
    } else {
        bodyStyle.backgroundColor = "#fff";
        bodyStyle.color = "#161616";
        darkMode = false;
        mode.innerText = "🌒";
    }
}

start.onclick = function() {
    alert("hello world")
}

skip.onclick = function() {
    paragraph.innerText = para[Math.floor(Math.random() * 4)];
    count = 0;
    txtarea.value = "";
    stopTimer();
    time.innerText = "Time: 00s";
    status = false;
    wcount.innerText = "Alphabet Count: 00";
    txtarea.disabled = false;
}

txtarea.oninput = function() {
    txtarea.style.height = ""; /* Reset the height*/
    txtarea.style.height = txtarea.scrollHeight + "px";
    let wordLength = this.value.length;
    wcount.innerText = `Alphabet Count: ${wordLength}`;
    if (paragraph.innerText.length < wordLength) {
        stopTimer();
        this.disabled = true;
        let wpm = Math.round(wordLength / (count / 60));
        alert(`Your typing speed is ${wpm} alphabet per minute`);
    }
    // let testAplhabets = paragraph.innerText.split("");
    // let mappedAlphabet = testAplhabets.map((alp, i) => {
    //     if (txtarea.value[i] === alp) {
    //         return `<span id="highlight">${alp}</span>`;
    //     } else { return alp }
    // });
    // paragraph.innerText = mappedAlphabet.join("");
    //console.log(mappedAlphabet);
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