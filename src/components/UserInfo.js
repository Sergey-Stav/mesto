export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  //Публичный метод возврата объекта с данными пользователя
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent
    }
  }

  //Публичный метод добавления новых данных пользователя на страницу
  setUserInfo({ name, job }) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
  }

}
