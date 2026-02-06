import { createElement } from '../framework/render.js';

function createAddEventFormTemplate() {
  return (
    `<li class="events-list__item">
      <form class="events-list__form event-form" action="https://echo.htmlacademy.ru" method="post">
        <div class="event-form__header">
          <h3 class="visually-hidden">Adding an event</h3>
          <div class="event-form__type-dropdown dropdown">
            <button class="dropdown__toggle-button dropdown__toggle-button--icon" type="button" aria-expanded="false">
              <span class="visually-hidden">Event type:</span>
              <span class="dropdown__toggle-icon event-icon event-icon--accent">
                <img class="event-icon__image" src="img/icons/event-types/flight.png" width="18" height="18" aria-labelledby="event-form-type">
              </span>
            </button>
            <ul class="dropdown__list">
              <li>
                <label class="dropdown__option">
                  <input class="dropdown__option-control visually-hidden" name="type" type="radio" value="taxi">
                  <span class="dropdown__option-label">
                    <img class="dropdown__option-icon" src="img/icons/event-types/taxi.png" width="18" height="18" alt="">
                    Taxi
                  </span>
                </label>
              </li>
              <li>
                <label class="dropdown__option">
                  <input class="dropdown__option-control visually-hidden" name="type" type="radio" value="bus">
                  <span class="dropdown__option-label">
                    <img class="dropdown__option-icon" src="img/icons/event-types/bus.png" width="18" height="18" alt="">
                    Bus
                  </span>
                </label>
              </li>
              <li>
                <label class="dropdown__option">
                  <input class="dropdown__option-control visually-hidden" name="type" type="radio" value="train">
                  <span class="dropdown__option-label">
                    <img class="dropdown__option-icon" src="img/icons/event-types/train.png" width="18" height="18" alt="">
                    Train
                  </span>
                </label>
              </li>
              <li>
                <label class="dropdown__option">
                  <input class="dropdown__option-control visually-hidden" name="type" type="radio" value="ship">
                  <span class="dropdown__option-label">
                    <img class="dropdown__option-icon" src="img/icons/event-types/ship.png" width="18" height="18" alt="">
                    Ship
                  </span>
                </label>
              </li>
              <li>
                <label class="dropdown__option">
                  <input class="dropdown__option-control visually-hidden" name="type" type="radio" value="drive">
                  <span class="dropdown__option-label">
                    <img class="dropdown__option-icon" src="img/icons/event-types/drive.png" width="18" height="18" alt="">
                    Drive
                  </span>
                </label>
              </li>
              <li>
                <label class="dropdown__option">
                  <input class="dropdown__option-control visually-hidden" name="type" type="radio" value="flight" checked>
                  <span class="dropdown__option-label">
                    <img class="dropdown__option-icon" src="img/icons/event-types/flight.png" width="18" height="18" alt="">
                    Flight
                  </span>
                </label>
              </li>
              <li>
                <label class="dropdown__option">
                  <input class="dropdown__option-control visually-hidden" name="type" type="radio" value="check-in">
                  <span class="dropdown__option-label">
                    <img class="dropdown__option-icon" src="img/icons/event-types/check-in.png" width="18" height="18" alt="">
                    Check-in
                  </span>
                </label>
              </li>
              <li>
                <label class="dropdown__option">
                  <input class="dropdown__option-control visually-hidden" name="type" type="radio" value="sightseeing">
                  <span class="dropdown__option-label">
                    <img class="dropdown__option-icon" src="img/icons/event-types/sightseeing.png" width="18" height="18" alt="">
                    Sightseeing
                  </span>
                </label>
              </li>
              <li>
                <label class="dropdown__option">
                  <input class="dropdown__option-control visually-hidden" name="type" type="radio" value="restaurant">
                  <span class="dropdown__option-label">
                    <img class="dropdown__option-icon" src="img/icons/event-types/restaurant.png" width="18" height="18" alt="">
                    Restaurant
                  </span>
                </label>
              </li>
            </ul>
          </div>
          <div class="event-form__field-wrapper event-form__field-wrapper--title">
            <span id="event-form-type">Flight</span>
            <label class="event-form__field">
              <span class="visually-hidden">Destination:</span>
              <input class="event-form__field-control" type="text" name="destination" value="" list="destinations-data-list" required>
              <datalist id="destinations-data-list">
                <option value="Berlin"></option>
                <option value="Chamonix"></option>
                <option value="Frankfurt"></option>
                <option value="Kioto"></option>
                <option value="Monaco"></option>
                <option value="Munich"></option>
                <option value="Nagasaki"></option>
                <option value="Naples"></option>
                <option value="Valencia"></option>
                <option value="Vien"></option>
              </datalist>
            </label>
          </div>
          <div class="event-form__field-wrapper event-form__field-wrapper--dates">
            <label class="event-form__field">
              <span class="visually-hidden">From:</span>
              <input class="event-form__field-control" type="text" name="date-from" value="" required>
            </label>
            &mdash;
            <label class="event-form__field">
              <span class="visually-hidden">To:</span>
              <input class="event-form__field-control" type="text" name="date-to" value="" required>
            </label>
          </div>
          <div class="event-form__field-wrapper event-form__field-wrapper--price">
            <label class="event-form__field">
              <span class="visually-hidden">Base price:</span>€
              <input class="event-form__field-control" type="number" name="base-price" value="0" min="1" required>
            </label>
          </div>
          <div class="event-form__actions">
            <button class="button button--primary button--size_s" type="submit">
              Save
            </button>
            <button class="button button--simple button--size_s" type="button">
              Cancel
            </button>
          </div>
        </div>
        <fieldset class="event-form__section">
          <legend class="event-form__section-title">Offers</legend>
          <div class="event-form__offers">
            <label class="checker checker--accent">
              <input class="checker__control visually-hidden" type="checkbox" name="offers" value="offer-1">
              <span class="checker__label">Choose meal +€&nbsp;12</span>
            </label>
            <label class="checker checker--accent">
              <input class="checker__control visually-hidden" type="checkbox" name="offers" value="offer-2">
              <span class="checker__label">Choose seats +€&nbsp;10</span>
            </label>
            <label class="checker checker--accent">
              <input class="checker__control visually-hidden" type="checkbox" name="offers" value="offer-1">
              <span class="checker__label">Upgrade to comfort class +€&nbsp;60</span>
            </label>
            <label class="checker checker--accent">
              <input class="checker__control visually-hidden" type="checkbox" name="offers" value="offer-2">
              <span class="checker__label">Upgrade to business class +€&nbsp;80</span>
            </label>
            <label class="checker checker--accent">
              <input class="checker__control visually-hidden" type="checkbox" name="offers" value="offer-1">
              <span class="checker__label">Add luggage +€&nbsp;35</span>
            </label>
            <label class="checker checker--accent">
              <input class="checker__control visually-hidden" type="checkbox" name="offers" value="offer-2">
              <span class="checker__label">Business lounge +€&nbsp;35</span>
            </label>
          </div>
        </fieldset>
      </form>
    </li>`
  );
}

export default class AddEventFormView {
  getTemplate() {
    return createAddEventFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
