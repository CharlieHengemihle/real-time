/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getRooms } from './fetch-utils.js';
import { renderRoom } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const roomsList = document.getElementById('rooms-list');
const searchForm = document.getElementById('search-form');

/* State */
let error = null;
let rooms = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getRooms();

    error = response.error;
    rooms = response.data;

    if (error) {
        displayError();
    } else {
        displayRooms();
    }
});

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);

    findRooms(formData.get('title-search'));
});

async function findRooms(title) {
    const response = await getRooms(title);

    error = response.error;
    rooms = response.data;

    if (error) {
        displayError();
    } else {
        displayRooms();
    }
}

/* Display Functions */
function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayRooms() {
    roomsList.innerHTML = '';

    for (const room of rooms) {
        const roomEl = renderRoom(room);
        roomsList.append(roomEl);
    }
}
