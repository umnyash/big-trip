import { AbstractView } from '../framework';

function createTripFilterTemplate() {
  return (
    `<form class="trip-header__filter trip-filter" action="https://echo.htmlacademy.ru/courses" method="get">
      <label class="checker checker--soft">
        <input class="checker__control visually-hidden" type="radio" name="time-status" value="everything" checked>
        <span class="checker__label">Everything</span>
      </label>
      <label class="checker checker--soft">
        <input class="checker__control visually-hidden" type="radio" name="time-status" value="future">
        <span class="checker__label">Future</span>
      </label>
      <label class="checker checker--soft">
        <input class="checker__control visually-hidden" type="radio" name="time-status" value="present">
        <span class="checker__label">Present</span>
      </label>
      <label class="checker checker--soft">
        <input class="checker__control visually-hidden" type="radio" name="time-status" value="past">
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
