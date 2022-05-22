import { body } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Публичный метод открытия popup
  open() {
    this._popup.classList.add("popup_opened");
    this._lockBody();
    document.addEventListener("keydown", this._handleEscClose);
  }

  //Публичный метод закрытия popup
  close() {
    this._popup.classList.remove("popup_opened");
    this._unlockBody();
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //Функция блокировки body при открытии popup
  _lockBody() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector(".root").offsetWidth + "px";
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("root_popup-open");
  }

  //Функция разблокировки body при открытии popup
  _unlockBody() {
    body.style.paddingRight = "0px";
    body.classList.remove("root_popup-open");
  }

  //Приватный метод закрытия popup по ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Добавление слушателей для закрытия popup при клике по Close и Overlay
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}
