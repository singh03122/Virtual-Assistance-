//elements

const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");
const time = document.querySelector("#time")
const battery = document.querySelector("#battery")
const internet = document.querySelector("#internet")
const turn_on = document.querySelector("#turn_on")
const commandsContainer = document.querySelector(".commands");
const msgs = document.querySelector(".messages")

// create a new chat
function createMSg(who, msg) {
    let newmsg = document.createElement("p")
    newmsg.innerText = msg;
    newmsg.setAttribute("class", who)
    msgs.appendChild(newmsg)
    msgs.scrollTop = msgs.scrollHeight;

    console.log("New message created:", newmsg); // Check in the console
}

document.querySelector("#start_friday_btn").addEventListener("click", () => {
    Recognition.start()
})

commandsContainer.style.display = "none";

// friday commands
let fridayComs = [];
fridayComs.push("hi friday");
fridayComs.push("What are your commands");
fridayComs.push("close this - to close opened popups");
fridayComs.push(
    "change my information regarding your accounts and you"
);
fridayComs.push("whats the weather or temperature");
fridayComs.push("are you there - to check fridays presence");
fridayComs.push("shut down - stop voice recognition");
fridayComs.push("open google");
fridayComs.push('search for "your keywords"- to search on google');
fridayComs.push("open whatsapp");
fridayComs.push("open youtube");
fridayComs.push('play "your keybords"-to search on youtube');
fridayComs.push("close this youtube tab-to close opened youtube tab");
fridayComs.push("open twitter");
fridayComs.push("open my twitter profile");
fridayComs.push("open instagram");
fridayComs.push("open my instagram profile");
fridayComs.push("open github");
fridayComs.push("open my github profile");

let numberedCommands = fridayComs.map((command, index) => `${index + 1}. ${command}`);
let commandsHTML = numberedCommands.map(command => `<p>${command}</p>`).join("");
commandsContainer.innerHTML = commandsHTML;

// speech recognition setup
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const Recognition = new SpeechRecognition();

Recognition.continuous = true

// sr start
Recognition.onstart = function () {
    console.log("vr active");
};

//sr result
// arr of windows
let windowsB = [];


Recognition.onresult = function (event) {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    let userdata = localStorage.getItem("friday_setup")
    createMSg("usermsg", transcript)
    console.log('my words : ${transcript}');


    if (transcript.includes("hello friday")) {
        readout("hello sir");
    }
    if (transcript.includes("what are your commands")) {
        readout("sir, I folllow the following commands");
        document.querySelector(".commands").style.display = "block";
    } else {
        document.querySelector(".commands").style.display = "none";
    }

    if (transcript.includes("close this")) {
        readout("closed");
        document.querySelector(".commands").style.display = "none";
        setup.style.display = "none"
    }
    if (transcript.includes("close all tabs")) {
        readout("closing all tabs sir");
        windowsB.forEach((e) => {
            e.close()
        })

    }
    if (transcript.includes("open youtube")) {
        readout("opening youtube sir");
        let a = window.open("https://www.youtube.com/");
        windowsB.push(a)
    }
    if (transcript.includes("open google")) {
        readout("opening google sir");
        let a = window.open("https://www.google.com/");
        windowsB.push(a)
    }
    if (transcript.includes("open linkedin")) {
        readout("opening linkdin sir");
        window.open("https://www.linkedin.com/");
    }
    if (transcript.includes("open chrome")) {
        readout("opening chrome sir");
        window.open("https://www.chrome.com/");
    }
    if (transcript.includes("open instagram")) {
        readout("opening instagram sir");
        window.open("https://www.instagram.com/");
    }
    if (transcript.includes("open gmail")) {
        readout("opening gmail sir");
        window.open("https://www.gmail.com/");
    }
    if (transcript.includes("open whatsapp")) {
        readout("opening whatsapp sir");
        window.open("https://www.whatsapp.com/");
    }
    // google search
    if (transcript.includes("search for ")) {
        readout("Here's the result");
        let input = transcript.split("");
        input.splice(0, 11);
        input.pop();
        input = input.join("").split("").join("+");
        console.log(input);
        window.open(`https://www.google.com/search?q=${input}`);
    }
    // youtube search 
    if (transcript.includes("play ")) {
        readout("Here's the result");
        let input = transcript.split("");
        input.splice(0, 11);
        input.pop();
        input = input.join("").split(" ").join("+");
        console.log(input);
        window.open(`https://www.youtube.com/results?search_query=${input}`);
    }
    //github commands
    if (transcript.includes("open github")) {
        readout("opening github sir")
        window.open("https://github.com/")
    }

    if (transcript.includes("open my github profile")) {
        readout("opening your github profile sir")
        window.open('https://github.com/${JSON.parse(userdata).github}')

    };

    // console.log(transcript);
    // readout(transcript);
};
// sr stop
Recognition.onend = function () {

    console.log("vr deactive");
};
//sr continuous
//Recognition.continuous=true;

