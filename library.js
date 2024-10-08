const dialog = document.querySelector("dialog");
const books = document.querySelector(".books-container");
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
        books.innerHTML = "";
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
    for (let i = 0; i < library.length; i++) {
        let bookCard = document.createElement("div");
        let statusOptions = document.createElement("div");
        let newBook = document.createElement("div");
        let bookTitle = document.createElement("div");
        let bookAuthor = document.createElement("div");
        let bookPages = document.createElement("div");
        let bookStatus = document.createElement("div");
        let bookOptions = document.createElement("div");
        let changeStatus = document.createElement("button");
        let removeBook = document.createElement("button");
        let uList = document.createElement("ul");
        let option1 = document.createElement("li");
        let option2 = document.createElement("li");
        let option3 = document.createElement("li");
        option1.innerHTML = "READ";
        option2.innerHTML = "NOT READ";
        option3.innerHTML = "READING";
        bookCard.setAttribute("class", "book-card");
        statusOptions.setAttribute("class", "status-options");
        statusOptions.setAttribute("style", "display: none");
        newBook.setAttribute("class", "book");
        newBook.setAttribute("data-index", i);
        bookTitle.setAttribute("class", "book-title");
        bookAuthor.setAttribute("class", "book-author");
        bookPages.setAttribute("class", "book-pages");
        bookStatus.setAttribute("class", "book-status");
        bookOptions.setAttribute("class", "book-options");
        changeStatus.setAttribute("class", "change-status");
        removeBook.setAttribute("class", "remove-book");
        bookTitle.innerHTML = `Title: ${library[i].title}`;
        bookAuthor.innerHTML = `Author: ${library[i].author}`;
        bookPages.innerHTML = `Number of pages: ${library[i].pages}`;
        bookStatus.innerHTML = `Status: ${library[i].status}`;
        changeStatus.innerHTML = "CHANGE STATUS";
        removeBook.innerHTML = "REMOVE";
        uList.appendChild(option1);
        uList.appendChild(option2);
        uList.appendChild(option3);
        statusOptions.appendChild(uList);
        bookOptions.appendChild(changeStatus);
        bookOptions.appendChild(removeBook);
        newBook.appendChild(bookTitle);
        newBook.appendChild(bookAuthor);
        newBook.appendChild(bookPages);
        newBook.appendChild(bookStatus);
        newBook.appendChild(bookOptions);
        removeBook.addEventListener("click", () => {
            library.splice(i, 1);
            books.innerHTML = "";
            showBooks();
        });
        changeStatus.addEventListener("click", () => {
            if (statusOptions.style.display === "none")
                statusOptions.removeAttribute("style");
            else
                statusOptions.setAttribute("style", "display: none");
        });
        option1.addEventListener("click", () => {
            library[i].status = option1.innerHTML;
            statusOptions.setAttribute("style", "display: none");
            books.innerHTML = "";
            showBooks();
        });
        option2.addEventListener("click", () => {
            library[i].status = option2.innerHTML;
            statusOptions.setAttribute("style", "display: none");
            books.innerHTML = "";
            showBooks();
        });
        option3.addEventListener("click", () => {
            library[i].status = option3.innerHTML;
            statusOptions.setAttribute("style", "display: none");
            books.innerHTML = "";
            showBooks();
        });
        bookCard.appendChild(newBook);
        bookCard.appendChild(statusOptions);
        books.appendChild(bookCard);
    }
}