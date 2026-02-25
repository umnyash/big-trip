import { createElement } from '../framework';

function createTripSortTemplate() {
  return (
    `<form class="trip__sort trip-sort" action="https://echo.htmlacademy.ru/courses" method="get">
      <label class="trip-sort__item checker checker--emphasis">
        <input class="checker__control visually-hidden" type="radio" name="type" value="date-asc" checked>
        <span class="checker__label">Day</span>
      </label>
      <span class="trip-sort__item checker checker--emphasis">
        <span class="checker__label">Event</span>
      </span>
      <label class="trip-sort__item checker checker--emphasis">
        <input class="checker__control visually-hidden" type="radio" name="type" value="duration-desc">
        <span class="checker__label">Time</span>
      </label>
      <label class="trip-sort__item checker checker--emphasis">
        <input class="checker__control visually-hidden" type="radio" name="type" value="price-desc">
        <span class="checker__label">Price</span>
      </label>
      <span class="trip-sort__item checker checker--emphasis">
        <span class="checker__label">Offers</span>
      </span>
    </form>`
  );
}

export default class TripSortView {
  #element = null;

  _getTemplate() {
    return createTripSortTemplate();
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
