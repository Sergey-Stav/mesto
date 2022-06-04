import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import {
  popupEditProfile,
  popupAddCard,
  buttonOpenEditProfilePopup,
  buttonAddCardPopup,
  formEditProfile,
  formAddCard,
  popupConfirmDelete,
  popupViewPhoto,
  cardList,
  objForm,
  initialCards,
  userSelectorObject,
  cardSettings
} from "../utils/constants.js";
import PopupWithConfirm from "../components/PopupWithConfirm";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '74040f11-910e-4c55-acf1-dcb990a8b9e9',
    'Content-Type': 'application/json'
  }
});



const popupDeleteConfirm = new PopupWithConfirm(popupConfirmDelete);
popupDeleteConfirm.setEventListeners();


//Создание экземпляра класса PopupWithImage для просмотра картинки
const popupWithImage = new PopupWithImage(popupViewPhoto);
popupWithImage.setEventListeners();

//Функция создания новой карточки
const createNewCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
    },
    "#cards-template", cardSettings
  );
  const cardElement = card.generateCard();
  return cardElement;
};

//Создание экземпляра класса Section для отрисовки элементов на странице
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = createNewCard(item);
      defaultCardList.addItem(newCard);
    },
  },
  cardList
);

//Отрисовка карточек на странице
defaultCardList.renderItems();

//Создание экземпляра класса PopupWithForm для добавления карточки
const popupFormAddCard = new PopupWithForm(popupAddCard, {
  callbackSubmit: (data) => {
    const cardFromPopup = createNewCard(data);
    defaultCardList.addItem(cardFromPopup);
    popupFormAddCard.close();
  },
});

//Добавление слушателя форме добавления карточки
popupFormAddCard.setEventListeners();

//Создание экземпляра класса UserInfo, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo(userSelectorObject);

//Создание экземпляра класса PopupWithForm для редактирования профиля
const popupFormEditProfile = new PopupWithForm(popupEditProfile, {
  callbackSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupFormEditProfile.close();
  },
});

//Добавление слушателя форме редактирования профиля
popupFormEditProfile.setEventListeners();

//Включение валидации формы редактирования профиля
const formProfileValidate = new FormValidator(objForm, formEditProfile);
formProfileValidate.enableValidation();

//Включение валидации формы добавления карточки
const formAddCardValidate = new FormValidator(objForm, formAddCard);
formAddCardValidate.enableValidation();

//Добавление обработчика Submit формы добавления карточки
buttonAddCardPopup.addEventListener("click", () => {
  formAddCardValidate.clearError();
  popupFormAddCard.open();
  formAddCardValidate.toggleButtonState();
});

//Добавление обработчика Submit формы редактирования профиля
buttonOpenEditProfilePopup.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupFormEditProfile.setInputValues(userData);
  formProfileValidate.toggleButtonState();
  formProfileValidate.clearError();
  popupFormEditProfile.open();
});
