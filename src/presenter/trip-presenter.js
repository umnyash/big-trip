import { RenderPosition, render } from '../framework';

import EventPresenter from './event-presenter.js';
import AddEventButtonView from '../view/add-event-button-view.js';
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
  #editingEventPresenter = null;

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
    const eventPresenter = new EventPresenter({
      containerElement: this.#eventListComponent.element,
      destinations: this.#destinations,
      offers: this.#offers,
      onEventEnterEditMode: this.#eventEnterEditModeHandler,
      onEventExitEditMode: this.#eventExitEditModeHandler,
    });

    eventPresenter.init(event);
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

  #eventEnterEditModeHandler = (eventPresenter) => {
    this.#editingEventPresenter?.exitEditMode();
    this.#editingEventPresenter = eventPresenter;
  };

  #eventExitEditModeHandler = () => {
    this.#editingEventPresenter = null;
  };
}
