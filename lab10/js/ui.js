/**
 * Render user cards into the container.
 * @param {Array} users - Array of user objects
 * @param {Array} favorites - Array of favorite user ids
 */
export function renderUserCards(users, favorites = []) {
    const container = document.getElementById('userCardsContainer');
    container.innerHTML = '';

    if (!users.length) {
        container.innerHTML = `<div class="no-users">No users found.</div>`;
        return;
    }

    const fragment = document.createDocumentFragment();

    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';

        const isFavorite = favorites.includes(user.id);

        card.innerHTML = `
            <img src="${user.photo}" alt="Profile of ${user.firstName}" class="user-photo" />
            <div class="user-info">
                <h2>${user.firstName} ${user.lastName}</h2>
                <p>📧 ${user.email}</p>
                <p>📱 ${user.phone}</p>
                <p>🎂 ${user.age} y.o.</p>
                <p>📍 ${user.location}</p>
                <button class="favorite-btn ${isFavorite ? 'fav' : ''}" data-id="${user.id}">
                    ${isFavorite ? '💖' : '🤍'}
                </button>
            </div>
        `;
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Get favorite user ids from LocalStorage
 * @returns {Array}
 */
export function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem('favoriteUsers')) || [];
    } catch {
        return [];
    }
}

/**
 * Toggle favorite state for a user
 * @param {string} id - User ID
 */
export function toggleFavorite(id) {
    let favorites = getFavorites();

    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem('favoriteUsers', JSON.stringify(favorites));
}
