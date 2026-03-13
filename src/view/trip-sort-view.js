import { AbstractView } from '../framework';
import { SortType } from '../constants.js';

function createTripSortTemplate() {
  return (
    `<form class="trip__sort trip-sort" action="https://echo.htmlacademy.ru/courses" method="get">
      <label class="trip-sort__item checker checker--emphasis">
        <input class="checker__control visually-hidden" type="radio" name="type" value="${SortType.DATE_ASC}" checked>
        <span class="checker__label">Day</span>
      </label>
      <span class="trip-sort__item checker checker--emphasis">
        <span class="checker__label">Event</span>
      </span>
      <label class="trip-sort__item checker checker--emphasis">
        <input class="checker__control visually-hidden" type="radio" name="type" value="${SortType.DURATION_DESC}">
        <span class="checker__label">Time</span>
      </label>
      <label class="trip-sort__item checker checker--emphasis">
        <input class="checker__control visually-hidden" type="radio" name="type" value="${SortType.PRICE_DESC}">
        <span class="checker__label">Price</span>
      </label>
      <span class="trip-sort__item checker checker--emphasis">
        <span class="checker__label">Offers</span>
      </span>
    </form>`
  );
}

export default class TripSortView extends AbstractView {
  _getTemplate() {
    return createTripSortTemplate();
  }
}
