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

// data.items.forEach((book) => {
//   nams.textContent = book.volumeInfo.title;
// });
// sjflakfdsFDFDFD*****************************************888
// const searchInput = document.querySelector(".header__search");
// const elCardList = document.querySelector(".card__list");
// const elCardTemplate = document.querySelector(".card-template").content;
// const elCounter = document.querySelector(".hero__counter");
// const elPrevBtn = document.querySelector(".page-btn__prev");
// const elNextBtn = document.querySelector(".page-btn__next");
// const elSortBtn = document.querySelector(".hero__sort-btn");
// const elMain = document.querySelector(".main");
// const modalOpen = document.querySelector(".card__more-info");
// const modalClose = document.querySelector(".modal__exit");
// const elModal = document.querySelector(".modal");
// const elOverlay = document.querySelector(".overlayy");

// // BOOKMARK VERIBLES
// const elBookmarkTemplate = document.querySelector(".bookmark-template").content;
// const elBookmarkList = document.querySelector(".bookmark__list");

// const API_KEY = "bb7f63a4";
// let search = "python";
// let page = 1;

// // CARDS RENDER FUNCTION FOR SHOWING EACH CARD
// const renderCards = function (arr, element) {
//   const cardsFragment = document.createDocumentFragment();
//   arr.forEach((cardItem) => {
//     const clonedCardTemplate = elCardTemplate.cloneNode(true);

//     clonedCardTemplate.querySelector(".card__img").src = cardItem.volumeInfo.imageLinks.thumbnail;
//     clonedCardTemplate.querySelector(".card__heading").textContent = cardItem.volumeInfo.title;
//     clonedCardTemplate.querySelector(".card__desc").textContent = cardItem.volumeInfo.publisher;
//     clonedCardTemplate.querySelector(".card__year").textContent = cardItem.volumeInfo.publishedDate;
//     clonedCardTemplate.querySelector(".card__read").href = cardItem.volumeInfo.previewLink;

//     cardsFragment.appendChild(clonedCardTemplate);
//   });

//   element.appendChild(cardsFragment);
// };

// // BOOKMARK RENDER FUNCTION

// const renderBookmark = function (arr, element) {
//   const bookmarkFragment = document.createDocumentFragment();
//   arr.forEach((bookmarkItem) => {
//     const clonedBookmarkTemplate = elBookmarkTemplate.cloneNode(true);

//     clonedBookmarkTemplate.querySelector(".bookmark__box-heading").textContent =
//       bookmarkItem.volumeInfo.title;
//     clonedBookmarkTemplate.querySelector(".bookmark__box-desc").textContent =
//       bookmarkItem.volumeInfo.publisher;
//     clonedBookmarkTemplate.querySelector(".bookmark__box-link").href =
//       bookmarkItem.volumeInfo.previewLink;

//     bookmarkFragment.appendChild(clonedBookmarkTemplate);
//   });
//   elCardList.addEventListener("click", function (evt) {
//     if (evt.target.matches(".card__btn-bookmark")) {
//       element.appendChild(bookmarkFragment);
//     }
//   });
// };

// // GET BOOK FUNCTION FOR GETTIN BOOKS FROM API
// let getBooks = async function () {
//   const response = await fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${page}`
//   );

//   try {
//     let data = await response.json();
//     (elCounter.textContent = data.totalItems), "1";

//     console.log(data.items);

//     renderCards(data.items, elCardList);
//     renderBookmark(data.items, elBookmarkList);
//   } catch (error) {
//     error;
//   }
// };

// getBooks();

// // PREV BUTTON FOR GOING TO PREVIOUS PAGE

// elPrevBtn.addEventListener("click", function () {
//   elCardList.innerHTML = null;
//   page = page - 10;
//   getBooks();
// });

// // NEXT BUTTON FOR GOING TO NEXT PAGE
// elNextBtn.addEventListener("click", function () {
//   elCardList.innerHTML = null;
//   page = page + 10;
//   getBooks();
// });

// // THIS IS THE BUTTON FOR LOGING OUT
// searchInput.addEventListener("change", function (evt) {
//   elCardList.innerHTML = null;
//   search = evt.target.value.trim();
//   getBooks();
// });

// // LOG OUT CODES
// const elLogoutBtn = document.querySelector(".header__logout");
// const localToken = window.localStorage.getItem("token");

// if (!localToken) {
//   window.location.replace("index.html");
// }

// elLogoutBtn.addEventListener("click", function () {
//   window.localStorage.removeItem("token");

//   window.location.replace("index.html");
// });

// // OPEN MODAL BUTTON

// elCardList.addEventListener("click", function (evt) {
//   if (evt.target.matches(".card__btn-desc")) {
//     elModal.classList.remove("hidden");
//     elOverlay.classList.add("overlay");
//   }
// });

// // CLOSE MODAL BUTTON

// modalClose.addEventListener("click", () => {
//   elModal.classList.add("hidden");
//   elOverlay.classList.remove("overlay");
// });
