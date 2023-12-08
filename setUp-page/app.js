// Alireza Ahmadi
// email : Ahmadialireza@gmail.com
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
// make today to nowday
let today = new Date();
// create active day
let activeDay;
// create month by selecting
let month = today.getMonth();
// create year by selecting
let year = today.getFullYear();
// add name  months of year to array
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

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  // make first day of calender
  const firstDay = new Date(year, month, 1);
  // make last day of calender
  const lastDay = new Date(year, month + 1, 0);
  // make prev day and last date of calender
  const prevDays = firstDay.getDay();
  const lastDate = lastDay.getDate();
  // inner html month and year
  date.innerHTML = months[month] + " " + year;

  let days = "";
  // The loop will iterate till 'prevDays' counter.
  // 'prevDays' is presumably containing the number of days from the previous month that should be displayed on the current month's calendar view.
  // Within the loop, for each iteration, an empty day div (styled as a date from the previous month) is concatenated to the 'days' string.

  for (let i = 0; i < prevDays; i++) {
    days += `<div class="day prev-date"></div>`;
  }

// The 'for' loop is iterating through each day of the month. Here, 'lastDate' is assumed to be the last day of the month.

for (let i = 1; i <= lastDate; i++) {
  // With 'new Date()' we get the current date, and through 'getDate()', 'getFullYear()', and 'getMonth()' methods we retrieve the day, year, and month respectively.
  // If the iterated day (i), year and month are equal to today's date, we are looking at the 'today' date on the calendar.
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
      // For all other dates, if an event exists, append a 'div' for the date with an 'event' class else append a 'div' only with 'day' class.
      if (event) {
          days += `<div class="day event" date-value="${i}">${i}</div>`;
      } else {
          days += `<div class="day" date-value="${i}">${i}</div>`;
      }
  }
}
// At the end, 'days' string contains markup for each day of the month with appropriate classes.

  daysContainer.innerHTML = days;
  addListener();
}

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
  }}
  // After changing the month and possibly the year, we initialize the calendar to reflect these changes
  initCalendar()

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

      console.log(getDate);
      // Check if the selectedDate is in future
      if (selectedDate > currentDate) {
        // If it's in future, calculate the remaining days and assign it to 'remainingDay'
        const daysRemaining = Math.ceil(
          (selectedDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        remainingDay = daysRemaining;
        console.log(`Days remaining: ${selectedDate}`);
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

          console.log(
            `Time remaining today: ${hoursRemaining} hours, ${minutesRemaining} minutes`
          );
        }
      } else {
        // If the selected day is in past, print alert and remove the 'active' class
        alert("Please select a date in the future.");
        e.target.classList.remove("active");
      }
    });
  });
}




// Alireza zeynabi
// email : Zeynabialireza@gmail.com
// ----------------------------------------------------
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
// ------------------------------------

// Select hour list items
const houreLi = houre.querySelectorAll("li");
// Select minute list items
const minuteLi = minute.querySelectorAll("li");
// Select PMAM list items
const pmamLi = pmAm.querySelectorAll("li");

const saveBtn = document.querySelector(".save-btn");

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

  //   console.log(`Selected Time: ${selectedHour}:${selectedMinute} ${selectPmam}`);

  if (selectPmam == "PM") {
    selectedHour = (parseInt(selectedHour) + 12).toString();
    remainingTime()
  }

  let setStatus = "noSet";

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

getDate = `${getDate.getDate()} ${
  getDate.getMonth() + 1
} ${getDate.getFullYear()}`;

// بازیابی مقدار lastTimeData از localStorage
let lastTimeData = JSON.parse(localStorage.getItem("lastTimeData"));

// اگر اطلاعات در localStorage موجود نباشد، مقدار اولیه را با مقدار خالی تنظیم کنید
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

  // console.log("Last Selected Time:");
  // console.log(lastTimeData);

  // ذخیره lastTimeData در localStorage
  localStorage.setItem("lastTimeData", JSON.stringify(lastTimeData));
}

setInterval(() => {
  const currentTime = new Date();
  const currentDay = `${currentTime.getDate()} ${
    currentTime.getMonth() + 1
  } ${currentTime.getFullYear()}`;
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  if (
    lastTimeData.hours === currentHours &&
    lastTimeData.minutes === currentMinutes &&
    lastTimeData.days === currentDay &&
    lastTimeData.setStatus == "noSet"
  ) {
    console.log("on");
  }
}, 1000);

// // turn off alarm btn
// const offBtn = document.querySelector(".off-btn");

// offBtn.addEventListener("click", () => {
//   lastTimeData.setStatus = "set";
//   // console.log(lastTimeData)
// });

let remainingDay;
if (remainingDay == undefined) {
  remainingDay = 0;
}

// console.log(remainingDay);
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
    // -------------------------inja validation ------------------------//
    if (rimHouer < 0) {
      rimDay--;
      rimHouer = 24 + rimHouer;
    }
    if(rimDay < 0 ){
      rimDay = 0
    }
    if(lastTimeData.period == "AM"){
      rimHouer - 9
    }
    console.log(`${rimDay} : ${rimHouer} : ${rimMinute}`);
  
    let saveRims = {
      remainingDay :rimDay,
      remainingHoure : rimHouer,
      remainingMinute : rimMinute ,
    }
  
    rimTimes = saveRims
  
    console.log(rimTimes)

    localStorage.setItem("rimTimes", JSON.stringify(rimTimes));
  }, 1000);
 
}
// ----------------------------
// ----------------------------
// ----------------------------





//  sohw setTime page

let editTimeBox = document.querySelector('#edit-time-box')
let timeDateContainer = document.querySelector('.timeDate-container')
let coloseBtn = document.querySelector('.close-icon')
let blurCover = document.querySelector('.blur-cover')
let closeListBtn = document.querySelector('.close-list-btn')
let ringtonBox = document.querySelector('#rington-box')
let ringtonList = document.querySelector('.rington-list')

ringtonBox.addEventListener('click',showRingtonList)
closeListBtn.addEventListener('click',closeRingList)

function showRingtonList() {
  ringtonList.style = 'display:flex'
  blurCover.style = 'display:block'
}

function closeRingList () {
  ringtonList.style = 'display: none'
  blurCover.style = 'display:none'
}