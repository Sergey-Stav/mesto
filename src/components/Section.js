export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  //Публичный метод для отрисовки всех элементов
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  //Публичный метод для добавления элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
