// imports
import '../auth/user.js';
import { createProfile } from '../fetch-utils.js';
import { getProfile, getUser, uploadImage } from '../fetch-utils.js';

const user = getUser();

// dom
const errorDisplay = document.getElementById('error-display');
const profileForm = document.getElementById('profile-form');
const updateButton = document.getElementById('update-button');
const userNameInput = profileForm.querySelector('[name=user_name]');
const bioTextArea = profileForm.querySelector('[name=bio]');

// state
let profile = null;
let error = null;

// window event listeners
window.addEventListener('load', async () => {
    const response = await getProfile(user.id);
    profile = response.data;
    error = response.error;

    if (error) {
        displayError();
    }
    if (profile) {
        displayProfile();
    }
});

// profile
profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDisplay.textContent = '';
    const buttonText = updateButton.textContent;

    updateButton.disabled = true;

    const formData = new FormData(profileForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `profiles/${randomFolder}/${imageFile.name}`;
    const url = await uploadImage('bucket1', imagePath, imageFile);
    
    const createProfileObject = {
        user_name: formData.get('user_name'),
        bio: formData.get('bio'),
        image: url,
    };

    const response = await createProfile(createProfileObject);
    error = response.error;

    if (error) {
        displayError();
        updateButton.disabled = false;
        updateButton.textContent = buttonText;
    } else {
        profileForm.reset();
        location.assign('../');
    }
});

// display function
function displayError() {
    errorDisplay.textContent = error.message;
}
function displayProfile() {
    if (profile) {
        userNameInput.value = profile.user_name;
        bioTextArea.value = profile.bio;
    }
}
