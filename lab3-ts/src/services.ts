import {Book, User, type IBook, type IUser} from "./models";
import {Library} from "./library";
import {StorageService} from "./storage";

const LS = {BOOKS: "lab.books", USERS: "lab.users"} as const;

export class DomainService{
    readonly books = new Library<IBook>();
    readonly users = new Library<IUser>();
    static readonly MAX_BORROWED = 3;

    private getUserBorrowedCount(userId: string): number {
        return this.books.findBy("borrowedBy", userId).length;
    }

    private normalizeCounters(): void {
        this.users.getAll().forEach(u => {
            const real = this.getUserBorrowedCount(u.id);
            if (u.borrowedCount !== real) {
                u.borrowedCount = real;
                this.users.upsert(u);
            }
        });
        this.persist();
    }

    constructor(private readonly storage = new StorageService()) {
        this.storage.load<IBook[]>(LS.BOOKS, []).forEach(b => this.books.add(b));
        this.storage.load<IUser[]>(LS.USERS, []).forEach(u => {
            if (typeof u.borrowedCount !== "number" || Number.isNaN(u.borrowedCount)) u.borrowedCount = 0;
            this.users.add(u);
        });
        this.normalizeCounters();
    }

    private persist(): void{
        this.storage.save(LS.BOOKS, this.books.getAll())
        this.storage.save(LS.USERS, this.users.getAll())
    }

    //CRUD
    addBook(book: Book): void {
        this.books.add(book.toJSON());
        this.persist();
    }

    addUser(user: User): void {
        this.users.add(user.toJSON());
        this.persist();
    }


    borrowBook(bookId: string, userId: string): "OK" | string {
        const uid = String(userId);

        const b = this.books.getById(bookId);
        if (!b) return "Книгу не знайдено.";
        if (b.borrowedBy) return "Книга вже позичена.";

        const u = this.users.getById(uid);
        if (!u) return "Користувача не знайдено.";

        // Рахуємо скільки реально позичено цим юзером
        const current = this.books.getAll().filter(x => String(x.borrowedBy) === uid).length;
        if (current >= 3) return "Ліміт: користувач може мати не більше 3-х книг.";

        // Позичаємо
        b.borrowedBy = uid;
        this.books.upsert(b);

        // Кеш лічильника — для відображення
        u.borrowedCount = current + 1;
        this.users.upsert(u);

        this.persist();
        return "OK";
    }


    returnBook(bookId: string): "OK" | string {
        const b = this.books.getById(bookId);
        if (!b) return "Книгу не знайдено.";
        if (!b.borrowedBy) return "Книга вже вільна.";

        const userId = b.borrowedBy;
        b.borrowedBy = undefined;
        this.books.upsert(b);

        const u = this.users.getById(userId);
        if (u) {
            u.borrowedCount = this.getUserBorrowedCount(userId);
            this.users.upsert(u);
        }

        this.persist();
        return "OK";
    }
}