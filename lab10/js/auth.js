export function showSignup() {
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupBtn').classList.add('active');
    document.getElementById('loginBtn').classList.remove('active');
}

export function showLoginForm() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginBtn').classList.add('active');
    document.getElementById('signupBtn').classList.remove('active');
}

function populateCities() {
    const citySelect = document.getElementById('signupCity');
    const country = document.getElementById('signupCountry').value;
    citySelect.innerHTML = '<option value="">Select city</option>';

    const cities = {
        Ukraine: ['Kyiv', 'Lviv', 'Odesa'],
        Poland: ['Warsaw', 'Krakow'],
        Germany: ['Berlin', 'Munich']
    };

    if (cities[country]) {
        cities[country].forEach(city => {
            const opt = document.createElement('option');
            opt.value = city;
            opt.textContent = city;
            citySelect.appendChild(opt);
        });
        citySelect.disabled = false;
    } else {
        citySelect.disabled = true;
    }
}

function handleSignup(e) {
    e.preventDefault();

    const firstName = document.getElementById('signupFirstName');
    const lastName = document.getElementById('signupLastName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('signupConfirmPassword');
    const phone = document.getElementById('signupPhone');
    const birthDate = document.getElementById('signupBirthDate');
    const country = document.getElementById('signupCountry');
    const city = document.getElementById('signupCity');
    const sex = document.querySelector('input[name="signupSex"]:checked');

    let isValid = true;

    clearFeedback();

    if (firstName.value.length < 3 || firstName.value.length > 15) {
        setError(firstName, 'Name must be between 3 and 15 characters.');
        isValid = false;
    } else setSuccess(firstName);

    if (lastName.value.length < 3 || lastName.value.length > 15) {
        setError(lastName, 'Name must be between 3 and 15 characters.');
        isValid = false;
    } else setSuccess(lastName);

    if (!validateEmail(email.value)) {
        setError(email, 'Enter a valid email.');
        isValid = false;
    } else setSuccess(email);

    if (password.value.length < 6) {
        setError(password, 'Password must be at least 6 characters.');
        isValid = false;
    } else setSuccess(password);

    if (confirmPassword.value !== password.value) {
        setError(confirmPassword, 'Passwords do not match.');
        isValid = false;
    } else setSuccess(confirmPassword);

    if (!validatePhone(phone.value)) {
        setError(phone, 'Phone must start with +380 and contain 12 digits.');
        isValid = false;
    } else setSuccess(phone);

    if (!birthDate.value || calculateAge(birthDate.value) < 12) {
        setError(birthDate, 'You must be at least 12 years old.');
        isValid = false;
    } else setSuccess(birthDate);

    if (!sex) {
        document.getElementById('signupSexError').textContent = 'Please select your sex.';
        isValid = false;
    }

    if (country.value === '') {
        setError(country, 'Please select a country.');
        isValid = false;
    }

    if (city.value === '') {
        setError(city, 'Please select a city.');
        isValid = false;
    }

    if (!isValid) return;

    const user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        birthDate: birthDate.value,
        country: country.value,
        city: city.value,
        sex: sex.value,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    location.reload();


    document.getElementById('successMessage').style.display = 'block';
    e.target.reset();
    city.disabled = true;

    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 3000);
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginUsername');
    const password = document.getElementById('loginPassword');

    clearFeedback();

    const user = {
        email: email.value.trim(),
        password: password.value.trim()
    };

    if (!user.email || !user.password) {
        setError(email, 'Email is required.');
        setError(password, 'Password is required.');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));

    e.target.reset();
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');

    import('./main.js').then(({ initApp }) => initApp());
}



function clearFeedback() {
    document.querySelectorAll('.error-text').forEach(e => e.textContent = '');
    document.querySelectorAll('input, select').forEach(e => {
        e.classList.remove('is-valid', 'is-invalid');
        const icon = document.getElementById(e.id + 'Icon');
        if (icon) icon.textContent = '';
    });
}

function setError(input, message) {
    input.classList.add('is-invalid');
    const icon = document.getElementById(input.id + 'Icon');
    if (icon) icon.textContent = '❌';
    const error = document.getElementById(input.id + 'Error');
    if (error) error.textContent = message;
}

function setSuccess(input) {
    input.classList.add('is-valid');
    const icon = document.getElementById(input.id + 'Icon');
    if (icon) icon.textContent = '✅';
    const error = document.getElementById(input.id + 'Error');
    if (error) error.textContent = 'Looks good!';
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\+380\d{9}$/.test(phone);
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}


export function setupFormEvents() {
    document.getElementById('signupBtn')?.addEventListener('click', showSignup);
    document.getElementById('loginBtn')?.addEventListener('click', showLoginForm);
    document.getElementById('signupCountry')?.addEventListener('change', populateCities);
    document.getElementById('signupForm')?.addEventListener('submit', handleSignup);
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
}


