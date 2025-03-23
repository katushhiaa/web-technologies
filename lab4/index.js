//1
let fruits = ["Яблуко", "Банан", "Апельсин", "Мандарин"];

fruits.pop()
console.log("1.1 ", fruits);

fruits.unshift("Ананас")
console.log("1.2 ",fruits);

fruits.sort().reverse();
console.log("1.3", fruits);

console.log("1.4 ",fruits.indexOf("Яблуко"));


//2
let colors = ["Червоний", "Зелений", "Синій", "Жовтий", "Помаранчевий"];

const shortestItem = colors.reduce((a,b) => a.length <= b.length ? a : b)
const longestItem = colors.reduce((a,b) => a.length >= b.length ? a : b)

console.log("2.2 Найкоротший елемент: ", shortestItem);
console.log("2.2 Найдовший елемент: ", longestItem);

colors = colors.filter(color => color.includes("Синій"));
console.log("2.3 Залишено тільки 'синій':", colors);

const result = colors.join(",")

console.log("2.5 ", result)

//3
let workers = [
    { name: "Олена", age: 28, position: "Менеджер" },
    { name: "Ігор", age: 35, position: "Розробник" },
    { name: "Катерина", age: 24, position: "Дизайнер" },
    { name: "Андрій", age: 42, position: "Тестувальник" },
    { name: "Марія", age: 30, position: "HR-менеджер" }
]

let sortedArray = workers.sort((a, b) => a.name.localeCompare(b.name));
console.log("3.2 Відсортовано за іменами:", sortedArray);

let findDeveloper = workers.filter(worker => worker.position.toLowerCase() === "розробник");
console.log("3.3 Розробники:", findDeveloper);

const updatedEmployees = workers.filter(emp => emp.age <= 40);
console.log("3.4 Після видалення працівників старших за 40:", updatedEmployees);

const newEmployee = { name: "Тетяна", age: 27, position: "Бізнес-аналітик" };
updatedEmployees.push(newEmployee);

console.log("3.5 Оновлений масив з новим працівником:", updatedEmployees);


//4
let students = [
    { name: "Олексій", age: 20, course: 2 },
    { name: "Марія", age: 22, course: 3 },
    { name: "Іван", age: 19, course: 1 },
    { name: "Андрій", age: 23, course: 4 }
];
console.log("4.1 Масив студентів:", students);

students = students.filter(student => student.name !== "Олексій");
console.log("4.2 Після видалення 'Олексія':", students);

const newStudent = { name: "Тетяна", age: 21, course: 2 };
students.push(newStudent);
console.log("4.3 Після додавання 'Тетяни':", students);

students.sort((a, b) => b.age - a.age);
console.log("4.4 Сортування за віком (від старших до молодших):", students);

const thirdCourseStudent = students.find(student => student.course === 3);
console.log("4.5 Студент на 3-му курсі:", thirdCourseStudent);


//5
let numbers = [2,4,5,7,10]
const squared = numbers.map(num => num**2);
console.log("5.1 Квадрати чисел:", squared);

const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("5.2 Парні числа:", evenNumbers);

const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("5.3 Сума чисел:", sum);

const additionalArray = [11, 12, 13, 14, 15];
numbers = numbers.concat(additionalArray);
console.log("5.4 Об'єднаний масив:", numbers);

numbers.splice(0, 3);
console.log("5.5 Масив після видалення перших 3 елементів:", numbers);

//6
function libraryManagement(){
    let books = [
        { title: "Посібник з убивства для хорошої дівчинки", author: "Джексон", genre: "Триллер", pages: 400, isAvailable: true },
        { title: "Тіні забутих предків", author: "Коцюбинський", genre: "Новела", pages: 150, isAvailable: false },
        { title: "Кобзар", author: "Шевченко", genre: "Поезія", pages: 300, isAvailable: true }
    ]

    function addBook(title, author, genre, pages) {
        books.push({ title, author, genre, pages, isAvailable: true });
    }

    function removeBookByTitle(title) {
        books = books.filter(book => book.title !== title);
    }

    function findBooksByAuthor(author) {
        return books.filter(book => book.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        const book = books.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }

    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        const totalBooks = books.length;
        const availableBooks = books.filter(book => book.isAvailable).length;
        const borrowedBooks = totalBooks - availableBooks;
        const avgPages = totalBooks > 0 ? Math.round(books.reduce((sum, book) => sum + book.pages, 0) / totalBooks) : 0;

        return {
            totalBooks,
            availableBooks,
            borrowedBooks,
            avgPages
        };
    }

    return {
        addBook,
        removeBookByTitle,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooksStatistics,
        getBooks: () => books
    };
}

const library = libraryManagement();

library.addBook("Лісова пісня", "Леся Українка", "Драма-феєрія", 180);
library.toggleBookAvailability("Кобзар", true); // взяли книгу
library.removeBookByTitle("Тіні забутих предків");
library.sortBooksByPages();

console.log("6 Поточні книги:", library.getBooks());
console.log("6 Статистика:", library.getBooksStatistics());
console.log("6 Книги Шевченка:", library.findBooksByAuthor("Шевченко"));

//7
let student = {
    name: "Артем",
    age: 20,
    course: 2
};
console.log("7.1 Початковий об'єкт:", student);

student.subjects = ["Математика", "Фізика", "Програмування"];
console.log("7.2 Після додавання предметів:", student);

delete student.age;
console.log("7.3 Після видалення 'age':", student);

console.log("7.4 Оновлений об'єкт студента:", student);
