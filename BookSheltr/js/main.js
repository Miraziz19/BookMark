"use strict";
//   selecting html items

const elTemplate = document.querySelector(".template").content;
const elList = document.querySelector(".list");
const result = document.querySelector(".results");
const input = document.querySelector(".inp-search");
const bookMark = document.querySelector(".bookmarkz");
const modal = document.querySelector(".modal");
const logout = document.querySelector(".logout");

let search = "panda";
const bokmarkArr = [];

const nams = document.querySelector(".book-title");

bookMark.addEventListener("click", function (evt) {
  if (evt.target.matches(".delateBooksBtn")) {
    const bookmarkDelateBtnId = evt.target.dataset.delateBookmarkBtnId;
    const foundBookmarkDelate = bokmarkArr.findIndex(
      (bookmark) => bookmark.id === bookmarkDelateBtnId
    );

    bokmarkArr.splice(foundBookmarkDelate, 1);
    bookMark.innerHTML = null;
    window.localStorage.setItem("bokmarkArr", JSON.stringify(bokmarkArr));
    renderBookmarks(bokmarkArr, bookMark);
  }
});

const renderBookmarks = function (err, htmlElement) {
  err.forEach((bookmark) => {
    const newItem = document.createElement("li");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h3");
    const newTxt = document.createElement("p");
    const newRead = document.createElement("a");
    const newRemoveBookmarkBtn = document.createElement("button");
    newTitle.textContent = bookmark.volumeInfo.title;
    newTxt.textContent = bookmark.volumeInfo.authors;

    newRead.href = bookmark.volumeInfo.previewLink;

    newItem.classList.add("delet");
    newTxt.classList.add("authors");
    newRead.classList.add("readd");
    newRemoveBookmarkBtn.classList.add("delateBooksBtn");
    newRemoveBookmarkBtn.dataset.delateBookmarkBtnId = bookmark.id;

    htmlElement.appendChild(newItem);
    newItem.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newTxt);
    newItem.appendChild(newRead);
    newItem.appendChild(newRemoveBookmarkBtn);
  });
};

const renderBooks = function (arr, element) {
  const booksFragment = document.createDocumentFragment();

  elList.innerHTML = null;
  elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".bookmark")) {
      const bookMarkBtnId = evt.target.dataset.boksBookmark;
      const foundBookmark = arr.find((kitob) => kitob.id === bookMarkBtnId);
      window.localStorage.setItem("bokmarkArr", JSON.stringify(bokmarkArr));
      if (!bokmarkArr.includes(foundBookmark)) {
        bokmarkArr.push(foundBookmark);

        bookMark.innerHTML = null;

        window.localStorage.setItem("bokmarkArr", JSON.stringify(bokmarkArr));
      }
      renderBookmarks(bokmarkArr, bookMark);
    }
  });

  arr.forEach((book) => {
    const clonedBookTemplate = elTemplate.cloneNode(true);

    clonedBookTemplate.querySelector(".book-img").src = book.volumeInfo.imageLinks.thumbnail;
    clonedBookTemplate.querySelector(".book-title").textContent = book.volumeInfo.title;
    clonedBookTemplate.querySelector(".avtor").textContent = book.volumeInfo.authors;
    clonedBookTemplate.querySelector(".book-date").textContent = book.volumeInfo.publishedDate;
    clonedBookTemplate.querySelector(".read").href = book.volumeInfo.previewLink;
    clonedBookTemplate.querySelector(".bookmark").dataset.boksBookmark = book.id;

    booksFragment.appendChild(clonedBookTemplate);
  });
  element.appendChild(booksFragment);
};

const getBook = async function () {
  const request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=12`
  );

  const data = await request.json();
  result.textContent = `Showing ${data.totalItems} Result(s)`;

  if (data.totalItems > 0) {
    console.log(data.items);

    renderBooks(data?.items, elList);
  }
};

getBook();

input.addEventListener("change", function () {
  const inputValue = input.value;
  search = inputValue;

  getBook();
});

// LOGINPAGE LOGOUT
const token = window.localStorage.getItem("token");
if (!token) {
  window.location.replace("login.html");
}
logout.addEventListener("click", function () {
  window.localStorage.removeItem("token");
  window.location.replace("login.html");
});

