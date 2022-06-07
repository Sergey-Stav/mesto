import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  //Добавление функции обработки submit
  setSubmitHandler({ submitHandler }) {
    this._submitHandler = submitHandler;
  }

  //Приватный метод подтверждения удаления карточки по нажатию Enter
  _handleKeyDownClose(evt) {
    super._handleKeyDownClose(evt);
    if (evt.key === "Enter") {
      this._submitHandler();
    }
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
