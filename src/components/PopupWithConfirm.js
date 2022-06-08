import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._popupBtn = this._popup.querySelector(".popup__button");
  }

  //Метод уведомления пользователя о процессе удаления данных
  renderLoading = ({ isLoading }) => {
    if (isLoading) {
      this._popupBtn.textContent = "Удаление...";
    } else {
      this._popupBtn.textContent = "Да";
    }
  };

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
