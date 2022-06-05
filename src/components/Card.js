export default class Card {
  constructor(
    data,
    cardSelector,
    settings,
    ownerId,
    { handleCardClick, handleDeleteClick, setLike, deleteLike }
  ) {
    this._data = data;
    this._likes = data.likes;
    this._settings = settings;
    this._ownerId = ownerId;
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

  //Метод удаления лайка
  _dislike(data) {
    this._removeLikedClass();
    this._deleteLike(data);
  }

  //Метод добавления лайка
  _like(data) {
    this._addLikedClass();
    this._setLike(data);
  }

  //Метод удаления класса лайка
  _removeLikedClass() {
    this._likeButton.classList.remove(this._settings.cardLikeActiveClass);
  }

  //Метод добавления класса лайка
  _addLikedClass() {
    this._likeButton.classList.add(this._settings.cardLikeActiveClass);
  }

  //Метод добавления количества лайков на карточках
  setLikeCount(data) {
    this._cardLikeCount.textContent = String(data.likes.length);
  }

  //Метод удаления значка корзины на карточках других пользователей
  _checkIsOwnCard() {
    if (this._data.owner._id !== this._ownerId) {
      this._deleteElem(this._cardDeleteButton);
    }
  }

  //Метод добавления своих лайков карточкам при загрузке
  _checkLikedState() {
    this._data.likes.forEach((likeOwner) => {
      if (likeOwner._id === this._ownerId) {
        this._addLikedClass();
      }
    });
  }

  //Добавление слушателей событий для данного класса
  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
    this._card
      .querySelector(this._settings.cardLikeSelector)
      .addEventListener("click", () => {
        if (
          this._likeButton.classList.contains(
            this._settings.cardLikeActiveClass
          )
        ) {
          this._dislike(this._data);
        } else {
          this._like(this._data);
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
    this.setLikeCount(this._data);
    this._setEventListeners();
    this._checkIsOwnCard();
    this._checkLikedState();
    return this._card;
  }
}
