import { AbstractView } from '../framework';
import { TimeStatus } from '../constants.js';

function createTripFilterTemplate() {
  return (
    `<form class="trip-header__filter trip-filter" action="https://echo.htmlacademy.ru/courses" method="get">
      <label class="checker checker--soft">
        <input class="checker__control visually-hidden" type="radio" name="time-status" value="everything" checked>
        <span class="checker__label">Everything</span>
      </label>
      <label class="checker checker--soft">
        <input class="checker__control visually-hidden" type="radio" name="time-status" value="${TimeStatus.UPCOMING}">
        <span class="checker__label">Future</span>
      </label>
      <label class="checker checker--soft">
        <input class="checker__control visually-hidden" type="radio" name="time-status" value="${TimeStatus.ONGOING}">
        <span class="checker__label">Present</span>
      </label>
      <label class="checker checker--soft">
        <input class="checker__control visually-hidden" type="radio" name="time-status" value="${TimeStatus.PAST}">
        <span class="checker__label">Past</span>
      </label>
    </form>`
  );
}

export default class TripFilterView extends AbstractView {
  _getTemplate() {
    return createTripFilterTemplate();
  }
}
