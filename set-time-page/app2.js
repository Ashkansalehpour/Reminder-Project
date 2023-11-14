// Alireza Ahmadi
// email : Ahmadialireza@gmail.com
const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

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
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevDays = firstDay.getDay();
  const lastDate = lastDay.getDate();
  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let i = 0; i < prevDays; i++) {
    days += `<div class="day prev-date"></div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      if (event) {
        days += `<div class="day today active event" date-value="${i}">${i}</div>`;
      } else {
        days += `<div class="day today active" date-value="${i}">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event" date-value="${i}">${i}</div>`;
      } else {
        days += `<div class="day" date-value="${i}">${i}</div>`;
      }
    }
  }

  daysContainer.innerHTML = days;
  addListener();
}

//function to add month and year on prev and next button

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListener() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      const selectedDate = new Date(year, month, Number(e.target.innerHTML));
      const currentDate = new Date();
      const clickedMonth = month;

      // send selectedDate out of function
      getDate = selectedDate;

      console.log(getDate);
      if (selectedDate > currentDate) {
        // If the selected date is in the future, calculate days remaining
        const daysRemaining = Math.ceil(
          (selectedDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        remainingDay = daysRemaining;
        console.log(`Days remaining: ${selectedDate}`);
      } else if (selectedDate.toDateString() === currentDate.toDateString()) {
        // If the selected date is the current date, check if it's the end of the day
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59); // Set it to the end of the day

        if (selectedDate >= endOfDay) {
          alert("Time remaining today: 0 hours, 0 minutes");
        } else {
          // Calculate remaining time in hours and minutes
          const remainingTime = new Date(endOfDay - currentDate);
          const hoursRemaining = remainingTime.getUTCHours();
          const minutesRemaining = remainingTime.getUTCMinutes();

          console.log(
            `Time remaining today: ${hoursRemaining} hours, ${minutesRemaining} minutes`
          );
        }
      } else {
        // Show an alert for selecting a past date
        alert("Please select a date in the future.");
        e.target.classList.remove("active");
      }
    });
  });
}

// console.log(selectedDate)



todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

let div = document.createElement("div").classList.add("day");

daysContainer.addEventListener("click", (e) => {
  let div = e.target;
  if (div.classList.contains("day")) {
    const clickedDate = div.getAttribute("date-value");
    const clickedYear = year;
    const clickedMonth = month;
    const clickedDay = parseInt(clickedDate, 10);

    // Calculate the number of days remaining
    const selectedDate = new Date(clickedYear, clickedMonth, clickedDay);
    const currentDate = new Date();

    if (selectedDate >= currentDate) {
      const daysRemaining = Math.ceil(
        (selectedDate - currentDate) / (1000 * 60 * 60 * 24)
      );
    } else {
      alert("Please select a date in the future.");
      div.classList.remove("active");
    }
  }
});




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

// turn off alarm btn
const offBtn = document.querySelector(".off-btn");

offBtn.addEventListener("click", () => {
  lastTimeData.setStatus = "set";
  // console.log(lastTimeData)
});

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