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
        iconElement.innerHTML = '<svg style="\n' +
            '                    width: 25px;\n' +
            '                    height: 25px;">\n' +
            '                    <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 442.04 442.04" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203 c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219 c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367 c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021 c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212 c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071 c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"></path> </g> <g> <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188 c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993 c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5 s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"></path> </g> <g> <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"></path> </g> </g> </g></svg>\n' +
            '                </svg>';
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
        setError(birthDate, 'Invalid birth date or you need to be older then 12');
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
