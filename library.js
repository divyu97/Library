const dialog = document.querySelector("dialog");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let status = document.querySelector("#status");

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

function addBookToLibrary() {
    if (title.value === "")
        alert("Title field can't be empty");
    else if (author.value === "")
        alert("Author field can't be empty");
    else if (pages.value === "" || Number(pages.value) === 0)
        alert("Invalid number of pages");
    else if (status.value === "Select Status")
        alert("Please select status of the book");
    else {
        const book = new Book(title.value, author.value, Number(pages.value), status.value);
        library.push(book);
        title.value = "";
        author.value = "";
        pages.value = "";
        status.value = "Select Status";
        dialog.close();
        showBooks();
    }   
}

document.querySelector(".add-book").addEventListener("click", addBookToLibrary);
document.querySelector(".cancel").addEventListener("click", () => {
    title.value = "";
    author.value = "";
    pages.value = "";
    status.value = "Select Status";
    dialog.close();
});

function showBooks() {
    for (book of library) {
        let newBook = document.createElement("div");
        let bookTitle = document.createElement("div");
        let bookAuthor = document.createElement("div");
        let bookPages = document.createElement("div");
        let bookStatus = document.createElement("div");
        let bookOptions = document.createElement("div");
        let changeStatus = document.createElement("button");
        let removeBook = document.createElement("button");
        newBook.setAttribute("class", "book");
        newBook.setAttribute("data-index", library.indexOf(book));
        bookTitle.setAttribute("class", "book-title");
        bookAuthor.setAttribute("class", "book-author");
        bookPages.setAttribute("class", "book-pages");
        bookStatus.setAttribute("class", "book-status");
        bookOptions.setAttribute("class", "book-options");
        changeStatus.setAttribute("class", "change-status");
        removeBook.setAttribute("class", "remove-book");
        bookTitle.innerHTML = `Title: ${book.title}`;
        bookAuthor.innerHTML = `Author: ${book.author}`;
        bookPages.innerHTML = `Number of pages: ${book.pages}`;
        bookStatus.innerHTML = `Status: ${book.status}`;
        changeStatus.innerHTML = "CHANGE STATUS";
        removeBook.innerHTML = "REMOVE";
        bookOptions.appendChild(changeStatus);
        bookOptions.appendChild(removeBook);
        newBook.appendChild(bookTitle);
        newBook.appendChild(bookAuthor);
        newBook.appendChild(bookPages);
        newBook.appendChild(bookStatus);
        newBook.appendChild(bookOptions);
        document.querySelector(".books-container").appendChild(newBook);
    }
}