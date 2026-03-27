import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { AbstractStatefulView } from '../framework';
import { eventTypes, eventTypeIds } from '../data';
import { calcDuration } from '../utils';

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

function createEventFormDestinationFieldTemplate(destinationNames, value = '', eventId) {
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
        ${destinationNames.map((name) => `
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
              ${selectedOfferIds?.has(id) ? 'checked' : ''}
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

function createEventFormTemplate({ state, destinationNames, destination, offers }) {
  const {
    id,
    type,
    destinationFieldValue,
    basePrice,
    selectedOfferIdsByType,
    isTypeDropdownOpen,
  } = state;

  const isNew = !id;

  const formTitle = isNew ? 'Adding an event' : 'Editing an event';
  const typeTitle = eventTypes[type].title;
  const selectedOfferIds = selectedOfferIdsByType[type];

  return (
    `<li class="event-list__item">
      <form class="event-list__form event-form" action="https://echo.htmlacademy.ru" method="post">
        <div class="event-form__header">
          <h3 class="visually-hidden">${formTitle}</h3>
          ${createEventFormTypeDropdownTemplate(type, isTypeDropdownOpen)}
          <div class="event-form__field-wrapper event-form__field-wrapper--title">
            <span id="event-form-type">${typeTitle}</span>
            ${createEventFormDestinationFieldTemplate(destinationNames, destinationFieldValue, id)}
          </div>
          <div class="event-form__field-wrapper event-form__field-wrapper--dates">
            <label class="event-form__field">
              <span class="visually-hidden">From:</span>
              <input class="event-form__field-control" type="text" name="start-date" value="" required>
            </label>
            &mdash;
            <label class="event-form__field">
              <span class="visually-hidden">To:</span>
              <input class="event-form__field-control" type="text" name="end-date" value="" required>
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
        ${createEventFormOffersTemplate(offers, selectedOfferIds)}
        ${createEventFormDestinationTemplate(destination)}
      </form>
    </li>`
  );
}

export default class EventFormView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #onCloseButtonClick = null;

  #destinationNameToIdMap = null;
  #destinationNames = null;
  #startDatePicker = null;
  #endDatePicker = null;

  constructor({ event = newEvent, destinations, offers, onCloseButtonClick }) {
    super();

    this.#destinations = destinations;
    this.#offers = offers;
    this.#onCloseButtonClick = onCloseButtonClick;

    const {
      destinationNameToIdMap,
      destinationNames,
    } = EventFormView.#createDestinationIndexes(this.#destinations);

    this.#destinationNameToIdMap = destinationNameToIdMap;
    this.#destinationNames = destinationNames;

    this._updateState(EventFormView.#createInitialState(event, this.#destinations));
    this._setHandlers();
  }

  removeElement() {
    super.removeElement();
    this.#destroyDatePickers();
    document.removeEventListener('click', this.#documentClickHandler);
  }

  _getTemplate() {
    const destinationId = this.#getDestinationIdByName(this._state.destinationFieldValue);
    const destination = this.#destinations[destinationId];
    const offersOfType = this.#offers[this._state.type];

    return createEventFormTemplate({
      state: this._state,
      destinationNames: this.#destinationNames,
      destination,
      offers: offersOfType,
    });
  }

  _setHandlers() {
    const typeDropdownElement = this.element.querySelector('.event-form__type-dropdown');

    typeDropdownElement.querySelector('.dropdown__toggle-button')
      .addEventListener('click', this.#typeDropdownButtonClickHandler);

    typeDropdownElement.addEventListener('change', this.#typeDropdownChangeHandler);

    if (this._state.isTypeDropdownOpen) {
      document.addEventListener('click', this.#documentClickHandler);
    }

    this.element.querySelector('[name="destination"]')
      .addEventListener('input', this.#destinationFieldInputHandler);

    this.element.querySelector('[name="base-price"]')
      .addEventListener('input', this.#basePriceFieldInputHandler);

    this.element.querySelector('.event-form__offers')
      ?.addEventListener('change', this.#offersChangeHandler);

    this.element.querySelectorAll('.event-form__cancel-button, .event-form__close-button')
      .forEach((buttonElement) => buttonElement.addEventListener('click', this.#closeButtonClickHandler));

    this.#setDatePickers();
  }

  #createDatePicker(element, options) {
    return flatpickr(element, {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
      minuteIncrement: 1,
      ...options,
    });
  }

  #setDatePickers() {
    this.#startDatePicker = this.#createDatePicker(
      this.element.querySelector('[name="start-date"]'),
      {
        defaultDate: this._state.startDate,
        onChange: this.#startDateChangeHandler,
      },
    );

    this.#endDatePicker = this.#createDatePicker(
      this.element.querySelector('[name="end-date"]'),
      {
        defaultDate: this._state.endDate,
        minDate: this._state.startDate,
        onChange: this.#endDateChangeHandler,
      },
    );
  }

  #destroyDatePickers() {
    this.#startDatePicker.destroy();
    this.#startDatePicker = null;

    this.#endDatePicker.destroy();
    this.#endDatePicker = null;
  }

  #getDestinationIdByName(name) {
    return this.#destinationNameToIdMap[name.trim().toLowerCase()] ?? null;
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

  #destinationFieldInputHandler = ({ target: { value } }) => {
    const currentDestinationId = this.#getDestinationIdByName(this._state.destinationFieldValue);
    const newDestinationId = this.#getDestinationIdByName(value);

    if (newDestinationId === currentDestinationId) {
      this._updateState({ destinationFieldValue: value });
      return;
    }

    const destinationFieldValue = newDestinationId
      ? this.#destinations[newDestinationId].name
      : value;

    this.updateElement({ destinationFieldValue });

    const fieldElement = this.element.querySelector('[name="destination"]');
    fieldElement.focus();
    fieldElement.setSelectionRange(fieldElement.value.length, fieldElement.value.length);
  };

  #startDateChangeHandler = ([date]) => {
    if (this._state.startDate && this._state.endDate && date >= new Date(this._state.endDate)) {
      const eventDuration = calcDuration(this._state.startDate, this._state.endDate);
      const rescheduledEndDate = new Date(+date + eventDuration);
      this.#endDatePicker.setDate(rescheduledEndDate, true);
    }

    this._updateState({ startDate: date.toISOString() });
    this.#endDatePicker.set('minDate', this._state.startDate);
  };

  #endDateChangeHandler = ([date]) => {
    this._updateState({ endDate: date.toISOString() });
  };

  #basePriceFieldInputHandler = ({ target: { value } }) => {
    this._updateState({ basePrice: value });
  };

  #offersChangeHandler = ({ target: { value, checked } }) => {
    const selectedOfferIds = new Set(this._state.selectedOfferIdsByType[this._state.type]);

    if (checked) {
      selectedOfferIds.add(value);
    } else {
      selectedOfferIds.delete(value);
    }

    this._updateState({
      selectedOfferIdsByType: {
        ...this._state.selectedOfferIdsByType,
        [this._state.type]: selectedOfferIds,
      },
    });
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

  static #createDestinationIndexes(destinations) {
    const destinationNameToIdMap = {};
    const destinationNames = [];

    Object.entries(destinations).forEach(([id, { name }]) => {
      destinationNameToIdMap[name.toLowerCase()] = id;
      destinationNames.push(name);
    });

    return { destinationNameToIdMap, destinationNames };
  }

  static #createInitialState(event, destinations) {
    const state = {
      ...event,
      destinationFieldValue: destinations[event.destinationId]?.name ?? '',
      selectedOfferIdsByType: { [event.type]: new Set(event.offerIds) },
      isTypeDropdownOpen: false,
    };

    delete state.offerIds;
    delete state.destinationId;

    return state;
  }
}
