/*
Завдання 1 – робота з className та classList
1. Напишіть програму, яка моделює включення та виключення лампочки за
допомогою кліків на кнопку. При кліку на кнопку "Включити", зображення
лампочки має змінювати свій стан на ввімкнено, і навпаки.
2. Реалізуйте можливість вибору типу лампочки (наприклад, звичайна лампочка,
енергозберігаюча лампочка, світлодіодна лампочка) із наступним включенням та
виключенням.
3. Додайте можливість змінювати яскравість лампочки (якщо це можливо для
вибраного типу лампочки) через введення користувачем значень через prompt.
4. Створіть можливість автоматичного вимкнення лампочки через певний час
бездіяльності користувача (наприклад, через 5 хвилин).
*/

const bulb = document.querySelector(".bulb");
const button = document.getElementById("turn_on_button");
const bulbType = document.getElementById("bulbType");
let isOn = true;

function turnOnBulb() {
    button.addEventListener('click', () => {
        isOn = !isOn;
        if (isOn) {
            bulb.classList.remove('off');
            button.textContent = 'Вимкнути';
        } else {
            bulb.classList.add('off');
            button.textContent = 'Увімкнути';
        }
    });

    button.textContent = 'Вимкнути';
}

function changeTypeOfBulb() {
    const bulbTypes = [
        { value: '', text: 'Оберіть тип', disabled: true },
        { value: 'simpleBulb', text: 'Звичайна лампочка' },
        { value: 'economyBulb', text: 'Енергозберігаюча лампочка' },
        { value: 'ledBulb', text: 'Світлодіодна лампочка' },
    ];

    bulbTypes.forEach((type) => {
        const option = document.createElement("option");
        option.value = type.value;
        option.text = type.text;
        if (type.disabled) {
            option.disabled = true;
            option.selected = true;
        }
        bulbType.appendChild(option);
    });

    bulbType.addEventListener("change", (e) => {
        bulb.classList.remove('simpleBulb', 'economyBulb', 'ledBulb');

        const selectedType = e.target.value;
        if (selectedType) {
            bulb.classList.add(selectedType);
        }
    });
}

function changeBrightnessOfBulb() {
    const brightness = document.getElementById("change_brightness");
    brightness.addEventListener("click", () => {
        const currentType = bulbType.value;
        if (currentType === "economyBulb" || currentType === "ledBulb") {
            let brightness = prompt("Введіть яскравість від 0 до 100:", "50")
            brightness = Number(brightness);

            if(isNaN(brightness) || brightness < 0 || brightness > 500)  {
                alert("Введіть правильне значення від 0 до 100!");
                return;
            }
            const blur = brightness * 0.4;
            bulb.style.boxShadow = brightness === 0
                ? "none"
                : `0 0 ${blur}px rgba(255, 255, 0, 0.7)`;
        } else {
            alert("Цей тип лампочки не підтримує зміну яскравості.");
        }
    })

}


let inactivityTimeout;

function startInactivityTimer(){
    clearTimeout(inactivityTimeout);

    inactivityTimeout = setTimeout(()=>{
        bulb.classList.add('off');
        button.textContent = 'Увімкнути';
        isOn = false;
        alert("Лампочка вимкнулась через неактивність.");
    }, 10000)
}

startInactivityTimer();
turnOnBulb();
changeTypeOfBulb();
changeBrightnessOfBulb()

document.addEventListener('click', startInactivityTimer);
document.addEventListener('keydown', startInactivityTimer);
document.addEventListener('mousemove', startInactivityTimer);

