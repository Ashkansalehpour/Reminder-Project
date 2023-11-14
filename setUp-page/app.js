const description = document.querySelector("#Description-alarm .title-input");
const textarea = document.querySelector("#Description-alarm textarea");
document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".title");
  const perv = document.querySelector(".perv");
  const playPause = document.querySelector(".playPause");
  const next = document.querySelector(".next");
  const audio = document.querySelector(".audio");
  const body = document.querySelector("body");

  // song list
  const songList = [
    {
      path: "", // masire Audio
      songName: "", //Esm Alarm
    },
    {
      path: "", // masire Audio
      songName: "", //Esm Alarm
    },
    {
      path: "", // masire Audio
      songName: "", //Esm Alarm
    },
  ];

  let song_Playing = false;

  // plays song
  function playSong() {
    song_Playing = true;
    audio.play();
    playPause.classList.add("active");
    // change icon
    playPause.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
  }

  // pause song
  function pauseSong() {
    song_Playing = false;
    audio.pause();
    playPause.classList.remove("active");
    // change icon
    playPause.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
  }

  // play or pause song on click
  playPause.addEventListener("click", () =>
    song_Playing ? pauseSong() : playSong()
  );

  // load song
  function loadSong(song) {
    // title.textContent = song.songName;
    audio.src = song.path;
  }

  // current song
  let i = 0;
  // on load - select the first song from the song list
  loadSong(songList[i]);

  // previous song
  function prevSong() {
    i--;
    if (i < 0) {
      i = songList.length - 1;
    }
    loadSong(songList[i]);
    playSong();
  }

  perv.addEventListener("click", prevSong);

  // next song
  function nextSong() {
    i++;
    if (i > songList.length - 1) {
      i = 0;
    }
    loadSong(songList[i]);
    playSong();
  }

  next.addEventListener("click", nextSong);
  const rimTimes = JSON.parse(localStorage.getItem('rimTimes'));

  /*



  */
  // Update spans with retrieved values
  // gereftan az HTML
  const daySpan = document.querySelector('.days');
  const hoursSpan = document.querySelector('.hours');
  const minutesSpan = document.querySelector('.minutes');


  if (rimTimes) {
    daySpan.textContent = rimTimes.remainingDay ;
    hoursSpan.textContent = rimTimes.remainingHoure;
    minutesSpan.textContent = rimTimes.remainingMinute;
  }


});

function addToLS(descTitle, text) {
  descTitle = descTitle;
  text = text;

  let localStorage = {
    text: textarea.value,
    title: description.value,
  };
  window.localStorage.setItem("localStorage", JSON.stringify(localStorage));
  let newObject = window.localStorage.getItem("localStorage");
  let json = JSON.parse(newObject);
}
addToLS(description, textarea);

// timer js
let animationFrameId;
let totalMilliseconds;
let elapsedTime = 0;
function startTimer() {
  const secondsInput = parseInt(document.getElementById("seconds").value) || 0;
  const minutesInput = parseInt(document.getElementById("minutes").value) || 0;
  const hoursInput = parseInt(document.getElementById("hours").value) || 0;
  const timerPercentage = document.querySelector(".timer-percentage");

  totalMilliseconds =
    (hoursInput * 3600 + minutesInput * 60 + secondsInput) * 1000;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  elapsedTime = 0;
  timerPercentage.textContent = "0%";
  timerPercentage.style.color = "white";
  applyStylesAndAnimations(hoursInput, minutesInput, secondsInput);
  updateClock(totalMilliseconds, timerPercentage);
}

function applyStylesAndAnimations(hoursInput, minutesInput, secondsInput) {
  // Calculate the animation duration for each ring and dot
  const circles = document.querySelectorAll(".circle");
  const secCircle = circles[0];
  const minCircle = circles[1];
  const hrCircle = circles[2];

  // Calculate the total time in seconds
  const totalSeconds = hoursInput * 3600 + minutesInput * 60 + secondsInput;

  // Calculate the animation durations for dots
  const secAnimDuration = totalSeconds * 1000;
  const minAnimDuration = totalSeconds * 1000;
  const hrAnimDuration = totalSeconds * 1000;

  // Set custom properties for animation durations
  secCircle.style.setProperty("--sec-anim-duration", `${secAnimDuration}ms`);
  minCircle.style.setProperty("--min-anim-duration", `${minAnimDuration}ms`);
  hrCircle.style.setProperty("--hr-anim-duration", `${hrAnimDuration}ms`);

  // Apply styles and animations to each circle
  secCircle.querySelector("circle").style.strokeDasharray = "780";
  secCircle.querySelector("circle").style.strokeDashoffset = "710";
  secCircle.querySelector(
    "circle"
  ).style.animation = `rotateCounterClockwise ${secAnimDuration}ms linear infinite`;

  minCircle.querySelector("circle").style.strokeDasharray = "760";
  minCircle.querySelector("circle").style.strokeDashoffset = "0";
  minCircle.querySelector(
    "circle"
  ).style.animation = `rotateCounterClockwise ${minAnimDuration}ms linear infinite`;

  hrCircle.querySelector("circle").style.strokeDasharray = "43200"; // 12 hours (360 degrees)
  hrCircle.querySelector("circle").style.strokeDashoffset = "0"; // Start with a full circle
  hrCircle.querySelector(
    "circle"
  ).style.animation = `rotateCounterClockwise ${hrAnimDuration}ms linear infinite`;
}

function updateClock(totalMilliseconds, timerPercentage) {
  const currentTime = performance.now();
  elapsedTime = currentTime;

  if (elapsedTime >= totalMilliseconds) {
    // Timer is up
    timerPercentage.textContent = "100%";

    // Stop the animations and set the circles to completed state
    const circles = document.querySelectorAll(".circle");
    for (const circle of circles) {
      circle.querySelector("circle").style.animation = "none";
      circle.querySelector("circle").style.strokeDashoffset = "0";
    }

    return;
  }

  // Calculate and display the percentage
  const percentage = (elapsedTime / totalMilliseconds) * 100;
  timerPercentage.textContent = percentage.toFixed(2) + "%";

  applyStylesAndAnimations();

  animationFrameId = requestAnimationFrame(() =>
    updateClock(totalMilliseconds, timerPercentage)
  );
}

// Start the timer initially
startTimer();