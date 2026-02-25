import { createElement } from '../framework';

function createAddEventButtonTemplate() {
  return '<button class="trip-header__add-button button button--accent button--size_l" type="button" data-text-icon="+">New event</button>';
}

export default class AddEventButtonView {
  #element = null;

  _getTemplate() {
    return createAddEventButtonTemplate();
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
