// Default notes data with end times (in ISO format) and status
let defaultNotes = [
    { title: "Default Note 1", endTime: "2023-11-01T05:00:00Z", status: "active" },
    { title: "Default Note 4", endTime: "2023-11-02T05:00:00Z", status: "active" },
    { title: "Default Note 3", endTime: "2023-11-03T05:00:00Z", status: "active" },
    { title: "Default Note 2", endTime: "2023-11-04T05:00:00Z", status: "active" },
    { title: "Default Note 5", endTime: "2023-11-05T05:00:00Z", status: "active" },
    { title: "Default Note 3", endTime: "2023-11-06T05:00:00Z", status: "active" }
];

// Function to render notes
function renderNotes(notes) {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = '';

    notes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.draggable = true; // Make note divs draggable
        const uniqueId = `switch${index}`;
        noteElement.innerHTML = `
            <div class="note-content">
                <div class="left-content">
                    <p class="ring-time">${formatTime(note.endTime)}</p>
                    <p class="remaining-days">${calculateRemainingTime(note.endTime)}</p>
                </div>
                <div class="right-content">
                    <h2>${note.title}</h2>
                    <input type="checkbox" id="${uniqueId}" class="small-checkbox" />
                    <label for="${uniqueId}" class="small-label">Toggle</label>
                </div>
            </div>
        `;

        noteElement.addEventListener('dragstart', handleDragStart);
        noteElement.addEventListener('dragover', handleDragOver);
        noteElement.addEventListener('drop', handleDrop);
        noteElement.addEventListener('dragend', handleDragEnd);

        notesContainer.appendChild(noteElement);

        // Swipe gesture handling for deleting notes
        addSwipeGesture(noteElement, () => handleSwipeAndDelete(noteElement, index));

        notesContainer.appendChild(noteElement);
    });
}

// Function to add swipe gesture handling to an element
function addSwipeGesture(element, onSwipe) {
    let startX;

    element.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true }); // Add passive: true

    element.addEventListener('touchend', (e) => {
        const deltaX = e.changedTouches[0].clientX - startX;

        if (deltaX < -50) {
            // Swipe left detected
            onSwipe();
        }
    }, { passive: true }); // Add passive: true
}

// Load notes order from local storage or use default order
document.addEventListener("DOMContentLoaded", function () {
    let loadedNotesOrder = localStorage.getItem("notesOrder");
    let notesOrder;

    if (loadedNotesOrder) {
        // If notes order exists in local storage, use it
        notesOrder = JSON.parse(loadedNotesOrder);
    } else {
        // If no notes order in local storage, use default order
        notesOrder = defaultNotes;
    }

    // Render the notes based on the order
    renderNotes(notesOrder);
});

// Define the event handlers for drag-and-drop
let dragSrcElement = null;

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

    dragSrcElement = this;

    this.style.opacity = '0.4';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary for drop to work
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcElement !== this) {
        dragSrcElement.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');

        // Update the 'defaultNotes' array to reflect the new order.
        const dragIndex = Array.from(this.parentNode.children).indexOf(dragSrcElement);
        const dropIndex = Array.from(this.parentNode.children).indexOf(this);
        const updatedNotes = [...defaultNotes];

        const [movedNote] = updatedNotes.splice(dragIndex, 1);
        updatedNotes.splice(dropIndex, 0, movedNote);

        // Save the updated notes order to local storage
        localStorage.setItem("notesOrder", JSON.stringify(updatedNotes));
        defaultNotes = updatedNotes;
    }

    return false;
}

function handleDragEnd() {
    this.style.opacity = '1';
}

// Function to format the time in HH:mm AM/PM format
function formatTime(time) {
    try {
        const options = { hour: "2-digit", minute: "2-digit", hour12: true };
        const formattedTime = new Date(time).toLocaleTimeString("en-US", options);
        return formattedTime;
    } catch (error) {
        console.error("Error formatting time:", error);
        return "Invalid time";
    }
}

// Function to calculate remaining time
function calculateRemainingTime(endTime) {
    try {
        const endDateTime = new Date(endTime);
        const now = new Date();
        const timeDifference = endDateTime - now;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const months = Math.floor(Math.abs(days) / 30);
        const remainingDays = Math.abs(days) % 30;

        return `${months} month${months !== 1 ? 's' : ''} and ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
    } catch (error) {
        console.error("Error calculating remaining time:", error);
        return "N/A";
    }
}




// Function to sort notes based on title (A-Z)
function sortNotesAZ() {
    defaultNotes.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
    });

    renderNotes(defaultNotes);
}


// Function to sort notes based on date (ascending order)
// Function to sort notes based on the highest date (descending order)
function sortNotesByHighestDate() {
    defaultNotes.sort((a, b) => {
        const dateA = new Date(a.endTime);
        const dateB = new Date(b.endTime);
        return dateB - dateA; // Sort in descending order
    });

    renderNotes(defaultNotes);
}

// Event listener for the sortDateButton
document.getElementById("sortDateButton").addEventListener("click", sortNotesByHighestDate);


// Event listener for the sortDateButton



// Event listener for the filter button
document.getElementById("filterButton").addEventListener("click", () => {
    const popup = document.getElementById("filterPopup");
    const filterButton = document.getElementById("filterButton");

    // Calculate the position to show the popup next to the filterButton
    popup.style.left = "803.85px";
    popup.style.top = "409.4px";
    popup.style.transition = "left 0.3s, top 0.3s";

    popup.classList.toggle("show"); // Toggle the "show" class to control visibility
});

// Event listener for sorting A-Z
document.getElementById("sortAZButton").addEventListener("click", sortNotesAZ);

// Function to navigate to the create-note.html page when clicking the "Add Item" button
function redirectToCreateNote() {
    window.location.href = "create-note.html";
}

// Event listener for the "Add Item" button
document.getElementById("addItemButton").addEventListener("click", redirectToCreateNote);

// Function to update notes based on the search keyword

function updateNotesBySearch(keyword) {
    const notesContainer = document.getElementById("notesContainer");
    const notes = Array.from(notesContainer.querySelectorAll(".note"));

    notes.forEach(note => {
        const titleElement = note.querySelector("h2");
        const title = titleElement.textContent;

        const match = title.toLowerCase().includes(keyword.toLowerCase());
        note.style.display = match ? "block" : "none";

        // Highlight the matched keyword
        const regex = new RegExp(`(${keyword})`, 'gi');
        titleElement.innerHTML = title.replace(regex, '<span class="highlighted">$1</span>');
    });
}



// Event listener for the search input
document.getElementById("searchInput").addEventListener("input", function () {
    const searchInput = this.value.trim();
    updateNotesBySearch(searchInput);
});

//clock script
//* This code sets up a timer using setInterval to repeatedly execute the code inside the arrow function every 1000 milliseconds (1 second).

//* This creates a continuous update for the clock, ensuring that the displayed time is always current.
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
}, 1000);

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