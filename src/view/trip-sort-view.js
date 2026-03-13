import { AbstractView } from '../framework';
import { SortType } from '../constants.js';

const items = [
  { label: 'Day', value: SortType.DATE_ASC },
  { label: 'Event' },
  { label: 'Time', value: SortType.DURATION_DESC },
  { label: 'Price', value: SortType.PRICE_DESC },
  { label: 'Offers' },
];

function createTripSortItemTemplate({ label, value }, currentValue) {
  if (value === undefined) {
    return (
      `<span class="trip-sort__item checker checker--emphasis">
        <span class="checker__label">${label}</span>
      </span>`
    );
  }

  return (
    `<label class="trip-sort__item checker checker--emphasis">
      <input
        class="checker__control visually-hidden"
        type="radio" name="type"
        value="${value}"
        ${value === currentValue ? 'checked' : ''}
      >
      <span class="checker__label">${label}</span>
    </label>`
  );
}

function createTripSortTemplate(currentValue) {
  return (
    `<form class="trip__sort trip-sort" action="https://echo.htmlacademy.ru/courses" method="get">
      ${items.map((item) => createTripSortItemTemplate(item, currentValue)).join('')}
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
