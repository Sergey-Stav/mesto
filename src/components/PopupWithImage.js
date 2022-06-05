import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupTitle = this._popup.querySelector(".popup__caption");
  }

  //Публичный метод открытия popup с картинкой
  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = `Фотография ${data.name}`;
    this._popupTitle.textContent = data.name;
    super.open();
  }
}
