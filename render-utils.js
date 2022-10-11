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

    const a = document.createElement('a');
    a.href = `/post/?id=${room.id}`;

    const image = document.createElement('img');
    image.src = room.image;

    const h2 = document.createElement('h2');
    h2.textContent = room.title;

    const p = document.createElement('p');
    p.textContent = room.body;

    a.append(h2, image, p);
    li.append(a);

    return li;
}