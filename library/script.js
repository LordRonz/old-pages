let myLib = localStorage.getItem("myLib") ? JSON.parse(localStorage.getItem("myLib")) : [];

const bookDisplay = document.getElementById("book-display");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const addBtn = document.getElementById("button-add");

function populateStorage() {
    localStorage.setItem("myLib", JSON.stringify(myLib));
}

function Book(title, author, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.info = ()=>{
        console.log(this.title, this.author, this.pages, this.read);
    }
}

function addBookToLib() {
    let book = new Book(title.value, author.value, pages.value, read.checked);
    myLib.push(book);
    renderBooks();
    populateStorage();
}

function delBookFromLib(ele) {
    let index = Number(ele.id.slice(4));
    myLib.splice(index, 1);
    renderBooks();
    populateStorage();
}

function toggleRead(ele) {
    let index = Number(ele.id.slice(4));
    console.log(myLib[index].read);
    myLib[index].read = !myLib[index].read;
    populateStorage();
}

function clear() {
    while(bookDisplay.firstChild) {
        bookDisplay.removeChild(bookDisplay.firstChild);
    }
}

function renderBooks() {
    clear();
    myLib.forEach((book, i)=>{
        makeBookDiv(book, i);
    });
}

function makeBookDiv(book, ith) {
    let bookDiv = document.createElement('div');
    let title = document.createElement('div');
    let author = document.createElement('div');
    let pages = document.createElement('div');
    let read = document.createElement('button');
    let delBtn = document.createElement('button');
    title.textContent = book.title;
    author.textContent = "By: " + book.author;
    pages.textContent = book.pages + " Pages";
    read.textContent = book.read ? "Read" : "Not Read";
    delBtn.textContent = "Delete";
    bookDiv.appendChild(title).className = "book-title";
    bookDiv.appendChild(author).className = "book-author";
    bookDiv.appendChild(pages).className = "book-pages";
    read.className = read.textContent === "Read" ? "book-read" : "book-read btn-red";
    bookDiv.appendChild(read);
    bookDiv.appendChild(delBtn).className = "book-delete btn-red";
    bookDiv.id = "book" + ith;
    read.addEventListener('click', function(e){
        toggleRead(this.parentNode);
        this.textContent = this.textContent === "Read" ? "Not Read" : "Read";
        this.className = this.textContent === "Read" ? "book-read" : "book-read btn-red";
    });
    delBtn.addEventListener('click', function(e) {
        delBookFromLib(this.parentNode);
    });
    bookDisplay.appendChild(bookDiv).className = "a-book";
    return bookDiv;
}

addBtn.addEventListener('click', e=>{
    if(title.value.length === 0) {
        alert("Invalid title !");
        return;
    }
    if(author.value.length === 0) {
        alert("Invalid author!");
        return;
    }
    let n = pages.value;
    if(n.length === 0) {
        alert("Invalid pages!");
        return;
    }
    if(+n !== +n) {
        alert("Invalid pages!");
        return;
    }
    if(Number(n) < 1) {
        alert("Pages cannot be less than zero!");
        return;
    }
    let i = 0
    for(; i < n.length && n[i] === '0'; ++i);
    pages.value = n.slice(i);
    addBookToLib();
});
renderBooks();