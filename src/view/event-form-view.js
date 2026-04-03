import { AbstractStatefulView } from '../framework';
import { eventTypes, eventTypeIds } from '../data';
import { formatFullDate } from '../utils';

const DEFAULT_EVENT_TYPE = 'flight';

const newEvent = {
  type: DEFAULT_EVENT_TYPE,
  basePrice: 0,
  destinationId: null,
  startDate: null,
  endDate: null,
  isFavorite: false,
  offerIds: [],
};

function createEventFormTypeDropdownTemplate(selectedTypeId, isTypeDropdownOpen) {
  return (
    `<div class="event-form__type-dropdown dropdown">
      <button
        class="dropdown__toggle-button dropdown__toggle-button--icon"
        type="button"
        aria-expanded="${isTypeDropdownOpen}"
      >
        <span class="visually-hidden">Event type:</span>
        <span class="dropdown__toggle-icon event-icon event-icon--accent">
          <img class="event-icon__image" src="${eventTypes[selectedTypeId].iconUrl}" width="18" height="18" aria-labelledby="event-form-type">
        </span>
      </button>
      <ul class="dropdown__list">
        ${eventTypeIds.map((id) => `
          <li>
            <label class="dropdown__option">
              <input
                class="dropdown__option-control visually-hidden"
                name="type"
                type="radio"
                value="${id}"
                ${id === selectedTypeId ? 'checked' : ''}
              >
              <span class="dropdown__option-label">
                <img class="dropdown__option-icon" src="${eventTypes[id].iconUrl}" width="18" height="18" alt="">
                ${eventTypes[id].title}
              </span>
            </label>
          </li>
        `).join('')}
      </ul>
    </div>`
  );
}

function createEventFormDestinationFieldTemplate(destinations, value = '', eventId) {
  const dataListId = `${eventId ? `event-${eventId}` : 'new-event'}-destinations-data-list`;

  return (
    `<label class="event-form__field">
      <span class="visually-hidden">Destination:</span>
      <input
        class="event-form__field-control"
        type="text"
        name="destination"
        value="${value}"
        list="${dataListId}"
        required
      >
      <datalist id="${dataListId}">
        ${Object.values(destinations).map(({ name }) => `
          <option value="${name}"></option>
        `).join('')}
      </datalist>
    </label>`
  );
}

function createEventFormOffersTemplate(offers, selectedOfferIds) {
  const offersIds = Object.keys(offers);

  if (!offersIds.length) {
    return '';
  }

  return (
    `<fieldset class="event-form__section">
      <legend class="event-form__section-title">Offers</legend>
      <div class="event-form__offers">
        ${offersIds.map((id) => `
          <label class="checker checker--accent">
            <input
              class="checker__control visually-hidden"
              type="checkbox"
              name="offer-ids"
              value="${id}"
              ${selectedOfferIds.includes(id) ? 'checked' : ''}
            >
            <span class="checker__label">
              ${offers[id].title} +&#8288;€&nbsp;${offers[id].price}
            </span>
          </label>
        `).join('')}
      </div>
    </fieldset>`
  );
}

function createEventFormGalleryTemplate(images) {
  if (!images.length) {
    return '';
  }

  return (
    `<div class="event-form__gallery gallery">
      ${images.map((image) => `
        <img class="gallery__image" src="${image.url}" width="228" height="152" alt="${image.description}">
      `).join('')}
    </div>`
  );
}

function createEventFormDestinationTemplate(destination) {
  if (!destination || (!destination.description && !destination.images.length)) {
    return '';
  }

  const { description, images } = destination;

  return (
    `<section class="event-form__section">
      <h4 class="event-form__section-title">Destination</h4>
      ${description ? `<p class="event-form__section-text">${description}</p>` : ''}
      ${createEventFormGalleryTemplate(images)}
    </section>`
  );
}

