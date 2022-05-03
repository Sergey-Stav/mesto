export default class FormValidator {
  constructor(objForm, formElement) {
    this._objForm = objForm;
    this._form = formElement;
  }

//Публичный метод валидации формы
enableValidation () {
  this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form);
  };

//Приватный метод показать элемент ошибки в input
_showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._objForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._objForm.errorClass);
};

//Приватный метод элемент ошибки в input
_hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._objForm.inputErrorClass);
  errorElement.classList.remove(this._objForm.errorClass);
  errorElement.textContent = '';
};

//Приватный метод проверки наличия хотя бы одного невалидного поля
_hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Приватный метод переключения отображения кнопки формы
_toggleButtonState (inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._objForm.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(this._objForm.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//Приватный метод проверки поля на валидность
_checkValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(formElement, inputElement);
  }
};

//Добавление обработчиков полям формы
_setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(this._objForm.inputSelector));
  const buttonElement = formElement.querySelector(this._objForm.submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkValid(formElement, inputElement)
      this._toggleButtonState(inputList, buttonElement);
    });
  });
};

}
