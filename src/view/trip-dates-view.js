import { createElement } from '../framework/render.js';

function createTripDatesTemplate() {
  return (
    `<p class="trip-header__dates">
      <time datetime="2026-08-14">14</time> &mdash; <time datetime="2026-08-16">16 Aug</time>
    </p>`
  );
}

export default class TripDatesView {
  getTemplate() {
    return createTripDatesTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
