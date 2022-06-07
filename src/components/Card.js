export default class Card {
  constructor(
    data,
    cardSelector,
    settings,
    userId,
    { handleCardClick, handleDeleteClick, setLike, deleteLike }
  ) {
    this._setData(data);
    this._data = data;
    this._likes = data.likes;
    this._settings = settings;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
  }

  //Получение данных карточки
  _setData(data) {
    this._data = data;
    this._likes = data.likes;
  }

  //Получение разметки из HTML и клонирование элемента
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  //Метод удаления карточки
  deleteCard() {
    this._deleteElem(this._card);
  }

  //Метод удаления элемента
  _deleteElem(elem) {
    elem.remove();
    elem = null;
  }

  //Метод определения наличия своего лайка
  _isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  //Публичный метод обновления информации о лайках
  updateLikesView(data) {
    this._setData(data);
    this._cardLikeCount.textContent = this._likes.length;
    if (this._isLiked()) {
      this._likeButton.classList.add(this._settings.cardLikeActiveClass);
    } else {
      this._likeButton.classList.remove(this._settings.cardLikeActiveClass);
    }
  }

  //Метод удаления значка корзины на карточках других пользователей
  _checkIsOwnCard() {
    if (this._data.owner._id !== this._userId) {
      this._deleteElem(this._cardDeleteButton);
    }
  }

  //Добавление слушателей событий для данного класса
  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
    this._likeButton.addEventListener("click", () => {
      if (this._isLiked()) {
        this._deleteLike(this._data);
      } else {
        this._setLike(this._data);
      }
    });
    this._card
      .querySelector(this._settings.cardDeleteButtonSelector)
      .addEventListener("click", this._handleDeleteClick);
  }

  //Публичный метод для наполнения содержимым и возврата карточки
  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector(this._settings.cardTitleSelector).textContent =
      this._data.name;
    this._cardImage = this._card.querySelector(
      this._settings.cardImageSelector
    );
    this._cardImage.alt = `Фотография ${this._data.name}`;
    this._cardImage.src = this._data.link;
    this._likeButton = this._card.querySelector(
      this._settings.cardLikeSelector
    );
    this._cardLikeCount = this._card.querySelector(
      this._settings.cardLikeCountSelector
    );
    this._cardDeleteButton = this._card.querySelector(
      this._settings.cardDeleteButtonSelector
    );
    this._card.setAttribute("id", `${this._data._id}`);
    this._setEventListeners();
    this._checkIsOwnCard();

    return this._card;
  }
}
