//Переменные
const body = document.querySelector(".root");
const popupEditProfile = ".popup_type_edit";
const popupAddCard = ".popup_type_add";
const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__button-edit"
);
const buttonAddCardPopup = document.querySelector(
  ".profile__button-add-elements"
);
const formEditProfile = document.querySelector(".popup__form_edit");
const formAddCard = document.querySelector(".popup__form_add");
const popupConfirmDelete ='.popup_type_confirm';
const popupViewPhoto = ".popup_type_photo";
const popupNameField = document.querySelector(".popup__name");
const popupJobField = document.querySelector(".popup__job");
const cardList = ".cards";

const cardSettings = {
  cardImageSelector: ".card__image",
  cardTitleSelector: ".card__title",
  cardLikeSelector: ".card__like-button",
  cardTitleSelector: ".card__title",
  cardLikeCountSelector: ".card__like-counter",
  cardDeleteButtonSelector: ".card__trash",
  cardLikeActiveClass: "card__like-button_active"
}

//Объект с селекторами информации о пользователе
const userSelectorObject = {
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar"
};

//Объект настроек с селекторами и классами формы
const objForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Массив карточек для первоначальной отрисовки
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export {
  body,
  popupEditProfile,
  popupAddCard,
  buttonOpenEditProfilePopup,
  buttonAddCardPopup,
  formEditProfile,
  formAddCard,
  popupConfirmDelete,
  popupViewPhoto,
  popupNameField,
  popupJobField,
  cardList,
  objForm,
  initialCards,
  userSelectorObject,
  cardSettings
};
