import { RenderPosition, render, remove } from '../framework';
import { TimeStatus, SortType } from '../constants.js';

import {
  extractTripRoute,
  getTripDates,
  calcTripPrice,
  filterEvents,
  extractEventTimeStatuses,
  sortEventsBy,
} from '../utils';

import EventPresenter from './event-presenter.js';
import NewEventFormPresenter from './new-event-form-presenter.js';
import AddEventButtonView from '../view/add-event-button-view.js';
import EventListView from '../view/event-list-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripSummary from '../view/trip-summary-view.js';
import TripMessage, { MessageVariant } from '../view/trip-message-view.js';

export default class TripPresenter {
  #headerElement = null;
  #model = null;

  #summaryComponent = null;
  #filterComponent = null;
  #addEventButtonComponent = null;
  #messageComponent = null;
  #sortComponent = null;
  #eventListComponent = null;

  #defaultSortType = SortType.DATE_ASC;
  #sortType = this.#defaultSortType;
  #filter = null;
  #eventPresenters = new Map();
  #editingEventPresenter = null;
  #newEventFormPresenter = null;

  constructor({ headerElement, model }) {
    this.#headerElement = headerElement;
    this.#model = model;
  }

  get #destinations() {
    return this.#model.destinations;
  }

  get #offers() {
    return this.#model.offers;
  }

  get #allEvents() {
    return this.#model.events;
  }

  get #displayedEvents() {
    const filteredEvents = this.#filter
      ? filterEvents(this.#allEvents, this.#filter)
      : this.#allEvents;

    return sortEventsBy(filteredEvents, this.#sortType);
  }

  init() {
    this.#render();
  }

  #renderSummary() {
    this.#summaryComponent = new TripSummary({
      route: extractTripRoute(this.#allEvents, this.#destinations),
      dates: getTripDates(this.#allEvents),
      price: calcTripPrice(this.#allEvents, this.#offers),
    });

    render(this.#summaryComponent, this.#headerElement);
  }

  #renderFilter() {
    this.#filterComponent = new TripFilterView({
      filter: this.#filter,
      availableTimeStatuses: extractEventTimeStatuses(this.#allEvents),
      onFilterChange: this.#filterChangeHandler,
    });

    render(this.#filterComponent, this.#headerElement);
  }

  #renderAddEventButtonComponent() {
    this.#addEventButtonComponent = new AddEventButtonView({
      onButtonClick: this.#addEventButtonClickHandler,
    });

    render(this.#addEventButtonComponent, this.#headerElement);
  }

  #renderMessage() {
    let messageVariant;

    switch (this.#filter) {
      case TimeStatus.PAST:
        messageVariant = MessageVariant.NoPastEvents;
        break;
      case TimeStatus.ONGOING:
        messageVariant = MessageVariant.NoOngoingEvents;
        break;
      case TimeStatus.UPCOMING:
        messageVariant = MessageVariant.NoUpcomingEvents;
        break;
      default:
        messageVariant = MessageVariant.NoEvents;
    }

    this.#messageComponent = new TripMessage({ variant: messageVariant });
    render(this.#messageComponent, this.#headerElement, RenderPosition.AFTEREND);
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
      onEventDelete: this.#eventDeleteHandler,
    });

    this.#eventPresenters.set(event.id, eventPresenter);
    eventPresenter.init(event);
  }

  #renderEventCards() {
    this.#displayedEvents.forEach((event) => this.#renderEventCard(event));
  }

  #renderEventList() {
    this.#eventListComponent = new EventListView();
    render(this.#eventListComponent, this.#headerElement, RenderPosition.AFTEREND);
  }

  #renderEvents() {
    if (this.#displayedEvents.length) {
      this.#renderEventList();
      this.#renderSort();
      this.#renderEventCards();
    } else {
      this.#renderMessage();
    }
  }

  #render() {
    if (this.#allEvents.length) {
      this.#renderSummary();
    }

    this.#renderFilter();
    this.#renderAddEventButtonComponent();
    this.#renderEvents();
  }

  #destroyNewEventForm() {
    this.#newEventFormPresenter?.destroy();
    this.#newEventFormPresenter = null;
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    this.#editingEventPresenter = null;
    this.#destroyNewEventForm();
  }

  #destroyEventList() {
    remove(this.#eventListComponent);
    this.#eventListComponent = null;
  }

  #destroyMessage() {
    remove(this.#messageComponent);
    this.#messageComponent = null;
  }

  #clearEvents() {
    this.#clearEventList();
    this.#destroyEventList();
    this.#destroyMessage();
    remove(this.#sortComponent);
    this.#sortComponent = null;
  }

  #clear() {
    remove(this.#summaryComponent);
    remove(this.#filterComponent);
    remove(this.#addEventButtonComponent);
    this.#clearEvents();
    this.#summaryComponent = null;
    this.#filterComponent = null;
    this.#addEventButtonComponent = null;
  }

  #resetFilter() {
    this.#filterComponent.setFilter(null);
  }

  #resetSort() {
    this.#sortComponent.setValue(this.#defaultSortType);
  }

  #filterChangeHandler = (filter) => {
    this.#filter = filter;
    this.#sortType = this.#defaultSortType;
    this.#clearEvents();
    this.#renderEvents();
  };

  #sortChangeHandler = (value) => {
    this.#sortType = value;
    this.#clearEventList();
    this.#renderEventCards();
  };

  #eventCreateHandler = (eventData) => {
    this.#model.createEvent(eventData);
    this.#clear();
    this.#render();
  };

  #eventUpdateHandler = (eventData) => {
    this.#model.updateEvent(eventData);
    this.#clear();
    this.#render();
  };

  #eventDeleteHandler = (eventId) => {
    this.#model.deleteEvent(eventId);
    this.#clear();

    if (!this.#allEvents.length) {
      this.#filter = null;
    }

    this.#render();
  };

  #eventEnterEditModeHandler = (eventPresenter) => {
    this.#destroyNewEventForm();
    this.#editingEventPresenter?.exitEditMode();
    this.#editingEventPresenter = eventPresenter;
  };

  #eventExitEditModeHandler = () => {
    this.#editingEventPresenter = null;
  };

  #newEventCancelHandler = () => {
    this.#newEventFormPresenter = null;

    if (!this.#displayedEvents.length) {
      this.#destroyEventList();
      this.#renderMessage();
    }

    this.#addEventButtonComponent.enable();
  };

  #addEventButtonClickHandler = () => {
    this.#editingEventPresenter?.exitEditMode();

    if (this.#filter) {
      this.#resetFilter();
    } else if (this.#sortType !== this.#defaultSortType) {
      this.#resetSort();
    }

    if (!this.#displayedEvents.length) {
      this.#destroyMessage();
      this.#renderEventList();
    }

    this.#addEventButtonComponent.disable();

    this.#newEventFormPresenter = new NewEventFormPresenter({
      containerElement: this.#eventListComponent.element,
      destinations: this.#destinations,
      offers: this.#offers,
      onEventCancel: this.#newEventCancelHandler,
      onEventCreate: this.#eventCreateHandler,
    });

    this.#newEventFormPresenter.init();
  };
}
