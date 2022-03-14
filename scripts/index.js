//Задаём переменные
let popupElement = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeButton = popupElement.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let saveButton = popupElement.querySelector('.popup__button-save')
let formElement = document.querySelector('.popup__content');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');

//Добавляем обработчик события при нажатии клавиши ESC
const ESC_KEY = "Escape";
function onDocumentKeyDown (event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

//Добавляем обработчик для закрытия по оверлею
function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup__container')) {
    closePopup();
  }
}

//Функция открыть popup
function openPopup() {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', onDocumentKeyDown);
  nameInput.value = profileName.innerText;
  jobInput.value = profileJob.innerText;
}

//Функция закрыть popup
function closePopup() {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

//Назначаем события при нажатии кнопок edit close и save
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', closePopup);


// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault();
// Получаем значение полей jobInput и nameInput из свойства value
  let nameInputForm = nameInput.value;
  let jobInputForm = jobInput.value;
// Вставляем новые значения с помощью textContent
  profileName.textContent = nameInputForm;
  profileJob.textContent = jobInputForm;
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', formSubmitHandler);


