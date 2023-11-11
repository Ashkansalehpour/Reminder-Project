setInterval(() => {
    // This line selects the HTML element with the ID 'hh' using the getElementById method. The selected element represents the hour indicator in the clock.
    const hh = document.getElementById('hh');
    // Similar to the first line, this selects the HTML element with the ID 'mm', representing the minute indicator in the clock.
    const mm = document.getElementById('mm');
    // This line selects the HTML element with the ID 'ss', representing the second indicator in the clock.
    const ss = document.getElementById('ss');
    // Using the querySelector method, this line selects the HTML element with the class name 'sec_dot'. This element represents the dot in the seconds circle of the clock.
    const sec_dot = document.querySelector('.sec_dot');
    // Similar to the previous line, this selects the HTML element with the class name 'min_dot', representing the dot in the minutes circle of the clock.
    const min_dot = document.querySelector('.min_dot');
    // This line selects the HTML element with the class name 'hr_dot', representing the dot in the hours circle of the clock.
    const hr_dot = document.querySelector('.hr_dot');
    // This line selects the HTML element with the ID 'current-time'. This element is where the formatted current time will be displayed in the clock.
    const currentTime = document.getElementById('current-time');
    // Similar to the previous line, this selects the HTML element with the ID 'current-date'. This element is where the formatted current date will be displayed in the clock.
    const currentDate = document.getElementById('current-date');

    // This line creates a new Date object using the Date constructor. The getHours() method is then called on this object to retrieve the current hour in the local time zone. The result is stored in the variable `h`.
    const h = new Date().getHours();
    // Similar to the first line, a new Date object is created. The getMinutes() method is called to obtain the current minute in the local time zone, and the result is stored in the variable `m`.
    const m = new Date().getMinutes();
    // Once again, a new Date object is created. The getSeconds() method is called to get the current second in the local time zone, and the result is stored in the variable `s`.
    const s = new Date().getSeconds();

    //* These lines dynamically update the visual aspects of the clock.

    //* They adjust the strokeDashoffset of the circles representing hours (hh), minutes (mm), and seconds (ss). 

    //* Additionally, they rotate the dots representing seconds (sec_dot), minutes (min_dot), and hours (hr_dot) based on the current time.
    hh.style.strokeDashoffset = 510 - (510 * h) / 12;
    mm.style.strokeDashoffset = 630 - (630 * m) / 60;
    ss.style.strokeDashoffset = 760 - (760 * s) / 60;
    sec_dot.style.transform = `rotateZ(${s * 6}deg)`;
    min_dot.style.transform = `rotateZ(${m * 6}deg)`;
    hr_dot.style.transform = `rotateZ(${h * 30}deg`;

    //* This block creates a formatted time string using template literals.
    //* The hours, minutes, and seconds are individually wrapped in <span> elements with different colors.
    //* This formatted time is then set as the inner HTML of the currentTime element.
    const formattedTime = `<span style="color: #fb296d">${h < 10 ? '0' + h : h}</span>:<span style="color: #fae60e">${m < 10 ? '0' + m : m}</span>.<span style="color: #20c74d">${s < 10 ? '0' + s : s}</span>`;
    // This line sets the innerHTML property of the currentTime element to the previously created formattedTime string. In other words, it updates the content of the HTML element with the ID 'current-time' to display the formatted time.
    currentTime.innerHTML = formattedTime;

    // Set the text content of the currentDate element to the result of the getCurrentDate() function, which likely returns the current date in the format "yy/dd/mm".
    currentDate.textContent = getCurrentDate();
    // Explanation: Set the text color of the currentDate element to a light gray with 35% transparency.
    currentDate.style.color = 'rgba(215 215 215 / 35%)';
    // Explanation: Set the font size of the text inside the currentDate element to 15 pixels.
    currentDate.style.fontSize = '15px';
    //  Add left padding to the text inside the currentDate element, pushing it 20 pixels away from the left edge.
    currentDate.style.paddingLeft = '20px';
}, 1000)

// This line declares the start of the getCurrentDate function.
function getCurrentDate() {
    // Create a new Date object representing the current date and time
    const today = new Date();
    // Get the last two digits of the current year.
    const yy = today.getFullYear().toString().slice(-2);
    // Get the day of the month.
    const dd = today.getDate();
    // Get the month (adding 1 to adjust for zero-based indexing).
    const mm = today.getMonth() + 1;
    // Construct a formatted date string in the "yy/dd/mm" format, ensuring leading zeros for single-digit days and months
    return `${yy}/${dd < 10 ? '0' + dd : dd}/${mm < 10 ? '0' + mm : mm}`;
}