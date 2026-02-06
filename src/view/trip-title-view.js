import { createElement } from '../framework/render.js';

function createTripTitleTemplate() {
  return '<h2 class="trip-header__title">Berlin &mdash; Frankfurt &mdash; Munich</h2>';
}

export default class TripTitleView {
  getTemplate() {
    return createTripTitleTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
