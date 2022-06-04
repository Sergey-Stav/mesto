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

let tempCard = null;
let ownerId = null;

//Создание экземпляра класса UserInfo, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo(userSelectorObject);

//Создание экземпляра класса Section для отрисовки элементов на странице
const defaultCardList = new Section(
  {
    // items: initialCards,
    renderer: (data) => {
      const newCard = createNewCard(data);
      const cardElement = newCard.generateCard();
      newCard.setLikeCount(data);
      defaultCardList.addItem(cardElement);
    },
  },
  cardList
);

//Отрисовка карточек на странице
// defaultCardList.renderItems();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '74040f11-910e-4c55-acf1-dcb990a8b9e9',
    'Content-Type': 'application/json'
  }
});


api.getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    ownerId = userData._id;
    userInfo.setUserInfo(userData);
    defaultCardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })


const popupWithConfirm = new PopupWithConfirm(popupConfirmDelete);
popupWithConfirm.setEventListeners();


//Создание экземпляра класса PopupWithImage для просмотра картинки
const popupWithImage = new PopupWithImage(popupViewPhoto);
popupWithImage.setEventListeners();

//Функция создания новой карточки
const createNewCard = (data) => {
  const card = new Card(data, "#cards-template", cardSettings, ownerId, {
    handleCardClick: (data) => {
      photoPopup.open(data);
    },
    handleDeleteCardClick: () => {
      tempCard = card;
      popupWithConfirm.open(data);
    },
    setLike: (data) => {
      api.setLike(data)
        .then((data) => {
          card.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteLike: (data) => {
      api.deleteLike(data)
        .then((data) => {
          card.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
  });
  return card;
}


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
