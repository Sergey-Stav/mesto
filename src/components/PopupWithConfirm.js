import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  //Добавление функции обработки сабмита
  setSubmitHandler({ submitHandler }) {
    this._submitHandler = submitHandler;
  }

  //Добавления слушателей данному классу
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }
}
