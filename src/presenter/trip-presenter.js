import { RenderPosition, render } from '../framework';
import { SortType } from '../constants.js';
import { sortEventsBy, updateArrayItemById } from '../utils';

import EventPresenter from './event-presenter.js';
import AddEventButtonView from '../view/add-event-button-view.js';
import EventListView from '../view/event-list-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripSummary from '../view/trip-summary-view.js';
import TripMessage, { MessageVariant } from '../view/trip-message-view.js';

export default class TripPresenter {
  #headerElement = null;
  #model = null;
  #destinations = null;
  #events = [];
  #offers = null;

  #filterComponent = null;
  #sortComponent = null;
  #eventListComponent = new EventListView();

  #sortType = SortType.DATE_ASC;
  #filter = null;
  #eventPresenters = new Map();
  #editingEventPresenter = null;

  constructor({ headerElement, model }) {
    this.#headerElement = headerElement;
    this.#model = model;
  }

  init() {
    this.#destinations = this.#model.destinations;
    this.#events = this.#model.events;
    this.#offers = this.#model.offers;

    this.#sortEvents();
    this.#render();
  }

  #renderFilter() {
    this.#filterComponent = new TripFilterView({
      filter: this.#filter,
      onFilterChange: this.#filterChangeHandler,
    });

    render(this.#filterComponent, this.#headerElement);
  }

  #renderSort() {
    this.#sortComponent = new TripSortView({
      value: this.#sortType,
      onValueChange: this.#sortChangeHandler,
    });

    render(this.#sortComponent, this.#headerElement, RenderPosition.AFTEREND);
  }

  #renderEventCard(event) {
    const eventPresenter = new EventPresenter({
      containerElement: this.#eventListComponent.element,
      destinations: this.#destinations,
      offers: this.#offers,
      onEventEnterEditMode: this.#eventEnterEditModeHandler,
      onEventExitEditMode: this.#eventExitEditModeHandler,
      onEventUpdate: this.#eventUpdateHandler,
    });

    this.#eventPresenters.set(event.id, eventPresenter);
    eventPresenter.init(event);
  }

  #renderEventCards() {
    this.#events.forEach((event) => this.#renderEventCard(event));
  }

  #render() {
    if (!this.#events.length) {
      this.#renderFilter();
      render(new AddEventButtonView(), this.#headerElement);

      render(
        new TripMessage({ variant: MessageVariant.NoEvents }),
        this.#headerElement,
        RenderPosition.AFTEREND
      );

      return;
    }

    render(new TripSummary(), this.#headerElement);
    this.#renderFilter();
    render(new AddEventButtonView(), this.#headerElement);
    render(this.#eventListComponent, this.#headerElement, RenderPosition.AFTEREND);
    this.#renderSort();
    this.#renderEventCards();
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    this.#editingEventPresenter = null;
  }

  #sortEvents() {
    this.#events = sortEventsBy(this.#events, this.#sortType);
  }

  #filterChangeHandler = (filter) => {
    this.#filter = filter;
  };

  #sortChangeHandler = (value) => {
    this.#sortType = value;
    this.#sortEvents();
    this.#clearEventList();
    this.#renderEventCards();
  };

  #eventUpdateHandler = (eventData) => {
    updateArrayItemById(this.#events, eventData);

    this.#sortEvents();
    this.#clearEventList();
    this.#renderEventCards();
  };

  #eventEnterEditModeHandler = (eventPresenter) => {
    this.#editingEventPresenter?.exitEditMode();
    this.#editingEventPresenter = eventPresenter;
  };

  #eventExitEditModeHandler = () => {
    this.#editingEventPresenter = null;
  };
}