startBtn.addEventListener("click", () => {
    Recognition.start();
})

stopBtn.addEventListener("click", () => {
    Recognition.stop();
})

//friday speech
function readout(message) {


    const speech = new SpeechSynthesisUtterance();
    // different voices
    const allvoices = speechSynthesis.getVoices()
    speech.text = message;
    speech.voice = allvoices[165];
    speech.volume = 1
    window.speechSynthesis.speak(speech);
    console.log("speaking out");
    createMSg("jmsg", message)
}
// weather setup
function weather(location) {
    const weatherCont = document.querySelector(".temp").querySelectorAll("*");

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            weatherCont[0].textContent = `Location : ${data.name}`;
            weatherCont[1].textContent = `Country : ${data.sys.country}`;
            weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
            weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
            weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherCont[5].textContent = `Original Temperature : ${ktc(
                data.main.temp
            )}`;
            weatherCont[6].textContent = ` feels like ${ktc(data.main.feels_like)}`;
            weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
            weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
            let weatherStatement = `Sir, the weather in ${data.name} is ${data.weather[0].description} and the temperature feels like ${ktc(data.main.feels_like)}`;
        } else {
            weatherCont[0].textContent = "Weather Info Not found";
        }
    };
    xhr.send();
}

//convert kelvin to celcius 
function ktc(k) {
    k = k - 273.15;
    return k.toFixed(2);
}


// time setup
let date = new Date();
let hrs = date.getHours();
let mins = date.getMinutes();
let secs = date.getSeconds();

// autofriday

function autofriday() {
    setTimeout(() => {
        Recognition.start()
    }, 1000);
}

// onload (window)
window.onload = () => {
    // onstartup
    turn_on.play();
    turn_on.addEventListener("onend", () => {
        setTimeout(() => {
            autofriday();
            readout("Ready To Go sir");
            if (localStorage.getItem("friday_setup") === null) {
                readout("Sir, kindly Fill Out the form");
            }
        }, 200);
    });
}

    // friday commands adding
    fridayComs.forEach((e) => {
        document.querySelector(".commands").innerHTML += `<p>#${e}</p><br/>`;
    });

    // time - clock
//     time.textContent = `${hrs}:${mins}:${secs}`;
//     setInterval(() => {
//         let date = new Date();
//         let hrs = date.getHours();
//         let mins = date.getMinutes();
//         let secs = date.getSeconds();
//         time.textContent = `${hrs}:${mins}:${secs}`;
//     }, 1000);
// };
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    currentTime = strTime
    time.textContent = strTime
  }
  
  formatAMPM(date)
  setInterval(() => {
    formatAMPM(date)
  }, 60000);

//battery setup
let batteryPromise = navigator.getBattery()
batteryPromise.then(batteryCallback)

function batteryCallback(batteryObject) {
    printBatteryStatus(batteryObject)
    setInterval(() => {
        printBatteryStatus(batteryObject)
        // for internet
        navigator.onLine ? (internet.textContent = "online") : (internet.textContent = "offline")
    }, 5000);
}

function printBatteryStatus(batteryObject) {
    battery.textContent = `${Math.floor(batteryObject.level * 100)}%`;
    if (batteryObject.charging) {
        document.querySelector(".battery").style.width = "200px";
        battery.textContent = `${Math.floor(batteryObject.level * 100)}% Charging`;
    } else {
        document.querySelector(".battery").style.width = `${Math.floor(batteryObject.level * 100)}%`;
    }
}

// internet setup

navigator.onLine ? (internet.textContent = "online") : (internet.textContent = "offline")







// friday setup
if (localStorage.getItem("friday_setup") !== null) {
    weather(JSON.parse(localStorage.getItem("friday_setup")).location)
}
// friday information setup
const setup = document.querySelector(".friday_setup");
setup.style.display = "none";

if (localStorage.getItem("friday_setup") === null) {
    setup.style.display = "block"
    setup.querySelector("button").addEventListener("click", userInfo)
}

// userinfo function
function userInfo() {
    let setupInfo = {
        name: setup.querySelectorAll("input")[0].value,
        bio: setup.querySelectorAll("input")[1].value,
        location: setup.querySelectorAll("input")[2].value,
        instagram: setup.querySelectorAll("input")[3].value,
        github: setup.querySelectorAll("input")[4].value,
        twitter: setup.querySelectorAll("input")[5].value,
    }


    let testArr = []

    setup.querySelectorAll("input").forEach((e) => {
        testArr.push(e.value)
    })
    if (testArr.includes("")) {
        readout("sir enter your complete information")
    } else {
        localStorage.clear()
        localStorage.setItem("friday_setup", JSON.stringify(setupInfo))
        setup.style.display = "none"
        weather(JSON.parse(localStorage.getItem("friday_setup")).location)
    }
}


//calling the weather function
//weather("delhi")

speakBtn.addEventListener("click", () => {
    readout("Hi, Rohit");

});

window.onload = function () {
    readout("  ");
}