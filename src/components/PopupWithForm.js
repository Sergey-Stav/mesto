import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { callbackSubmit }) {
    super(selector);
    this._callbackSubmit = callbackSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  //Приватный метод получения данных всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach (input => {
    this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //Добавление слушателю родительского класса обработчика Submit формы
    setEventListeners = () => {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    });
  }

  //Добавление методу закрытия popup родительского класса form reset
  close() {
    super.close();
    this._formElement.reset();
  }
}