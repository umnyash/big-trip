import { createElement } from '../framework';

function createTripPriceTemplate() {
  return '<p class="trip-header__price">Total: €&nbsp;1415</p>';
}

export default class TripPriceView {
  #element = null;

  _getTemplate() {
    return createTripPriceTemplate();
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
