setInterval(showTime, 1000);

function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    document.getElementById("hours").textContent = hour;
    document.getElementById("minutes").textContent = min;
    document.getElementById("seconds").textContent = sec;
}
showTime();

let countdownInterval;
function startCountdown(){
    clearInterval(countdownInterval);
    const input = document.getElementById("countdown-input").value;
    const target = new Date(input);

    countdownInterval = setInterval(() => {
        const now = new Date();
        const difference  = target - now;

        if (difference < 0) {
            document.getElementById("countdown").textContent = 'Час вийшов!';
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60 )) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);


        document.getElementById('countdown').textContent =
            `${days} днів ${hours} годин ${minutes} хвилин ${seconds} секунд`;
    }, 1000);
}

//3
const monthPicker = document.getElementById('monthPicker');
const monthYear = document.getElementById('monthYear');
const calendar = document.getElementById('calendar');

const monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень',
    'Травень', 'Червень', 'Липень', 'Серпень',
    'Вересень', 'Жовтень', 'Листопад', 'Грудень'
];

function showCalendar(year, month) {
    calendar.innerHTML = '';

    monthYear.textContent = `${monthNames[month]} ${year}`;

    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
    days.forEach(d => {
        const div = document.createElement('div');
        div.textContent = d;
        div.className = 'day header';
        calendar.appendChild(div);
    });

    const firstDay = new Date(year, month, 1);
    const start = (firstDay.getDay() + 6) % 7; // Пн = 0

    for (let i = 0; i < start; i++) {
        const empty = document.createElement('div');
        empty.className = 'day';
        calendar.appendChild(empty);
    }

    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= lastDay; d++) {
        const day = document.createElement('div');
        day.textContent = d;
        day.className = 'day';
        calendar.appendChild(day);
    }
}

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
monthPicker.value = `${year}-${String(month + 1).padStart(2, '0')}`;

showCalendar(year, month);

monthPicker.addEventListener('change', () => {
    const [y, m] = monthPicker.value.split('-').map(Number);
    showCalendar(y, m - 1);
});


//4
const birthdayInput = document.getElementById('birthday');
const result = document.getElementById('result');
let timer = null;

birthdayInput.addEventListener('change', () => {
    clearInterval(timer);
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
});

function updateCountdown() {
    const today = new Date();
    const birthDate = new Date(birthdayInput.value);

    if (isNaN(birthDate)) {
        result.textContent = 'Будь ласка, виберіть дату!';
        return;
    }

    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    let diff = nextBirthday - today;

    let totalSeconds = Math.floor(diff / 1000);
    let seconds = totalSeconds % 60;
    let totalMinutes = Math.floor(totalSeconds / 60);
    let minutes = totalMinutes % 60;
    let totalHours = Math.floor(totalMinutes / 60);
    let hours = totalHours % 24;
    let totalDays = Math.floor(totalHours / 24);

    let months = Math.floor(totalDays / 30);
    let days = totalDays % 30;

    result.textContent = `До дня народження залишилось: ${months} місяців, ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд.`;
}
