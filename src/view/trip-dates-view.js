import { createElement } from '../framework';

function createTripDatesTemplate() {
  return (
    `<p class="trip-header__dates">
      <time datetime="2026-08-14">14</time> &mdash; <time datetime="2026-08-16">16 Aug</time>
    </p>`
  );
}

export default class TripDatesView {
  #element = null;

  _getTemplate() {
    return createTripDatesTemplate();
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
