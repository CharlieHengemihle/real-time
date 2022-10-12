import { uploadImage } from '../fetch-utils.js';
import '/auth/user.js';
import { createRoom } from '/fetch-utils.js';

/* DOM Elements*/
const errorDisplay = document.getElementById('error-display');
const createRoomForm = document.getElementById('create-room-form');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const xButton = document.getElementById('x-button');

preview.classList.add('avatar');

let error = null;

/* event listeners*/
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];

    if (file) {
        preview.classList.add('avatar');
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/placeholder-image.png';
    }
});

xButton.addEventListener('click', () => {
    location.assign('../');
});

createRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(createRoomForm);

    const imageFile = formData.get('image');
    const imageFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `rooms/${imageFolder}/${imageFile.title}`;
    const url = await uploadImage('bucket1', imagePath, imageFile);

    const room = {
        title: formData.get('room-name'),
        about: formData.get('room-description'),
        category: formData.get('room-category'),
        image: url,
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
