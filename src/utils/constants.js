//Переменные
const body = document.querySelector('.root');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const buttonOpenEditProfilePopup = document.querySelector('.profile__button-edit');
const buttonAddCardPopup = document.querySelector('.profile__button-add-elements');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formEditProfile = popupEditProfile.querySelector('.popup__form_edit');
const formAddCard = popupAddCard.querySelector('.popup__form_add');
const popupViewPhoto = document.querySelector('.popup_type_photo');
const popupNameField = popupEditProfile.querySelector('.popup__name');
const popupJobField = popupEditProfile.querySelector('.popup__job');
const cardList = '.cards';

//Объект с селекторами информации о пользователе
const userSelectorObject = {
  nameSelector: profileName,
  jobSelector: profileJob
}

//Объект настроек с селекторами и классами формы
const objForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Массив карточек для первоначальной отрисовки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
  body,
  popupEditProfile,
  popupAddCard,
  buttonOpenEditProfilePopup,
  buttonAddCardPopup,
  profileName,
  profileJob,
  formEditProfile,
  formAddCard,
  popupViewPhoto,
  popupNameField,
  popupJobField,
  cardList,
  objForm,
  initialCards,
  userSelectorObject
};
