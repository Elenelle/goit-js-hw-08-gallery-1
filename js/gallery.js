import images from "../gallery-items.js";

const imageList = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const closeModalBtn = document.querySelector(
  "button[data-action='close-lightbox']"
);
const lightboxContentImgRef = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay");
const itemsMarkup = createGalleryItemsMarkup(images);

// рендеринг разметки в документ
imageList.insertAdjacentHTML("beforeend", itemsMarkup);

// слушатели
imageList.addEventListener("click", onImgClick);
closeModalBtn.addEventListener("click", onCloseModal);
overlay.addEventListener("click", onBackdropClick);

// функция создания разметки
function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join("");
}

// функция фильтра кликов делегирования
function onImgClick(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }

  const url = e.target.dataset.source;

  e.preventDefault();
  onOpenModal();
  addLightboxContent(url);
}

// функиция открытия модалки
function onOpenModal() {
  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keydown", onEnterKeyPress);
  lightboxRef.classList.add("is-open");
}

// функция закрытия модалки
function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", onEnterKeyPress);
  lightboxRef.classList.remove("is-open");
}

// функция добавления url изображения в модалку
function addLightboxContent(url) {
  if (lightboxContentImgRef.src !== "") {
    lightboxContentImgRef.src = "";
  }
  lightboxContentImgRef.src = url;
}

// функция закрытия по оверлею
function onBackdropClick() {
  onCloseModal();
}

// функция закрытия по ESC
function onEscKeyPress(e) {
  const ESC_KEY_CODE = "Escape";
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

// открытие модалки по Enter
function onEnterKeyPress(e) {
  const ENTER_CODE = "Enter";
  if (e.code === ENTER_CODE) {
    onOpenModal();
  }
}
