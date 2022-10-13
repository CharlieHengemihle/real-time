/* Imports */
// this will check if we have a user and set signout link if it exists
import { createComment, getRoom, onComment, getComment } from '../fetch-utils.js';
import '../auth/user.js';
import { renderComment } from '../render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const roomTitle = document.getElementById('room-title');
const roomCategory = document.getElementById('room-category');
const roomAbout = document.getElementById('about-room');
const commentList = document.getElementById('comments');
const addCommentForm = document.getElementById('add-comment-form');
const xButton = document.getElementById('x-button');

/* State */
let error = null;
let room = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('../');
        return;
    } else {
        const response = await getRoom(id);
        error = response.error;
        room = response.data;
    }

    if (error) {
        displayError();
    }
    if (!room) {
        location.assign('/');
    } else {
        displayRoom();
        displayComments();
    }

    onComment(room.id, async (payload) => {
        const commentId = payload.new.id;
        const commentResponse = await getComment(commentId);
        error = commentResponse.error;
        if (error) {
            displayError();
        } else {
            const comment = commentResponse.data;
            room.comments.unshift(comment);
            displayComments();
        }
    });
});

xButton.addEventListener('click', () => {
    location.assign('../');
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addCommentForm);

    let commentInsert = {
        room_id: room.id,
        text: formData.get('text'),
    };

    const response = await createComment(commentInsert);
    error = response.error;

    if (error) {
        displayError();
    } else {
        addCommentForm.reset();
        // room.comments.unshift(comment);
        // console.log(commentInsert);
        // displayComments();
    }
    // return;
});
/* Display Functions */
function displayComments() {
    commentList.innerHTML = '';

    for (const comment of room.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}

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
