import { AbstractView } from '../framework';
import { TimeStatus } from '../constants.js';

const items = [
  { label: 'Everything', value: '' },
  { label: 'Future', value: TimeStatus.UPCOMING },
  { label: 'Present', value: TimeStatus.ONGOING },
  { label: 'Past', value: TimeStatus.PAST },
];

function createTripFilterItemTemplate({ label, value }, currentTimeStatus) {
  const isChecked = value ? value === currentTimeStatus : !currentTimeStatus;

  return (
    `<label class="checker checker--soft">
      <input
        class="checker__control visually-hidden"
        type="radio"
        name="time-status"
        value="${value}"
        ${isChecked ? 'checked' : ''}
      >
      <span class="checker__label">${label}</span>
    </label>`
  );
}

function createTripFilterTemplate(filter) {
  return (
    `<form class="trip-header__filter trip-filter" action="https://echo.htmlacademy.ru/courses" method="get">
      ${items.map((item) => createTripFilterItemTemplate(item, filter)).join('')}
    </form>`
  );
}

export default class TripFilterView extends AbstractView {
  #filter = null;

  _getTemplate() {
    return createTripFilterTemplate(this.#filter);
  }
}
