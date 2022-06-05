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
const formUpdateAvatar = document.querySelector(".popup__update-avatar");
const popupConfirmDelete = ".popup_type_confirm";
const popupViewPhoto = ".popup_type_photo";
const popupNameField = document.querySelector(".popup__name");
const popupJobField = document.querySelector(".popup__job");
const popupAvatarUpdate = ".popup_type_update-avatar";
const updateAvatarButtonElement = document.querySelector(
  ".profile__avatar-button-edit"
);
const cardList = ".cards";

//Объект с селекторами классов элементов карточки
const cardSettings = {
  cardImageSelector: ".card__image",
  cardTitleSelector: ".card__title",
  cardLikeSelector: ".card__like-button",
  cardTitleSelector: ".card__title",
  cardLikeCountSelector: ".card__like-counter",
  cardDeleteButtonSelector: ".card__trash",
  cardLikeActiveClass: "card__like-button_active",
};

//Объект с селекторами информации о пользователе
const userSelectorObject = {
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
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

export {
  body,
  popupEditProfile,
  popupAddCard,
  buttonOpenEditProfilePopup,
  buttonAddCardPopup,
  formEditProfile,
  formAddCard,
  formUpdateAvatar,
  popupConfirmDelete,
  popupViewPhoto,
  popupNameField,
  popupJobField,
  cardList,
  objForm,
  userSelectorObject,
  cardSettings,
  updateAvatarButtonElement,
  popupAvatarUpdate,
};
