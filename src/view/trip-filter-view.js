import { AbstractView } from '../framework';
import { TimeStatus } from '../constants.js';

const items = [
  { label: 'Everything', value: '' },
  { label: 'Future', value: TimeStatus.UPCOMING },
  { label: 'Present', value: TimeStatus.ONGOING },
  { label: 'Past', value: TimeStatus.PAST },
];

function createTripFilterItemTemplate({ label, value }, currentTimeStatus, availableTimeStatuses) {
  const isChecked = value ? value === currentTimeStatus : !currentTimeStatus;

  const isEnabled = value
    ? availableTimeStatuses.includes(value)
    : Boolean(availableTimeStatuses.length);

  return (
    `<label class="checker checker--soft">
      <input
        class="checker__control visually-hidden"
        type="radio"
        name="time-status"
        value="${value}"
        ${isChecked ? 'checked' : ''}
        ${isEnabled ? '' : 'disabled'}
      >
      <span class="checker__label">${label}</span>
    </label>`
  );
}

function createTripFilterTemplate(filter, availableTimeStatuses) {
  return (
    `<form class="trip-header__filter trip-filter" action="https://echo.htmlacademy.ru/courses" method="get">
      ${items.map((item) => createTripFilterItemTemplate(item, filter, availableTimeStatuses)).join('')}
    </form>`
  );
}

export default class TripFilterView extends AbstractView {
  #filter = null;
  #availableTimeStatuses = [];
  #onFilterChange = null;

  constructor({ filter, availableTimeStatuses, onFilterChange }) {
    super();

    this.#filter = filter;
    this.#availableTimeStatuses = availableTimeStatuses;
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#formChangeHandler);
  }

  _getTemplate() {
    return createTripFilterTemplate(this.#filter, this.#availableTimeStatuses);
  }

  setFilter(filter) {
    this.element.querySelector(`[value="${filter ?? ''}"]`).checked = true;
    this.#onFilterChange(filter);
  }

  #formChangeHandler = (evt) => {
    this.#onFilterChange(evt.target.value || null);
  };
}
