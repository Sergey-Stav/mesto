import { body } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleKeyDownClose = this._handleKeyDownClose.bind(this);
  }

  //Публичный метод открытия popup
  open() {
    this._popup.classList.add("popup_opened");
    this._lockBody();
    document.addEventListener("keydown", this._handleKeyDownClose);
  }

  //Публичный метод закрытия popup
  close() {
    this._popup.classList.remove("popup_opened");
    this._unlockBody();
    document.removeEventListener("keydown", this._handleKeyDownClose);
  }

  //Публичный метод установки текста кнопки popup
  setButtonName(btnName) {
    this._popup.querySelector(".popup__button").textContent = btnName;
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

  //Приватный метод для обработки нажатия клавиш
  _handleKeyDownClose(evt) {
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
