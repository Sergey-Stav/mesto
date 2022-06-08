import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackSubmit }) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._popupBtn = this._popup.querySelector(".popup__button");
  }

  //Метод уведомления пользователя о процессе сохранения данных
  renderLoading = ({ isLoading, originalTextOnButton = "Сохранить" }) => {
    if (isLoading) {
      this._popupBtn.textContent = "Сохранение...";
    } else {
      this._popupBtn.textContent = originalTextOnButton;
    }
  };

  //Приватный метод получения данных всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //Добавление слушателю родительского класса обработчика Submit формы
  setEventListeners = () => {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.dataFromInputs = this._getInputValues();
      this._callbackSubmit(this.dataFromInputs);
    });
  };

  //Публичный метод получения вставки данных пользователя в input
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  //Добавление методу закрытия popup родительского класса form reset
  close() {
    super.close();
    this._formElement.reset();
  }
}
