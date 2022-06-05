export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  //Публичный метод возврата объекта с данными пользователя
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._jobSelector.textContent,
    };
  }

  //Публичный метод установки аватара на странице
  setUserAvatar(data) {
    this._avatarSelector.src = data.avatar;
  }

  //Публичный метод добавления новых данных пользователя на страницу
  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._jobSelector.textContent = data.about;
    this.setUserAvatar(data);
    this._avatarSelector.alt = `${data.name} аватар`;
  }
}