function createEventFormTemplate(state, destinations, offers) {
  const { id, type, destinationId, startDate, endDate, basePrice, isTypeDropdownOpen } = state;
  const isNew = !id;

  const formTitle = isNew ? 'Adding an event' : 'Editing an event';
  const typeTitle = eventTypes[type].title;
  const formattedStartDate = startDate ? formatFullDate(startDate) : '';
  const formattedEndDate = endDate ? formatFullDate(endDate) : '';
  const destination = destinations[destinationId];

  return (
    `<li class="event-list__item">
      <form class="event-list__form event-form" action="https://echo.htmlacademy.ru" method="post">
        <div class="event-form__header">
          <h3 class="visually-hidden">${formTitle}</h3>
          ${createEventFormTypeDropdownTemplate(type, isTypeDropdownOpen)}
          <div class="event-form__field-wrapper event-form__field-wrapper--title">
            <span id="event-form-type">${typeTitle}</span>
            ${createEventFormDestinationFieldTemplate(destinations, destination?.name, id)}
          </div>
          <div class="event-form__field-wrapper event-form__field-wrapper--dates">
            <label class="event-form__field">
              <span class="visually-hidden">From:</span>
              <input class="event-form__field-control" type="text" name="start-date" value="${formattedStartDate}" required>
            </label>
            &mdash;
            <label class="event-form__field">
              <span class="visually-hidden">To:</span>
              <input class="event-form__field-control" type="text" name="end-date" value="${formattedEndDate}" required>
            </label>
          </div>
          <div class="event-form__field-wrapper event-form__field-wrapper--price">
            <label class="event-form__field">
              <span class="visually-hidden">Base price:</span>€
              <input class="event-form__field-control" type="number" name="base-price" value="${basePrice}" min="1" required>
            </label>
          </div>
          <div class="event-form__actions">
            <button class="button button--primary button--size_s" type="submit">
              Save
            </button>
            ${isNew ? `
              <button class="event-form__cancel-button button button--simple button--size_s" type="button">
                Cancel
              </button>` : `
              <button class="button button--simple button--size_s" type="button">
                Delete
              </button>
            `}
          </div>
          ${isNew ? '' : `
            <button class="event-form__close-button arrow-button" type="button">
              <span class="visually-hidden">Close</span>
            </button>
          `}
        </div>
        ${createEventFormOffersTemplate(offers, state.offerIds)}
        ${createEventFormDestinationTemplate(destination)}
      </form>
    </li>`
  );
}

export default class EventFormView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #onCloseButtonClick = null;

  constructor({ event = newEvent, destinations, offers, onCloseButtonClick }) {
    super();

    this.#destinations = destinations;
    this.#offers = offers;
    this.#onCloseButtonClick = onCloseButtonClick;

    this._updateState(EventFormView.#createInitialState(event));
    this._setHandlers();
  }

  removeElement() {
    super.removeElement();
    document.removeEventListener('click', this.#documentClickHandler);
  }

  _getTemplate() {
    const offersOfType = this.#offers[this._state.type];
    return createEventFormTemplate(this._state, this.#destinations, offersOfType);
  }

  _setHandlers() {
    const typeDropdownElement = this.element.querySelector('.event-form__type-dropdown');

    typeDropdownElement.querySelector('.dropdown__toggle-button')
      .addEventListener('click', this.#typeDropdownButtonClickHandler);

    typeDropdownElement.addEventListener('change', this.#typeDropdownChangeHandler);

    if (this._state.isTypeDropdownOpen) {
      document.addEventListener('click', this.#documentClickHandler);
    }

    this.element.querySelector('[name="base-price"]')
      .addEventListener('input', this.#basePriceFieldInputHandler);

    this.element.querySelectorAll('.event-form__cancel-button, .event-form__close-button')
      .forEach((buttonElement) => buttonElement.addEventListener('click', this.#closeButtonClickHandler));
  }

  #openTypeDropdown(buttonElement) {
    this._updateState({ isTypeDropdownOpen: true });
    buttonElement.ariaExpanded = this._state.isTypeDropdownOpen;
    document.addEventListener('click', this.#documentClickHandler);
  }

  #closeTypeDropdown(buttonElement) {
    document.removeEventListener('click', this.#documentClickHandler);
    this._updateState({ isTypeDropdownOpen: false });
    buttonElement.ariaExpanded = this._state.isTypeDropdownOpen;
  }

  #typeDropdownButtonClickHandler = (evt) => {
    if (this._state.isTypeDropdownOpen) {
      this.#closeTypeDropdown(evt.currentTarget);
    } else {
      this.#openTypeDropdown(evt.currentTarget);
    }
  };

  #typeDropdownChangeHandler = ({ target: { value } }) => {
    this.updateElement({ type: value });
    this.element.querySelector('[name="type"]:checked').focus();
  };

  #basePriceFieldInputHandler = ({ target: { value } }) => {
    this._updateState({ basePrice: value });
  };

  #closeButtonClickHandler = () => {
    this.#onCloseButtonClick();
  };

  #documentClickHandler = (evt) => {
    const dropdownElement = this.element.querySelector('.dropdown');

    if (dropdownElement.contains(evt.target)) {
      return;
    }

    this.#closeTypeDropdown(dropdownElement.querySelector('.dropdown__toggle-button'));
  };

  static #createInitialState(event) {
    return {
      ...event,
      isTypeDropdownOpen: false,
    };
  }
}
