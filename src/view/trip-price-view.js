import { createElement } from '../framework';

function createTripPriceTemplate() {
  return '<p class="trip-header__price">Total: €&nbsp;1415</p>';
}

export default class TripPriceView {
  getTemplate() {
    return createTripPriceTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
