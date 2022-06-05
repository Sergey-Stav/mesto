export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //Метод обработки ответа от сервера
  _handleResponseOfServer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  //Метод получения информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод получения карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод загрузки первоначальной информации с сервера на страницу
  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  //Метод отправки на сервер новых данных пользователя
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponseOfServer);
  }

  //Метод отправки новой карточки на сервер
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponseOfServer);
  }

  //Метод удаления карточки на сервере
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод добавления лайка
  setLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод удаления лайка
  deleteLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод отправки нового аватара на сервер
  setUserAvatar(avatar_link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar_link,
      }),
    }).then(this._handleResponseOfServer);
  }
}
