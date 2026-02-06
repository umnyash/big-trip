import { createElement } from '../framework/render.js';

function createTripSortingTemplate() {
  return (
    `<form class="trip__sorting trip-sorting" action="https://echo.htmlacademy.ru/courses" method="get">
      <label class="trip-sorting__item checker checker--emphasis">
        <input class="checker__control visually-hidden" type="radio" name="criterion" value="date" checked>
        <span class="checker__label">Day</span>
      </label>
      <span class="trip-sorting__item checker checker--emphasis">
        <span class="checker__label">Event</span>
      </span>
      <label class="trip-sorting__item checker checker--emphasis">
        <input class="checker__control visually-hidden" type="radio" name="criterion" value="duration">
        <span class="checker__label">Time</span>
      </label>
      <label class="trip-sorting__item checker checker--emphasis">
        <input class="checker__control visually-hidden" type="radio" name="criterion" value="price">
        <span class="checker__label">Price</span>
      </label>
      <span class="trip-sorting__item checker checker--emphasis">
        <span class="checker__label">Offers</span>
      </span>
    </form>`
  );
}

export default class TripSortingView {
  getTemplate() {
    return createTripSortingTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
