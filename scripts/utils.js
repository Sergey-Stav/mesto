
import { bodyLock, closeByEsc, closeByOverlay } from "./index.js";
export { openPopup, popupViewPhoto, photoZoom, photoCaption };

const popupViewPhoto = document.querySelector('.popup_type_photo');
const photoZoom = popupViewPhoto.querySelector('.popup__image');
const photoCaption = popupViewPhoto.querySelector('.popup__caption')

//Функция открыть popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  bodyLock();
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('mousedown', closeByOverlay);
}


