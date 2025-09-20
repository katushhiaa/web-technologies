interface LibraryItem{
    title: string
    author: string;
    isBorrowed: boolean;

    borrow(): void;
}

class Book implements LibraryItem{
    public title: string
    public author: string
    public isBorrowed: boolean = false;
    public pageNumbers: number

    constructor(title: string, author: string, pageNumbers: number) {
        this.title = title;
        this.author = author;
        this.pageNumbers = pageNumbers;
    }

    public borrow() {
        if (!this.pageNumbers) {
            this.isBorrowed = true;console.log(`Book "${this.title}" has been borrowed.`);
        } else {
            console.log(`Book "${this.title}" is already borrowed.`);
        }
    }
}

class Magazine implements LibraryItem {
    public title: string
    public author: string
    public isBorrowed: boolean = false;
    public issueNumber: number;

    constructor(title: string, author: string, issueNumber: number) {
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
    }

    public borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`Magazine "${this.title}" has been borrowed.`);
        } else {
            console.log(`Magazine "${this.title}" is already borrowed.`);
        }
    }
}

class DVD implements LibraryItem {
    public title: string
    public author: string
    public isBorrowed: boolean = false;
    public duration: number;

    constructor(title: string, author: string, duration: number) {
        this.title = title;
        this.author = author;
        this.duration = duration;
    }

    public borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`DVD "${this.title}" has been borrowed.`);
        } else {
            console.log(`DVD "${this.title}" is already borrowed.`);
        }
    }
}

class Library {
    private items: LibraryItem[] = [];

    addItem(item: LibraryItem): void {
        this.items.push(item);
    }

    findItemByName(name: string): LibraryItem | undefined {
        return this.items.find(item => item.title === name);
    }

    public listAvailableItems(): void{
        console.log("Available items:");
        for (const item of this.items) {
            if(!item.isBorrowed){
                console.log(`- ${item.title} by ${item.author}`);
            }
        }
    }
}

const library = new Library();

const book1 = new Book("A Good Girls Guide To Murder","Holly Jackson",450)
const book2 = new Book("Five Survive", "Holly Jackson",550)
const magazine1 = new Magazine("National Geographic", "Various", 202);
const dvd1 = new DVD("Inception", "Christopher Nolan", 148);

library.addItem(book1)
library.addItem(book2)
library.addItem(magazine1)
library.addItem(dvd1)

library.listAvailableItems()

book1.borrow()
dvd1.borrow()

library.listAvailableItems()

const found = library.findItemByName("A Good Girls Guide To Murder");
if (found) {
    console.log(`Found: ${found.title} by ${found.author}`);
}