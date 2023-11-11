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

}, 1000)