import { fetchUsers } from './api.js';
import { renderUserCards, getFavorites, toggleFavorite } from './ui.js';
//import { setupInteractions } from './friends.js';
import { showLoginForm, setupFormEvents } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    setupFormEvents();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');

            document.getElementById('mainApp').classList.add('hidden');
            document.querySelector('.container').classList.remove('hidden');

            showLoginForm(); // Показує форму логіну
        });
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        showLoginForm();
        return;
    }

    document.querySelector('.container').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');

    const allUsers = await fetchUsers();
    let favorites = getFavorites();

    renderUserCards(allUsers.slice(0, 30), favorites);
    //setupInteractions(allUsers);

    document.getElementById('userCardsContainer').addEventListener('click', (e) => {
        if (e.target.classList.contains('favorite-btn')) {
            const id = e.target.dataset.id;
            toggleFavorite(id);
            const updatedFavorites = getFavorites();
            renderUserCards(allUsers.slice(0, 30), updatedFavorites);
        }
    });

});
