// select calender
const calendar = document.querySelector(".calendar"),
  // select date
  date = document.querySelector(".date"),
  // select days
  daysContainer = document.querySelector(".days"),
  // select prev and next icon
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  // select today btn and goto btn
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  // select date input
  dateInput = document.querySelector(".date-input");

// make today to nowDay
let today = new Date();
// create active day
let activeDay;
// create month by selecting
let month = today.getMonth();
// create year by selecting
let year = today.getFullYear();

// add name months of year to array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Call initCalendar to display the current month when the page is loaded
initCalendar();

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  // make first day of calendar
  const firstDay = new Date(year, month, 1);
  // make last day of calendar
  const lastDay = new Date(year, month + 1, 0);
  // make prev day and last date of calendar
  const prevDays = firstDay.getDay();
  const lastDate = lastDay.getDate();
  let days = "";
  // The loop will iterate till 'prevDays' counter.
  for (let i = 0; i < prevDays; i++) {
    days += `<div class="day prev-date"></div>`;
  }
  // The 'for' loop is iterating through each day of the month.
  for (let i = 1; i <= lastDate; i++) {
    // If the iterated day (i), year, and month are equal to today's date, we are looking at the 'today' date on the calendar.
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      // Set 'activeDay' as 'i' (the current date)
      activeDay = i;
      // If there's an event on today's date, append a 'div' for the date with 'today', 'active', and 'event' classes, else mark it as 'today' and 'active' only.
      if (event) {
        days += `<div class="day today active event" date-value="${i}">${i}</div>`;
      } else {
        days += `<div class="day today active" date-value="${i}">${i}</div>`;
      }
    } else {
      // For all other dates, if an event exists, append a 'div' for the date with an 'event' class, else append a 'div' only with 'day' class.
      if (event) {
        days += `<div class="day event" date-value="${i}">${i}</div>`;
      } else {
        days += `<div class="day" date-value="${i}">${i}</div>`;
      }
    }
  }
  // At the end, 'days' string contains markup for each day of the month with appropriate classes.
  daysContainer.innerHTML = days;
  // Update the content of the .date div with the current month and year
  const dateDiv = document.querySelector(".date");
  dateDiv.innerHTML = `${months[month]} ${year}`;

  addListener();
}

// rest of your code...

