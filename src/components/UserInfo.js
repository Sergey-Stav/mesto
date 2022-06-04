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
      job: this._jobSelector.textContent,
    };
  }

  
  setUserAvatar(data) {
    this._avatarSelector.src = data.avatar;
  }



  //Публичный метод добавления новых данных пользователя на страницу
  setUserInfo({ name, job }) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
    this._setUserAvatar(data);
    this._avatarSelector.alt = `${data.name} аватар`;
  }
}
