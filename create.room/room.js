import '/auth/user.js';
import { createRoom } from '/fetch-utils.js';

/* DOM Elements*/
const errorDisplay = document.getElementById('error-display');
const createRoomForm = document.getElementById('create-room-form');

let error = null;

createRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(createRoomForm);
    const room = {
        title: formData.get('room-name'),
        about: formData.get('room-description'),
        category: formData.get('room-category'),
        image: formData.get('image'),
    };
    const response = await createRoom(room);
    error = response.error;
    errorDisplay.formData = '';

    if (error) {
        displayError();
        // eslint-disable-next-line no-console
        console.warn(error);
    } else {
        createRoomForm.reset();
        location.assign('/');
    }
});
/* Display Functions */
function displayError() {
    errorDisplay.textContent = error.message;
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
