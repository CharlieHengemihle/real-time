/* Imports */
// this will check if we have a user and set signout link if it exists
import { getRoom } from '../fetch-utils.js';
import '../auth/user.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const roomTitle = document.getElementById('room-title');
const roomCategory = document.getElementById('room-category');
const roomAbout = document.getElementById('about-room');

/* State */
let error = null;
let room = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
    } else {
        const response = await getRoom(id);
        error = response.error;
        room = response.data;
    }

    if (error) {
        displayError();
    } else {
        displayRoom();
    }
});

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

function displayRoom() {
    roomTitle.textContent = room.title;
    roomCategory.textContent = room.category;
    roomAbout.textContent = room.about;
}
