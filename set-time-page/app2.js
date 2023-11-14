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