import { fetchUsers } from './api.js';
import { renderUserCards, getFavorites, toggleFavorite } from './ui.js';
import { showLoginForm, setupFormEvents } from './auth.js';

let allUsers = [];
let filteredUsers = [];
let currentPage = 1;
const USERS_PER_PAGE = 30;
let visibleCount = USERS_PER_PAGE;

let debounceTimer = null;

function renderPage() {
    const favorites = getFavorites();
    const start = (currentPage - 1) * USERS_PER_PAGE;
    const end = currentPage * USERS_PER_PAGE;
    const usersToShow = filteredUsers.slice(start, end);
    renderUserCards(usersToShow, favorites);
    renderPagination();
    updateURL();
}


function renderPagination() {
    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.toggle('active', i === currentPage);
        btn.addEventListener('click', () => {
            currentPage = i;
            renderPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(btn);
    }
}

function updateURL() {
    const params = new URLSearchParams();

    const searchValue = document.getElementById('searchInput')?.value.trim();
    const sortValue = document.getElementById('sortSelect')?.value;
    const ageMinValue = document.getElementById('ageMinFilter')?.value;
    const ageMaxValue = document.getElementById('ageMaxFilter')?.value;
    const birthYearValue = document.getElementById('birthYearFilter')?.value;
    const emailValue = document.getElementById('emailFilter')?.value.trim();
    const locationValue = document.getElementById('locationFilter')?.value.trim();
    const nameValue = document.getElementById('nameFilter')?.value.trim();

    if (searchValue) params.set('search', searchValue);
    if (sortValue) params.set('sort', sortValue);
    if (ageMinValue) params.set('ageMin', ageMinValue);
    if (ageMaxValue) params.set('ageMax', ageMaxValue);
    if (birthYearValue) params.set('birthYear', birthYearValue);
    if (emailValue) params.set('email', emailValue);
    if (locationValue) params.set('location', locationValue);
    if (nameValue) params.set('name', nameValue);
    if (currentPage > 1) params.set('page', currentPage);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.replaceState(null, '', newUrl);
}

function readURL() {
    const params = new URLSearchParams(window.location.search);

    document.getElementById('searchInput').value = params.get('search') || '';
    document.getElementById('sortSelect').value = params.get('sort') || '';
    document.getElementById('countryFilter').value = params.get('country') || '';
    document.getElementById('ageMinFilter').value = params.get('ageMin') || '';
    document.getElementById('ageMaxFilter').value = params.get('ageMax') || '';
    document.getElementById('birthYearFilter').value = params.get('birthYear') || '';
    document.getElementById('emailFilter').value = params.get('email') || '';
    document.getElementById('locationFilter').value = params.get('location') || '';
    document.getElementById('nameFilter').value = params.get('name') || '';

    currentPage = parseInt(params.get('page')) || 1;
    visibleCount = currentPage * USERS_PER_PAGE;
}

document.addEventListener('DOMContentLoaded', async () => {
    setupFormEvents();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            document.getElementById('mainApp').classList.add('hidden');
            document.querySelector('.container').classList.remove('hidden');
            showLoginForm();
        });
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showLoginForm();
        return;
    }

    await initApp();

    document.querySelector('.container').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
});

window.addEventListener('scroll', () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    const moreToLoad = visibleCount < filteredUsers.length;

    if (nearBottom && moreToLoad) {
        visibleCount += USERS_PER_PAGE;
        currentPage = Math.ceil(visibleCount / USERS_PER_PAGE);
        renderPage();
    }
});

document.getElementById('userCardsContainer')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('favorite-btn')) {
        const id = e.target.dataset.id;
        toggleFavorite(id);
        renderPage();
    }
});

document.getElementById('searchInput')?.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        applyFilters();
    }, 300);
});

document.getElementById('sortSelect')?.addEventListener('change', () => {
    applyFilters();
});

document.getElementById('countryFilter')?.addEventListener('change', () => {
    applyFilters();
    visibleCount = USERS_PER_PAGE;
});

document.getElementById('ageMinFilter')?.addEventListener('input', applyFilters);
document.getElementById('ageMaxFilter')?.addEventListener('input', applyFilters);
document.getElementById('birthYearFilter')?.addEventListener('change', applyFilters);
document.getElementById('emailFilter')?.addEventListener('input', applyFilters);
document.getElementById('locationFilter')?.addEventListener('input', applyFilters);
document.getElementById('nameFilter')?.addEventListener('input', applyFilters);

function sortUsers(value) {
    const sorters = {
        'name-asc': (a, b) => a.firstName.localeCompare(b.firstName),
        'name-desc': (a, b) => b.firstName.localeCompare(a.firstName),
        'age-asc': (a, b) => a.age - b.age,
        'age-desc': (a, b) => b.age - a.age,
        'registered-asc': (a, b) => new Date(a.registered) - new Date(b.registered),
        'registered-desc': (a, b) => new Date(b.registered) - new Date(a.registered),
    };

    if (sorters[value]) {
        filteredUsers.sort(sorters[value]);
    }
}

function applyFilters() {
    const name = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const email = document.getElementById('emailFilter')?.value.toLowerCase() || '';
    const location = document.getElementById('locationFilter')?.value.toLowerCase() || '';
    const ageMin = parseInt(document.getElementById('ageMinFilter')?.value) || 0;
    const ageMax = parseInt(document.getElementById('ageMaxFilter')?.value) || 120;
    const birthYearValue = document.getElementById('birthYearFilter')?.value;
    const birthYear = birthYearValue ? parseInt(birthYearValue) : null;

    filteredUsers = allUsers.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const matchName = fullName.includes(name);
        const matchEmail = user.email.toLowerCase().includes(email);
        const matchLocation = user.location.toLowerCase().includes(location);
        const matchAge = user.age >= ageMin && user.age <= ageMax;
        const matchBirth = birthYear ? new Date(user.dob).getFullYear() >= birthYear : true;

        return matchName && matchEmail && matchLocation && matchAge && matchBirth;
    });

    sortUsers(document.getElementById('sortSelect')?.value);
    currentPage = 1;
    visibleCount = USERS_PER_PAGE;
    renderPage();
}

function populateCountryFilter(users) {
    const select = document.getElementById('countryFilter');
    const countries = [...new Set(users.map(u => u.location.split(', ').pop()))].sort();

    select.innerHTML = '<option value="">All Countries</option>';
    countries.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        select.appendChild(opt);
    });
}

function populateBirthYearFilter() {
    const select = document.getElementById('birthYearFilter');
    if (!select) return;

    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 5; y >= 1950; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        select.appendChild(opt);
    }
}

async function initApp() {
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');

    allUsers = await fetchUsers();
    filteredUsers = [...allUsers];

    populateBirthYearFilter();
    populateCountryFilter(allUsers);
    readURL();
    applyFilters();
}
