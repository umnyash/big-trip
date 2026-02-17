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

export default class TripPresenter {
  eventListComponent = new EventListView();

  constructor({ headerElement, model }) {
    this.headerElement = headerElement;
    this.model = model;
  }

  init() {
    this.destinations = this.model.getDestinations();
    this.events = this.model.getEvents();
    this.offers = this.model.getOffers();

    render(new TripTitleView(), this.headerElement);
    render(new TripDatesView(), this.headerElement);
    render(new TripPriceView(), this.headerElement);
    render(new TripFilterView(), this.headerElement);
    render(new AddEventButtonView(), this.headerElement);
    render(this.eventListComponent, this.headerElement, RenderPosition.AFTEREND);
    render(new TripSortView(), this.headerElement, RenderPosition.AFTEREND);

    render(new EventFormView(), this.eventListComponent.getElement());

    for (let i = 1; i < this.events.length; i++) {
      const event = this.events[i];

      render(
        new EventCardView({
          event,
          destination: this.destinations[event.destinationId],
          offers: this.offers[event.type],
        }),
        this.eventListComponent.getElement()
      );
    }
  }
}
