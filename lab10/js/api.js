/**
 * Fetches users from Random User API or returns cached data.
 * @returns {Promise<Array>} Array of user objects
 */
export async function fetchUsers() {
    const cacheKey = 'randomUsers';

    // If data exists in sessionStorage — return it
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
        try {
            return JSON.parse(cached);
        } catch {
            sessionStorage.removeItem(cacheKey);
        }
    }

    try {
        const res = await fetch('https://randomuser.me/api/?results=100&nat=us,gb,ca,ua,pl,de');

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        const users = data.results.map(user => ({
            id: user.login.uuid,
            photo: user.picture.large,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            phone: user.phone,
            dob: user.dob.date,
            age: user.dob.age,
            location: `${user.location.city}, ${user.location.country}`,
            registered: user.registered.date,
            gender: user.gender
        }));

        sessionStorage.setItem(cacheKey, JSON.stringify(users));
        return users;

    } catch (error) {
        console.error('Error fetching users:', error);
        showError('Failed to load users. Please try again later.');
        return [];
    }
}

/**
 * Displays error message on the screen.
 * @param {string} message
 */
function showError(message) {
    const container = document.getElementById('userCardsContainer');
    container.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}
