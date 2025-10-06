import {Book, User} from "./models";
import {DomainService} from "./services";
import {applyErrors, validateBook, validateUser, digitsOnly} from "./validation";
import {ModalService} from "./modal";

const svc = new DomainService();
const modals = new ModalService();

declare global { interface Window { app?: any } }
window.app = { svc, modals };
console.debug("[app] ready", { bootstrap: !!(window as any).bootstrap });

const bookForm = document.getElementById("bookForm") as HTMLFormElement;
const userForm = document.getElementById("userForm") as HTMLFormElement;
const bookList = document.getElementById("bookList")!;
const userList = document.getElementById("userList")!;

function uid(): string{
    return Date.now().toString();
}

function render() {
    bookList.innerHTML = "";
    svc.books.getAll().forEach(b => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        const status = b.borrowedBy ? `<span class="badge bg-warning text-dark me-3">Позичено</span>` : "";
        li.innerHTML = `
      <div>
        <div class="fw-semibold">${b.title}</div>
        <div class="text-muted small">${b.author} (${b.year})</div>
      </div>
      <div class="d-flex align-items-center">
        ${status}
        <button class="btn btn-sm ${b.borrowedBy ? "btn-warning" : "btn-primary"} action-btn">
          ${b.borrowedBy ? "Повернути" : "Позичити"}
        </button>
      </div>`;
        li.querySelector<HTMLButtonElement>(".action-btn")!.onclick = async () => {
            try {
                if (!b.borrowedBy) {
                    const userId = await modals.prompt("Введіть ID користувача для позичення книги:");
                    if (!userId) return;
                    if (!digitsOnly.test(userId)) { await modals.info("Помилка", "ID має містити лише цифри."); return; }

                    const current = svc.books.getAll().filter(x => x.borrowedBy === userId).length; // без findBy — максимально прямолінійно
                    console.log("[limit-check]", { userId, current, max: 3, books: svc.books.getAll() });
                    if (current >= 3) {
                        try { await modals.info("Не вдалося", "Ліміт: користувач може мати не більше 3-х книг."); }
                        catch { alert("Ліміт: користувач може мати не більше 3-х книг."); }
                        return;
                    }
                    const res = svc.borrowBook(b.id, userId);
                    if (res === "OK") {
                        const u = svc.users.getById(userId)!;
                        await modals.info("Успіх",
                            `<strong>${b.title}</strong> було позичено користувачем <strong>${u.id} ${u.name}</strong> (${u.email}).`,
                            "Зрозуміло!");
                    } else {
                        try { await modals.info("Не вдалося", res); }
                        catch { alert(res); }
                    }
                } else {
                    const res = svc.returnBook(b.id);
                    if (res === "OK") {
                        await modals.info("Повернення", `<strong>${b.title}</strong> повернуто.`, "Закрити");
                    } else {
                        try { await modals.info("Помилка", res); }
                        catch { alert(res); }
                    }
                }
            } catch (err) {
                console.error(err);
                try { await modals.info("Помилка", "Сталася неочікувана помилка. Спробуйте ще раз."); }
                catch { alert("Сталася неочікувана помилка. Спробуйте ще раз."); }
            }
            render();
        };
        bookList.appendChild(li);
    });

    userList.innerHTML = "";
    svc.users.getAll().forEach(u => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${u.id} ${u.name} (${u.email})`;
        userList.appendChild(li);
    });
}

bookForm.addEventListener("submit", e => {
    e.preventDefault();
    const errs = validateBook(bookForm);
    applyErrors(bookForm, errs);
    if (errs.length) return;

    const title = (document.getElementById("bookTitle") as HTMLInputElement).value.trim();
    const author = (document.getElementById("bookAuthor") as HTMLInputElement).value.trim();
    const year = parseInt((document.getElementById("bookYear") as HTMLInputElement).value.trim(), 10);

    const book = new Book(uid(), title, author, year);
    svc.addBook(book);
    bookForm.reset();
    render();
});

userForm.addEventListener("submit", e => {
    e.preventDefault();
    const errs = validateUser(userForm);
    applyErrors(userForm, errs);
    if (errs.length) return;

    const id = (document.getElementById("userId") as HTMLInputElement).value.trim();
    const name = (document.getElementById("userName") as HTMLInputElement).value.trim();
    const email = (document.getElementById("userEmail") as HTMLInputElement).value.trim();

    const user = new User(id, name, email);
    svc.addUser(user);
    userForm.reset();
    render();
});

document.addEventListener("DOMContentLoaded", render);