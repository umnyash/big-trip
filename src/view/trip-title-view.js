import { createElement } from '../framework';

function createTripTitleTemplate() {
  return '<h2 class="trip-header__title">Berlin &mdash; Frankfurt &mdash; Munich</h2>';
}

export default class TripTitleView {
  #element = null;

  _getTemplate() {
    return createTripTitleTemplate();
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