//function to add month and year on prev and next button
// The function 'prevMonth' is handling the transition to the previous month.
function prevMonth() {
  // The current month is decreased by one
  month--;
  // If the current month is below 0 (below January), it means we need to switch to the previous year
  if (month < 0) {
    // We switch to December (month 11)
    month = 11;
    // And decrease the year by one
    year--;
  }
  // After changing the month and possibly the year, we initialize the calendar to reflect these changes
  initCalendar();
}
// The function 'nextMonth' is handling the transition to the next month.
function nextMonth() {
  // The current month is increased by one
  month++;
  // If the current month is above 11 (December), it means we need to switch to the next year
  if (month > 11) {
    // We switch to January (month 0)
    month = 0;
    // And increase the year by one
    year++;
  }
  // After changing the month and possibly the year, we initialize the calendar to reflect these changes
  initCalendar();
}
// After changing the month and possibly the year, we initialize the calendar to reflect these changes
//function to add active on day
// The 'addListener' function is used to add event listeners to the DOM elements with the class '.day'
function addListener() {
  // Selecting all the days using querySelectorAll method
  const days = document.querySelectorAll(".day");
  // Using forEach loop to add event listener to each day
  days.forEach((day) => {
    // Adding 'click' event listener to each day
    day.addEventListener("click", (e) => {
      // Creating a date object 'selectedDate' for the day user clicked
      const selectedDate = new Date(year, month, Number(e.target.innerHTML));
      // Creating a date object 'currentDate' for the current day
      const currentDate = new Date();
      const clickedMonth = month;
      // Assign the selectedDate to 'getDate' variable for later use
      getDate = selectedDate;
      // Check if the selectedDate is in future
      if (selectedDate > currentDate) {
        // If it's in future, calculate the remaining days and assign it to 'remainingDay'
        const daysRemaining = Math.ceil(
          (selectedDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        remainingDay = daysRemaining;
      } else if (selectedDate.toDateString() === currentDate.toDateString()) {
        // Check if the selected day is the current day
        // If so, calculate the remaining hours and minutes and print them
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59); // Set it to the end of the day
        // Check if the selected date has past or if it's in future
        if (selectedDate >= endOfDay) {
          alert("Time remaining today: 0 hours, 0 minutes");
        } else {
          // Calculate remaining hours and minutes today
          const remainingTime = new Date(endOfDay - currentDate);
          const hoursRemaining = remainingTime.getUTCHours();
          const minutesRemaining = remainingTime.getUTCMinutes();
        }
      } else {
        // If the selected day is in past, print alert and remove the 'active' class
        alert("Please select a date in the future.");
        e.target.classList.remove("active");
      }
    });
  });
}
const houre = document.querySelector(".picker-hour");
const minute = document.querySelector(".picker-minute");
const pmAm = document.querySelector(".PMAM");
const pickerWindow = document.querySelector(".picker-window");
// create li for houres and minutes
for (let i = 1; i <= 12; i++) {
  const houreLi = document.createElement("li");
  houre.appendChild(houreLi);

  if (i < 10) {
    houreLi.innerHTML = "0" + [i];
  } else {
    houreLi.innerHTML = [i];
  }
}
for (let i = 0; i <= 59; i++) {
  const minuteLi = document.createElement("li");
  minute.appendChild(minuteLi);

  if (i < 10) {
    minuteLi.innerHTML = "0" + [i];
  } else {
    minuteLi.innerHTML = [i];
  }
}


// Select hour list items
const houreLi = houre.querySelectorAll("li");
// Select minute list items
const minuteLi = minute.querySelectorAll("li");
// Select PMAM list items
const pmamLi = pmAm.querySelectorAll("li");

const saveBtn = document.querySelector(".save-btn");


let setStatus = "noSet";
saveBtn.addEventListener("click", (e) => {
  const hourScrollPosition = houre.scrollTop;
  const minuteScrollPosition = minute.scrollTop;
  const pmAmScrollPosition = pmAm.scrollTop;

  const selectedHourIndex = Math.floor(
    hourScrollPosition / houreLi[0].offsetHeight
  );
  let selectedHour = houreLi[selectedHourIndex].innerHTML;

  const selectedMinuteIndex = Math.floor(
    minuteScrollPosition / minuteLi[0].offsetHeight
  );
  const selectedMinute = minuteLi[selectedMinuteIndex].innerHTML;

  const selectPmamIndex = Math.floor(
    pmAmScrollPosition / pmamLi[0].offsetHeight
  );
  const selectPmam = pmamLi[selectPmamIndex].innerHTML;

  // document.querySelector(".save-btn").addEventListener("click", () => {
  //   // turnOffAlarmMode();
  //   turnOnAlarmMode();
  // });

  if (selectPmam == "PM") {
    selectedHour = (parseInt(selectedHour) + 12).toString();
    remainingTime()
  }



  if (setStatus == "set") {
    saveBtn.innerHTML = 'tern on Alarm'
    saveBtn.style = 'color : #1DFF5D'
    setStatus = 'noSet'

  } else if (setStatus == 'noSet') {


    saveBtn.innerHTML = 'tern off Alarm'
    saveBtn.style = 'color : #FB296D'
    setStatus = 'set'

  }
  pushTime(
    parseInt(selectedHour),
    parseInt(selectedMinute),
    selectPmam,
    setStatus
  );
});

let getDate;
if (getDate == undefined) {
  getDate = new Date();
}

getDate = `${getDate.getDate()} ${getDate.getMonth() + 1
  } ${getDate.getFullYear()}`;

let lastTimeData = JSON.parse(localStorage.getItem("lastTimeData"));

if (!lastTimeData) {
  lastTimeData = {};
}

function pushTime(h, m, p, setStatus) {
  let timeData = {
    hours: h,
    minutes: m,
    period: p,
    setStatus: setStatus,
    days: getDate,
  };

  lastTimeData = timeData;

  localStorage.setItem("lastTimeData", JSON.stringify(lastTimeData));
}

setInterval(() => {
  const currentTime = new Date();
  const currentDay = `${currentTime.getDate()} ${currentTime.getMonth() + 1
    } ${currentTime.getFullYear()}`;
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  if (
    lastTimeData.hours === currentHours &&
    lastTimeData.minutes === currentMinutes &&
    lastTimeData.days === currentDay &&
    lastTimeData.setStatus == "set"
  ) {

    console.log('on')
  }
}, 1000);

let remainingDay;
if (remainingDay == undefined) {
  remainingDay = 0;
}

let rimTimes;

function remainingTime() {

  setInterval(() => {
    let rimDay = remainingDay;

    let rimHouer = lastTimeData.hours - new Date().getHours();
    let rimMinute = lastTimeData.minutes - new Date().getMinutes();

    if (rimMinute < 0) {
      rimHouer--;
      rimMinute = 60 + rimMinute;
    }

    if (rimHouer < 0) {
      rimDay--;
      rimHouer = 24 + rimHouer;
    }
    if (rimDay < 0) {
      rimDay = 0
    }
    if (lastTimeData.period == "AM") {
      rimHouer - 9
    }


    let saveRims = {
      remainingDay: rimDay,
      remainingHoure: rimHouer,
      remainingMinute: rimMinute,

    };
    rimTimes = saveRims
    // Update the content of the span with the ID "dd-rem'"
    document.getElementById('dd-rem').textContent = rimDay;
    // Update the content of the span with the ID "hh-rem"
    const hoursElement = document.getElementById('hh-rem');
    hoursElement.textContent = rimHouer < 10 ? `0${rimHouer}` : rimHouer;
    // Update the content of the span with the ID "mm-rem"
    const minutesElement = document.getElementById('mm-rem');
    minutesElement.textContent = rimMinute < 10 ? `0${rimMinute}` : rimMinute;

    localStorage.setItem("rimTimes", JSON.stringify(rimTimes));
  }, 1000);

}

let editTimeBox = document.querySelector('#edit-time-box')
let timeDateContainer = document.querySelector('.timeDate-container')
let coloseBtn = document.querySelector('.close-icon')
let blurCover = document.querySelector('.blur-cover')
let closeListBtn = document.querySelector('.close-list-btn')
let ringtonBox = document.querySelector('#rington-box')
let ringtonList = document.querySelector('.rington-list')

ringtonBox.addEventListener('click', showRingtonList)
closeListBtn.addEventListener('click', closeRingList)

function showRingtonList() {
  ringtonList.style = 'display:flex'
  blurCover.style = 'display:block'
}

function closeRingList() {
  ringtonList.style = 'display: none'
  blurCover.style = 'display:none'
}
let animationFrameId;
let totalMilliseconds;
let elapsedTime = 0;

function startTimer() {
  // Get hours, minutes, and seconds from span elements
  const daysInput = parseInt(document.getElementById('dd-rem').innerText, 10);
  const hoursInput = parseInt(document.getElementById('hh-rem').innerText, 10);
  const minutesInput = parseInt(document.getElementById('mm-rem').innerText, 10);
  const secondsInput = 0; // Assuming seconds are always 0

  // Calculate total milliseconds based on the input values
  totalMilliseconds = ((daysInput * 24 + hoursInput) * 60 + minutesInput) * 60 * 1000;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  elapsedTime = 0;
  applyStylesAndAnimations(hoursInput, minutesInput, secondsInput);
  updateClock(totalMilliseconds);
}   

function applyStylesAndAnimations(daysInput, hoursInput, minutesInput) {
  // Calculate the animation duration for each ring and dot
  const circles = document.querySelectorAll('.circle');
  const secCircle = circles[0];
  const minCircle = circles[1];
  const hrCircle = circles[2];

  // Calculate the total time in seconds
  const totalSeconds = (daysInput * 3600 + hoursInput * 60 + minutesInput);

  // Calculate the animation durations for dots
  const secAnimDuration = totalSeconds * 1000;
  const minAnimDuration = totalSeconds * 1000;
  const hrAnimDuration = totalSeconds * 1000;

  // Set custom properties for animation durations
  secCircle.style.setProperty('--sec-anim-duration', `${secAnimDuration}ms`);
  minCircle.style.setProperty('--min-anim-duration', `${minAnimDuration}ms`);
  hrCircle.style.setProperty('--hr-anim-duration', `${hrAnimDuration}ms`);

  // Apply styles and animations to each circle
  secCircle.querySelector('circle').style.strokeDasharray = '760';
  secCircle.querySelector('circle').style.strokeDashoffset = '710';
  secCircle.querySelector('circle').style.animation = `rotateCounterClockwise ${secAnimDuration}ms linear infinite`;

  minCircle.querySelector('circle').style.strokeDasharray = '760';
  minCircle.querySelector('circle').style.strokeDashoffset = '0';
  minCircle.querySelector('circle').style.animation = `rotateCounterClockwise ${minAnimDuration}ms linear infinite`;

  hrCircle.querySelector('circle').style.strokeDasharray = '43200'; // 12 hours (360 degrees)
  hrCircle.querySelector('circle').style.strokeDashoffset = '0'; // Start with a full circle
  hrCircle.querySelector('circle').style.animation = `rotateCounterClockwise ${hrAnimDuration}ms linear infinite`;
}


function updateClock(totalMilliseconds) {
  const startTime = performance.now();

  function update() {
    const currentTime = performance.now();
    elapsedTime = currentTime - startTime;

    if (elapsedTime >= totalMilliseconds) {
      // Timer is up

      // Stop the animations and set the circles to the completed state
      const circles = document.querySelectorAll('.circle');
      circles.forEach((circle) => {
        const circleElement = circle.querySelector('circle');
        circleElement.style.animation = 'none';
        circleElement.style.strokeDashoffset = '0';
      });

      return;
    }

    // Calculate and display the percentage
    const percentage = (elapsedTime / totalMilliseconds) * 100;

    // Update the timer progress bar
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${percentage}%`;

    animationFrameId = requestAnimationFrame(update);
  }

  update();
}