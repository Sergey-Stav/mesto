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
  formUpdateAvatar,
  popupConfirmDelete,
  popupViewPhoto,
  popupAvatarUpdate,
  cardList,
  objForm,
  userSelectorObject,
  cardSettings,
  updateAvatarButtonElement,
} from "../utils/constants.js";
import PopupWithConfirm from "../components/PopupWithConfirm";

let userId = null;

//Создание экземпляра класса UserInfo, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo(userSelectorObject);

//Создание экземпляра класса Section для отрисовки элементов на странице
const defaultCardList = new Section(
  {
    renderer: (data) => {
      const newCard = createNewCard(data);
      const cardElement = newCard.generateCard();
      newCard.updateLikesView(data);
      defaultCardList.addItem(cardElement);
    },
  },
  cardList
);

//Создание экземпляра класса Api для работы проекта с сервером
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "74040f11-910e-4c55-acf1-dcb990a8b9e9",
    "Content-Type": "application/json",
  },
});

//Первоначальная отрисовка страницы
api
  .getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    userId = userData._id;
    userInfo.setUserInfo(userData);
    defaultCardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

//Создание экземпляра класса PopupWithConfirm для подтверждения удаления карточки
const popupWithConfirm = new PopupWithConfirm(popupConfirmDelete);
popupWithConfirm.setEventListeners();

//Создание экземпляра класса PopupWithImage для просмотра картинки
const popupWithImage = new PopupWithImage(popupViewPhoto);
popupWithImage.setEventListeners();

//Функция создания новой карточки
const createNewCard = (data) => {
  const card = new Card(data, "#cards-template", cardSettings, userId, {
    handleCardClick: (data) => {
      popupWithImage.open(data);
    },
    handleDeleteClick: () => {
      popupWithConfirm.open();
      popupWithConfirm.setSubmitHandler({
        submitHandler: () => {
          popupWithConfirm.renderLoading({
            isLoading: true,
          });
          api
            .deleteCard(data)
            .then(() => {
              popupWithConfirm.close();
              card.deleteCard();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              popupWithConfirm.renderLoading({
                isLoading: false,
              });
            });
        },
      });
    },
    setLike: (data) => {
      api
        .setLike(data)
        .then((data) => {
          card.updateLikesView(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLike: (data) => {
      api
        .deleteLike(data)
        .then((data) => {
          card.updateLikesView(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return card;
};

//Создание экземпляра класса PopupWithForm для добавления карточки
const popupFormAddCard = new PopupWithForm(popupAddCard, {
  callbackSubmit: (data) => {
    popupFormAddCard.renderLoading({
      isLoading: true,
    });
    api
      .addCard(data)
      .then((res) => {
        const newCard = createNewCard(res);
        const cardElement = newCard.generateCard();
        defaultCardList.addItem(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormAddCard.renderLoading({
          isLoading: false,
          originalTextOnButton: "Создать",
        });
        popupFormAddCard.close();
      });
  },
});

//Добавление слушателя форме добавления карточки
popupFormAddCard.setEventListeners();

//Создание экземпляра класса PopupWithForm для редактирования профиля
const popupFormEditProfile = new PopupWithForm(popupEditProfile, {
  callbackSubmit: (data) => {
    popupFormEditProfile.renderLoading({
      isLoading: true,
    });
    api
      .setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormEditProfile.renderLoading({
          isLoading: false,
        });
        popupFormEditProfile.close();
      });
  },
});

//Добавление слушателя форме редактирования профиля
popupFormEditProfile.setEventListeners();

//Создание экземпляра класса PopupWithForm для редактирования аватара пользователя
const popupUpdateAvatar = new PopupWithForm(popupAvatarUpdate, {
  callbackSubmit: (data) => {
    popupUpdateAvatar.renderLoading({
      isLoading: true,
    });
    api
      .setUserAvatar(data.avatar_link)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading({
          isLoading: false,
        });
        popupUpdateAvatar.close();
      });
  },
});

//Добавление слушателя форме редактирования аватара
popupUpdateAvatar.setEventListeners();

//Включение валидации формы редактирования профиля
const formProfileValidate = new FormValidator(objForm, formEditProfile);
formProfileValidate.enableValidation();

//Включение валидации формы добавления карточки
const formAddCardValidate = new FormValidator(objForm, formAddCard);
formAddCardValidate.enableValidation();

//Включение валидации формы редактирования аватара
const formUpdateAvatarValidate = new FormValidator(objForm, formUpdateAvatar);
formUpdateAvatarValidate.enableValidation();

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

//Добавление обработчика Submit формы редактирования аватара
updateAvatarButtonElement.addEventListener("click", () => {
  formUpdateAvatarValidate.clearError();
  formUpdateAvatarValidate.toggleButtonState();
  popupUpdateAvatar.open();
});
