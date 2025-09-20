"use strict";
class Book {
    constructor(title, author, pageNumbers) {
        this.isBorrowed = false;
        this.title = title;
        this.author = author;
        this.pageNumbers = pageNumbers;
    }
    borrow() {
        if (!this.pageNumbers) {
            this.isBorrowed = true;
            console.log(`Book "${this.title}" has been borrowed.`);
        }
        else {
            console.log(`Book "${this.title}" is already borrowed.`);
        }
    }
}
class Magazine {
    constructor(title, author, issueNumber) {
        this.isBorrowed = false;
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
    }
    borrow() {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`Magazine "${this.title}" has been borrowed.`);
        }
        else {
            console.log(`Magazine "${this.title}" is already borrowed.`);
        }
    }
}
class DVD {
    constructor(title, author, duration) {
        this.isBorrowed = false;
        this.title = title;
        this.author = author;
        this.duration = duration;
    }
    borrow() {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`DVD "${this.title}" has been borrowed.`);
        }
        else {
            console.log(`DVD "${this.title}" is already borrowed.`);
        }
    }
}
class Library {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    findItemByName(name) {
        return this.items.find(item => item.title === name);
    }
    listAvailableItems() {
        console.log("Available items:");
        for (const item of this.items) {
            if (!item.isBorrowed) {
                console.log(`- ${item.title} by ${item.author}`);
            }
        }
    }
}
const library = new Library();
const book1 = new Book("A Good Girls Guide To Murder", "Holly Jackson", 450);
const book2 = new Book("Five Survive", "Holly Jackson", 550);
const magazine1 = new Magazine("National Geographic", "Various", 202);
const dvd1 = new DVD("Inception", "Christopher Nolan", 148);
library.addItem(book1);
library.addItem(book2);
library.addItem(magazine1);
library.addItem(dvd1);
library.listAvailableItems();
book1.borrow();
dvd1.borrow();
library.listAvailableItems();
const found = library.findItemByName("A Good Girls Guide To Murder");
if (found) {
    console.log(`Found: ${found.title} by ${found.author}`);
}
//# sourceMappingURL=task6.js.map