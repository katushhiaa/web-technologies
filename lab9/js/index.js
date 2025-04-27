function showSignup(){
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupBtn').classList.add('active');
    document.getElementById('loginBtn').classList.remove('active');
}

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginBtn').classList.add('active');
    document.getElementById('signupBtn').classList.remove('active');
}

function togglePassword(id, iconElement) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        iconElement.textContent = '🫣';
    } else {
        input.type = "password";
        iconElement.textContent = '👁️';
    }
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+380\d{9}$/;
    return re.test(phone);
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function populateCities() {
    const citySelect = document.getElementById('signupCity');
    const countrySelect = document.getElementById('signupCountry');
    const selectedCountry = countrySelect.value;
    citySelect.innerHTML = '<option value="">Select city</option>';

    if (selectedCountry === 'Ukraine') {
        citySelect.innerHTML += '<option value="Kyiv">Kyiv</option><option value="Lviv">Lviv</option><option value="Odesa">Odesa</option>';
    } else if (selectedCountry === 'Poland') {
        citySelect.innerHTML += '<option value="Warsaw">Warsaw</option><option value="Krakow">Krakow</option>';
    } else if (selectedCountry === 'Germany') {
        citySelect.innerHTML += '<option value="Berlin">Berlin</option><option value="Munich">Munich</option>';
    }

    citySelect.disabled = selectedCountry === '';
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    const firstName = document.getElementById('signupFirstName');
    const lastName = document.getElementById('signupLastName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('signupConfirmPassword');
    const phone = document.getElementById('signupPhone');
    const birthDate = document.getElementById('signupBirthDate');
    const sexMale = document.getElementById('male');
    const sexFemale = document.getElementById('female');
    const country = document.getElementById('signupCountry');
    const city = document.getElementById('signupCity');

    document.querySelectorAll('.error-text').forEach(e => e.textContent = '');
    document.querySelectorAll('input, select').forEach(e => {
        e.classList.remove('is-valid', 'is-invalid');
        const icon = document.getElementById(e.id + 'Icon');
        if (icon) icon.textContent = '';
    });

    if (firstName.value.length < 3 || firstName.value.length > 15) {
        setError(firstName, 'Name must be between 3 and 15 characters.');
        isValid = false;
    } else {
        setSuccess(firstName);
    }

    if (lastName.value.length < 3 || lastName.value.length > 15) {
        setError(lastName, 'Name must be between 3 and 15 characters.');
        isValid = false;
    } else {
        setSuccess(lastName);
    }

    if (!validateEmail(email.value)) {
        setError(email, 'Enter a valid email.');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (password.value.length < 6) {
        setError(password, 'Password must be at least 6 characters.');
        isValid = false;
    } else {
        setSuccess(password);
    }

    if (confirmPassword.value !== password.value) {
        setError(confirmPassword, 'Passwords do not match.');
        isValid = false;
    } else {
        setSuccess(confirmPassword);
    }

    if (!validatePhone(phone.value)) {
        setError(phone, 'Phone must start with +380 and have 12 digits.');
        isValid = false;
    } else {
        setSuccess(phone);
    }

    if (!birthDate.value || calculateAge(birthDate.value) < 12) {
        setError(birthDate, 'Invalid birth date.');
        isValid = false;
    } else {
        setSuccess(birthDate);
    }

    if (!sexMale.checked && !sexFemale.checked) {
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

    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        this.reset();
        document.getElementById('signupCity').disabled = true;

        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    const username = document.getElementById('loginUsername');
    const password = document.getElementById('loginPassword');

    document.getElementById('loginUsernameError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';
    username.classList.remove('is-valid', 'is-invalid');
    password.classList.remove('is-valid', 'is-invalid');

    if (username.value.trim() === '') {
        username.classList.add('is-invalid');
        document.getElementById('loginUsernameError').textContent = 'Username is required.';
        isValid = false;
    } else {
        username.classList.add('is-valid');
    }

    if (password.value.trim() === '') {
        password.classList.add('is-invalid');
        document.getElementById('loginPasswordError').textContent = 'Password is required.';
        isValid = false;
    } else if (password.value.length < 6) {
        password.classList.add('is-invalid');
        document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters.';
        isValid = false;
    } else {
        password.classList.add('is-valid');
    }

    if (isValid) {
        alert('Login successful! 🎉');
        this.reset();
    }
});


function setError(input, message) {
    input.classList.add('is-invalid');
    const icon = document.getElementById(input.id + 'Icon');
    if (icon) icon.textContent = '❌';
    const error = document.getElementById(input.id + 'Error');
    if (error) {
        error.textContent = message;
        error.className = 'error-text';
    }
}

function setSuccess(input) {
    input.classList.add('is-valid');
    const icon = document.getElementById(input.id + 'Icon');
    if (icon) icon.textContent = '✅';
    const error = document.getElementById(input.id + 'Error');
    if (error) {
        error.textContent = 'Looks good!';
        error.className = 'success-text';
    }
}
