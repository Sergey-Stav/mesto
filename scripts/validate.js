const objForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция проверки валидации всех форм на странице
const enableValidation = (form) => {
  const formList = Array.from(document.querySelectorAll(form.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, form);
  });
};

//Функция показать элемент ошибки в input
const showInputError = (formElement, inputElement, errorMessage, form) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(form.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(form.errorClass);
};

//Функция скрыть элемент ошибки в input
const hideInputError = (formElement, inputElement, form) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(form.inputErrorClass);
  errorElement.classList.remove(form.errorClass);
  errorElement.textContent = '';
};

//Функция проверки наличия хотя бы одного невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Функция переключения отображения кнопки формы
const toggleButtonState = (inputList, buttonElement, form) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(form.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(form.inactiveButtonClass);
  }
};

//Функция проверки поля на валидность
const checkValid = (formElement, inputElement, form) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, form);
  } else {
    hideInputError(formElement, inputElement, form);
  }
};

//Функция добавления обработчиков полям формы
const setEventListeners = (formElement, form) => {
  const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
  const buttonElement = formElement.querySelector(form.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, form);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValid(formElement, inputElement, form)
      toggleButtonState(inputList, buttonElement, form);
    });
  });
};

enableValidation(objForm);
