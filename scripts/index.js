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

//Задаём переменные
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');
const openPopupEdit = document.querySelector('.profile__button-edit');
const openPopupAdd = document.querySelector('.profile__button-add-elements');
const closePopupEdit = popupEdit.querySelector('.popup__close');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const closePopupPhoto = popupPhoto.querySelector('.popup-photo__close');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElementEdit = popupEdit.querySelector('.popup__form-edit');
const formElementAdd = popupAdd.querySelector('.popup__form-add');
const editName = popupEdit.querySelector('.popup__name');
const editJob = popupEdit.querySelector('.popup__job');
const addImageTitle = popupAdd.querySelector('.popup__image-title');
const addImageLink = popupAdd.querySelector('.popup__image-link');
const photoZoom = popupPhoto.querySelector('.popup-photo__image');
const photoCaption = popupPhoto.querySelector('.popup-photo__caption')
const cardList = document.querySelector('.cards');

//Создание карточек и добавление событий
function createNewCard(place, link) {
  const card = document.querySelector('.cards-template').content.firstElementChild.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  card.querySelector('.card__title').textContent = place;
  cardImage.src = link;
  cardImage.alt = place;
  card.querySelector('.card__trash').addEventListener('click', removeCard);
  card.querySelector('.card__like').addEventListener('click', addLike);
  cardImage.addEventListener('click', function () {
    openPopupPhoto(place, link);
  });
  return card;
}

//Первоначальное добавление шести карточек из массива
initialCards.forEach(initCard => cardList.prepend(createNewCard(initCard.name, initCard.link)));

//Добавление новой карточки
function addNewCard() {
  const newCard = [];
  newCard.name = addImageTitle.value;
  newCard.link = addImageLink.value;
  const card = createNewCard(newCard.name, newCard.link);
  cardList.prepend(card);
}

//Функция открытия окна просмотра фотографии
function openPopupPhoto(place, link) {
  photoZoom.src = link;
  photoCaption.textContent = place;
  openPopup(popupPhoto);
}

//Функция закрытия окна просмотра фотографии
closePopupPhoto.addEventListener('click', function () {
  closePopup(popupPhoto);
})

//Присвоение значений полей input из profile
function inputsValuesFromProfile() {
  editName.value = profileName.textContent;
  editJob.value = profileJob.textContent;
}

//Присвоение textContent profile из input
function profileValuesFromInput() {
  profileName.textContent = editName.value;
  profileJob.textContent = editJob.value;
}

//Обработчик события при нажатии клавиши ESC
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//Обработчик для закрытия при клике на оверлей
const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup__container') ||
    (evt.target.classList.contains('popup-photo__container'))) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Функция удаления карточек
function removeCard(evt) {
  const item = evt.currentTarget.closest('.card');
  item.remove();
}

//Функция добавления - удаления лайка
function addLike(evt) {
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

//Функция открыть popup для редактирования профиля
openPopupEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  inputsValuesFromProfile();
});

// Функция закрыть popup для редактирования профиля
closePopupEdit.addEventListener('click', function () {
  closePopup(popupEdit);
});

// Обработчик «отправки» формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileValuesFromInput();
  closePopup(popupEdit);
}

// Прикрепляем обработчик редактирования профиля к форме:
formElementEdit.addEventListener('submit', formSubmitHandler);

//Функция открыть popup для добавления карточки
openPopupAdd.addEventListener('click', function () {
  openPopup(popupAdd);
})

//Функция закрыть popup для добавления карточки
closePopupAdd.addEventListener('click', function () {
  closePopup(popupAdd);
})

// Обработчик «отправки» формы добавления карточки
function formCreateHandler(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAdd);
  evt.target.reset();
}

// Прикрепляем обработчик добавления карточки к форме:
formElementAdd.addEventListener('submit', formCreateHandler);
