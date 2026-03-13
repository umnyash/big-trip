import { AbstractView } from '../framework';
import { SortType } from '../constants.js';

function createTripSortTemplate(currentValue) {
  return (
    `<form class="trip__sort trip-sort" action="https://echo.htmlacademy.ru/courses" method="get">
      <label class="trip-sort__item checker checker--emphasis">
        <input
          class="checker__control visually-hidden"
          type="radio" name="type"
          value="${SortType.DATE_ASC}"
          ${SortType.DATE_ASC === currentValue ? 'checked' : ''}
        >
        <span class="checker__label">Day</span>
      </label>
      <span class="trip-sort__item checker checker--emphasis">
        <span class="checker__label">Event</span>
      </span>
      <label class="trip-sort__item checker checker--emphasis">
        <input
          class="checker__control visually-hidden"
          type="radio" name="type"
          value="${SortType.DURATION_DESC}"
          ${SortType.DURATION_DESC === currentValue ? 'checked' : ''}
        >
        <span class="checker__label">Time</span>
      </label>
      <label class="trip-sort__item checker checker--emphasis">
        <input
          class="checker__control visually-hidden"
          type="radio"
          name="type"
          value="${SortType.PRICE_DESC}"
          ${SortType.PRICE_DESC === currentValue ? 'checked' : ''}
        >
        <span class="checker__label">Price</span>
      </label>
      <span class="trip-sort__item checker checker--emphasis">
        <span class="checker__label">Offers</span>
      </span>
    </form>`
  );
}

export default class TripSortView extends AbstractView {
  #value = null;
  #onValueChange = null;

  constructor({ value, onValueChange }) {
    super();

    this.#value = value;
    this.#onValueChange = onValueChange;
    this.element.addEventListener('change', this.#formChangeHandler);
  }

  _getTemplate() {
    return createTripSortTemplate(this.#value);
  }

  #formChangeHandler = (evt) => {
    this.#onValueChange(evt.target.value);
  };
}
