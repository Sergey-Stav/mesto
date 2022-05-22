export default class FormValidator {
  constructor(objForm, formElement) {
    this._objForm = objForm;
    this._form = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(this._objForm.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      this._objForm.submitButtonSelector
    );
  }

  //Публичный метод валидации формы
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form);
  }

  //Приватный метод показать элемент ошибки в input
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._objForm.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._objForm.errorClass);
  }

  //Приватный метод элемент ошибки в input
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._objForm.inputErrorClass);
    errorElement.classList.remove(this._objForm.errorClass);
    errorElement.textContent = "";
  }

  //Приватный метод проверки наличия хотя бы одного невалидного поля
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Приватный метод проверки поля на валидность
  _checkValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Публичный метод переключения отображения кнопки формы
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._objForm.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._objForm.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  //Публичный метод очистки ошибки и подчеркивания input
  clearError() {
    this._inputList.forEach((element) => {
      this._hideInputError(element);
    });
  }

  //Добавление обработчиков полям формы
  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValid(inputElement);
        this.toggleButtonState();
      });
    });
  }
}
