//Задаём переменные
const body = document.querySelector('.root');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupViewPhoto = document.querySelector('.popup_type_photo');
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
const photoZoom = popupViewPhoto.querySelector('.popup__image');
const photoCaption = popupViewPhoto.querySelector('.popup__caption')
const cardList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards-template').content;
const spanList = document.querySelectorAll('.popup__error');
const inputList = document.querySelectorAll('.popup__input');


//Функция удаления карточек
function removeCard(evt) {
  evt.currentTarget.closest('.card').remove();
}

//Функция отключения кнопки popup
function disabledButton() {
  buttonList.forEach((element) => {
    element.disabled = true;
    element.classList.add('popup__button_disabled');
  });
}

//Функция очистки ошибки и подчеркивания инпута.
function clearError() {
  spanList.forEach(element => element.textContent='');
  inputList.forEach(element => element.classList.remove('popup__input_type_error'));
}


//Функция добавления - удаления лайка
function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

//Создание карточек и добавление событий
function createNewCard(cardData) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  card.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__trash').addEventListener('click', removeCard);
  card.querySelector('.card__like').addEventListener('click', toggleLike);
  cardImage.addEventListener('click', function () {
    openPopupPhoto(cardData);
  });
  return card;
}

//Функция добавления карточки в начало контейнера
function renderCard(card, container) {
  container.prepend(card);
}

//Функция отрисовки карточек из исходного массива
initialCards.forEach(function (initCard) {
  const createdCard = createNewCard(initCard);
  renderCard(createdCard, cardList);
});

//Функция добавления новой карточки
function addNewCard() {
  const newCard = {};
  newCard.name = imageTitle.value;
  newCard.link = imageLink.value;
  const card = createNewCard(newCard);
  renderCard(card, cardList);
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

//Функция открыть popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  bodyLock();
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlay);
}

//Функция закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  bodyUnLock();
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByOverlay);
}

//Функция открытия окна просмотра фотографии
function openPopupPhoto(item) {
  photoZoom.src = item.link;
  photoCaption.textContent = item.name;
  photoZoom.alt = item.name;
  openPopup(popupViewPhoto);
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
  disabledButton();
  evt.target.reset();
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
  clearError();
});

//Обработчик открыть popup для добавления карточки
buttonAddCardPopup.addEventListener('click', function () {
  imageTitle.value = "";
  imageLink.value = "";
  clearError();
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
