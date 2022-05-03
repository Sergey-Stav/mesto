import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup } from "./utils.js";

export { bodyLock, closeByEsc, closeByOverlay };

//Задаём переменные
const body = document.querySelector('.root');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const buttonOpenEditProfilePopup = document.querySelector('.profile__button-edit');
const buttonAddCardPopup = document.querySelector('.profile__button-add-elements');
const buttonList = document.querySelectorAll('.popup__button');
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formEditProfile = popupEditProfile.querySelector('.popup__form_edit');
const formAddCard = popupAddCard.querySelector('.popup__form_add');
const popupNameField = popupEditProfile.querySelector('.popup__name');
const popupJobField = popupEditProfile.querySelector('.popup__job');
const imageTitle = popupAddCard.querySelector('.popup__image-title');
const imageLink = popupAddCard.querySelector('.popup__image-link');
const cardList = document.querySelector('.cards');

//Объект настроек с селекторами и классами формы
const objForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Включение валидации формы редактирования профиля
const formProfileValidate = new FormValidator(objForm, formEditProfile);
formProfileValidate.enableValidation();

//Включение валидации формы добавления карточки
const formAddCardValidate = new FormValidator(objForm, formAddCard);
formAddCardValidate.enableValidation();

//Функция добавления карточки в начало контейнера
function renderCard(card, container) {
  container.prepend(card);
}

//Функция отрисовки карточек из исходного массива
initialCards.forEach(initCard => {
  const createdCard = new Card(initCard, '#cards-template');
  renderCard(createdCard.generateCard(), cardList);
});

//Функция добавления новой карточки
function addNewCard() {
  const newCard = {};
  newCard.name = imageTitle.value;
  newCard.link = imageLink.value;
  const card = new Card(newCard, '#cards-template');
  renderCard(card.generateCard(), cardList);
}

//Функция блокировки body при открытии popup
function bodyLock() {
  const LockPaddingValue = window.innerWidth - document.querySelector('.root').offsetWidth + 'px';
  body.style.paddingRight = LockPaddingValue;
  body.classList.add('root_popup-open');
}

//Функция разблокировки body при открытии popup
function bodyUnLock() {
  body.style.paddingRight = '0px';
  body.classList.remove('root_popup-open');
}

//Функция закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  bodyUnLock();
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('mousedown', closeByOverlay);
}

//Функция присвоения значений полей input из profile
function setInputValuesFromProfile() {
  popupNameField.value = profileName.textContent;
  popupJobField.value = profileJob.textContent;
}

//Функция присвоения textContent profile из input
function setProfileValuesFromInput() {
  profileName.textContent = popupNameField.value;
  profileJob.textContent = popupJobField.value;
}

//Функция «отправки» формы редактирования профиля
function submitFormEditProfile(evt) {
  evt.preventDefault();
  setProfileValuesFromInput();
  closePopup(popupEditProfile);
}

//Функция «отправки» формы добавления карточки
function submitFormAddCard(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAddCard);
}

//Обработчик события при нажатии клавиши ESC
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Обработчик для закрытия при клике на оверлей
const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

//Обработчик открыть popup для редактирования профиля
buttonOpenEditProfilePopup.addEventListener('click', function () {
  setInputValuesFromProfile();
  openPopup(popupEditProfile);
  formProfileValidate.clearError();
  formProfileValidate.toggleButtonState();
});

//Обработчик открыть popup для добавления карточки
buttonAddCardPopup.addEventListener('click', function () {
  imageTitle.value = "";
  imageLink.value = "";
  formAddCardValidate.clearError();
  formAddCardValidate.toggleButtonState();
  openPopup(popupAddCard);
});

//Обработчик закрыть popup при нажатии на Close
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

// Прикрепляем обработчик редактирования профиля к форме:
formEditProfile.addEventListener('submit', submitFormEditProfile);

// Прикрепляем обработчик добавления карточки к форме:
formAddCard.addEventListener('submit', submitFormAddCard);


