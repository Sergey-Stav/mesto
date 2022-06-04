export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick, setLike, deleteLike }, cardSelector, settings) {
    this._data = data;
    this._likes = data.likes;
    this._settings = settings;
    this._ownerId = data.ownerId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
  }

  //Получение разметки из HTML и клонирование элемента
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild
      .cloneNode(true);
  }

  deleteCard() {
    this._deleteElem(this._element);
  }

  _deleteElem(elem) {
    elem.remove();
    elem = null;
  }

  _dislike(data) {
    this._toggleLike();//!evt
    this._deleteLike(data);
  }

  _like(data) {
    this._toggleLike();//!evt
    this._setLike(data);
  }

  // _removeLikedClass() {
  //   this._likeButton.classList.remove(this._settings.cardLikeActiveClass);
  // }

  // _addLikedClass() {
  //   this._likeButton.classList.add(this._settings.cardLikeActiveClass);
  // }

  setLikeCount(data) {
    this._photoLikeCount.textContent = String(data.likes.length);
  }

  _checkIsOwnCard() {
    if (this._data.owner._id !== this._ownerId) {
      this._deleteElem(this._cardDeleteButton);
    }
  }

  // _checkLikedState() {
  //   this._data.likes.forEach((likeOwner) => {
  //     if (likeOwner._id === this._ownerId) {
  //       this._addLikedClass();
  //     }
  //   })
  // }

//Приватный метод обработки лайка
  _toggleLike() {
    // this._likeButton = this._card.querySelector(this._settings.cardLikeSelector);
    this._likeButton.classList.toggle(this._settings.cardLikeActiveClass);
  }

  //Добавление слушателей событий для данного класса
  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data.name, this._data.link);
    });
    this._card.querySelector(this._settings.cardLikeSelector).addEventListener("click", () => {
      this._toggleLike();
    });
    this._card
      .querySelector(this._settings.cardDeleteButtonSelector)
      .addEventListener("click", this.handleDeleteClick);

  }


  //Публичный метод для наполнения содержимым и возврата карточки
  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector(this._settings.cardTitleSelector).textContent = this._data.name;
    this._cardImage = this._card.querySelector(this._settings.cardImageSelector);
    this._cardImage.alt = `Фотография ${this._data.name}`;
    this._cardImage.src = this._data.link;
    this._likeButton = this._card.querySelector(this._settings.cardLikeSelector);
    this._cardLikeCount = this._card.querySelector(this._settings.cardLikeCountSelector);
    this._cardDeleteButton = this._card.querySelector(this._settings.cardDeleteButtonSelector);
    this._card.setAttribute('id', `a${this._data._id}`);//!a?
    // this.setLikeCount(this._data);
    this._setEventListeners();
    // this._checkIsOwnCard();
    return this._card;
  }







  //Приватный метод удаления карточки
  _removeCard() {
    this._card.remove();
    this._card = null;
  }


}
