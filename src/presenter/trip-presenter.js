import { RenderPosition, render, replace } from '../framework';
import { isEscapeEvent } from '../utils';

import AddEventButtonView from '../view/add-event-button-view.js';
import EventFormView from '../view/event-form-view.js';
import EventCardView from '../view/event-card-view.js';
import EventListView from '../view/event-list-view.js';
import TripDatesView from '../view/trip-dates-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripPriceView from '../view/trip-price-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripTitleView from '../view/trip-title-view.js';
import TripMessage, { MessageVariant } from '../view/trip-message-view.js';

export default class TripPresenter {
  #headerElement = null;
  #model = null;
  #destinations = null;
  #events = [];
  #offers = null;

  #eventListComponent = new EventListView();

  constructor({ headerElement, model }) {
    this.#headerElement = headerElement;
    this.#model = model;
  }

  init() {
    this.#destinations = this.#model.destinations;
    this.#events = this.#model.events;
    this.#offers = this.#model.offers;

    this.#render();
  }

  #renderEvent(event) {
    const documentKeyDownHandler = (evt) => {
      if (isEscapeEvent(evt)) {
        evt.preventDefault();
        exitEditMode();
      }
    };

    const eventCardComponent = new EventCardView({
      event,
      destination: this.#destinations[event.destinationId],
      offers: this.#offers[event.type],
      onEditButtonClick: () => {
        enterEditMode();
      },
    });

    const eventFormComponent = new EventFormView({
      event,
      destinations: this.#destinations,
      offers: this.#offers,
      onCloseButtonClick: () => {
        exitEditMode();
      },
    });

    function enterEditMode() {
      replace(eventFormComponent, eventCardComponent);
      document.addEventListener('keydown', documentKeyDownHandler);
    }

    function exitEditMode() {
      replace(eventCardComponent, eventFormComponent);
      document.removeEventListener('keydown', documentKeyDownHandler);
    }

    render(eventCardComponent, this.#eventListComponent.element);
  }

  #render() {
    render(new TripFilterView(), this.#headerElement);
    render(new AddEventButtonView(), this.#headerElement);

    if (!this.#events.length) {
      render(
        new TripMessage({ variant: MessageVariant.NoEvents }),
        this.#headerElement,
        RenderPosition.AFTEREND
      );

      return;
    }

    render(new TripTitleView(), this.#headerElement);
    render(new TripDatesView(), this.#headerElement);
    render(new TripPriceView(), this.#headerElement);
    render(this.#eventListComponent, this.#headerElement, RenderPosition.AFTEREND);
    render(new TripSortView(), this.#headerElement, RenderPosition.AFTEREND);
    this.#events.forEach((event) => this.#renderEvent(event));
  }
}
