import { createElement } from '../framework';

function createEventListTemplate() {
  return '<ul class="trip__list event-list"></ul>';
}

export default class EventListView {
  #element = null;

  _getTemplate() {
    return createEventListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this._getTemplate());
    }

    return this.#element;
  }

  getElement() {
    return this.element;
  }
}
