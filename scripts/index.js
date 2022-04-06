//Задаём переменные
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupViewPhoto = document.querySelector('.popup_type_photo');
const buttonOpenEditProfilePopup = document.querySelector('.profile__button-edit');
const buttonAddCardPopup = document.querySelector('.profile__button-add-elements');
const buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__close');
const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__close');
const buttonCloseViewPhotoPopup = popupViewPhoto.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formEditProfile = popupEditProfile.querySelector('.popup__form-edit');
const formAddCard = popupAddCard.querySelector('.popup__form-add');
const popupNameField = popupEditProfile.querySelector('.popup__name');
const popupJobField = popupEditProfile.querySelector('.popup__job');
const imageTitle = popupAddCard.querySelector('.popup__image-title');
const imageLink = popupAddCard.querySelector('.popup__image-link');
const photoZoom = popupViewPhoto.querySelector('.popup__image');
const photoCaption = popupViewPhoto.querySelector('.popup__caption')
const cardList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards-template').content;

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

//Функция открытия окна просмотра фотографии
function openPopupPhoto(item) {
  photoZoom.src = item.link;
  photoCaption.textContent = item.name;
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

//Функция удаления карточек
function removeCard(evt) {
  evt.currentTarget.closest('.card').remove();
}

//Функция добавления - удаления лайка
function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

//Функция открыть popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlay);
}

//Функция закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByOverlay);
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
  evt.target.reset();
}

//Обработчик закрыть окно просмотра фотографии
buttonCloseViewPhotoPopup.addEventListener('click', function () {
  closePopup(popupViewPhoto);
})

//Обработчик события при нажатии клавиши ESC
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//Обработчик для закрытия при клике на оверлей
const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup__container')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Обработчик открыть popup для редактирования профиля
buttonOpenEditProfilePopup.addEventListener('click', function () {
  setInputValuesFromProfile();
  openPopup(popupEditProfile);
});

//Обработчик закрыть popup для редактирования профиля
buttonCloseEditProfilePopup.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

//Обработчик открыть popup для добавления карточки
buttonAddCardPopup.addEventListener('click', function () {
  openPopup(popupAddCard);
})

//Обработчик закрыть popup для добавления карточки
buttonCloseAddCardPopup.addEventListener('click', function () {
  closePopup(popupAddCard);
})

// Прикрепляем обработчик редактирования профиля к форме:
formEditProfile.addEventListener('submit', submitFormEditProfile);

// Прикрепляем обработчик добавления карточки к форме:
formAddCard.addEventListener('submit', submitFormAddCard);
