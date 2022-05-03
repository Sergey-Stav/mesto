import { openPopup, popupViewPhoto, photoZoom, photoCaption } from "./index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  //Получение разметки из HTML и клонирование элемента
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  //Публичный метод для наполнения содержимым и возврата карточки
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._card.querySelector('.card__title').textContent = this._name;
    this._cardImage = this._card.querySelector('.card__image');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._card;
  }

  //Приватный метод обработки лайка
  _toggleLike(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  //Приватный метод удаления карточки
  _removeCard(evt) {
    evt.currentTarget.closest('.card').remove();
  }

  //Приватный метод открытия карточки картинки для просмотра
  _openPopupPhoto() {
    photoZoom.src = this._link;
    photoCaption.textContent = this._name;
    photoZoom.alt = this._name;
    openPopup(popupViewPhoto);
  }

  //Добавление слушателей событий для данного класса
  _setEventListeners() {
    this._card.querySelector('.card__like').addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    this._card.querySelector('.card__trash').addEventListener('click', (evt) => {
      this._removeCard(evt);
    });
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._openPopupPhoto();
    });
  }
}


