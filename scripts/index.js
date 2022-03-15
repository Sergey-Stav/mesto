//Задаём переменные
let popupElement = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeButton = popupElement.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__content');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');

//Функция присвоения значений полей input из profile
function inputsValueFromProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//Функция присвоения textContent profile из input
function profileValuesFromInput() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

//Обработчик события при нажатии клавиши ESC
const ESC_KEY = "Escape";
function onDocumentKeyDown(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

//Обработчик для закрытия при клике на оверлей
function closeByOverlay(event) {
  if (event.target.classList.contains('popup__container')) {
    closePopup();
  }
}

//Функция открыть popup
function openPopup() {
  inputsValueFromProfile();
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', onDocumentKeyDown);
}

//Функция закрыть popup
function closePopup() {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

//Назначаем события при нажатии кнопок edit и close
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileValuesFromInput();
  closePopup();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', formSubmitHandler);


