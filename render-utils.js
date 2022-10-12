export function renderProfile(profile, userId) {
    const li = document.createElement('li');
    li.classList.add('profile');
    if (userId === profile.id) {
        li.classList.add('self');
    }

    const userNameEl = document.createElement('h2');
    userNameEl.textContent = profile.user_name;

    const image = document.createElement('img');
    image.src = profile.image;

    const bioEl = document.createElement('p');
    bioEl.textContent = profile.bio;

    li.append(userNameEl, bioEl);
    return li;
}

export function renderComment(comment) {
    const li = document.createElement('li');

    li.textContent = comment.text;

    return li;
}

export function renderRoom(room) {
    const li = document.createElement('li');
    li.classList.add('room-item');

    const a = document.createElement('a');
    a.href = `/post/?id=${room.id}`;

    const div = document.createElement('div');
    div.classList.add('description-image-container');

    const titleCatDiv = document.createElement('div');
    titleCatDiv.classList.add('title-category-container');

    const h3 = document.createElement('h3');
    h3.classList.add('room-title');
    h3.textContent = room.title;

    const span = document.createElement('span');
    span.classList.add('room-category');
    span.textContent = room.category;

    const image = document.createElement('img');
    image.src = room.image;

    const p = document.createElement('p');
    p.classList.add('room-description');
    p.textContent = room.about;

    titleCatDiv.append(h3, span);

    div.append(titleCatDiv, image);

    a.append(div, p);

    li.append(a);

    return li;
}
