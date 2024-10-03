const dialog = document.querySelector("dialog");

document.querySelector(".new-book").addEventListener("click", () => dialog.showModal());

const library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        if (status === "READ")
            return `${this.title} by ${this.author}, ${this.pages} pages, read`;
        else if (status === "NOT READ")
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        else  
            return `${this.title} by ${this.author}, ${this.pages} pages, currently reading`;
    };
}