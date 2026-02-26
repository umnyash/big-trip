import { RenderPosition, render } from '../framework';

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
    render(
      new EventCardView({
        event,
        destination: this.#destinations[event.destinationId],
        offers: this.#offers[event.type],
      }),
      this.#eventListComponent.element
    );
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

    render(
      new EventFormView({
        event: this.#events[0],
        destinations: this.#destinations,
        offers: this.#offers,
      }),
      this.#eventListComponent.element
    );

    for (let i = 1; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i]);
    }
  }
}
