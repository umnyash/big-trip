import AddEventButtonView from '../view/add-event-button-view.js';
import AddEventFormView from '../view/add-event-form-view.js';
import EventCardView from '../view/event-card-view.js';
import EventsListView from '../view/events-list-view.js';
import TripDatesView from '../view/trip-dates-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripPriceView from '../view/trip-price-view.js';
import TripSortingView from '../view/trip-sorting-view.js';
import TripTitleView from '../view/trip-title-view.js';

import { RenderPosition, render } from '../framework/render.js';

const SOME_EVENTS_COUNT = 3;

export default class TripPresenter {
  eventsListComponent = new EventsListView();

  constructor({ tripHeaderElement }) {
    this.tripHeaderElement = tripHeaderElement;
  }

  init() {
    render(new TripTitleView(), this.tripHeaderElement);
    render(new TripDatesView(), this.tripHeaderElement);
    render(new TripPriceView(), this.tripHeaderElement);
    render(new TripFilterView(), this.tripHeaderElement);
    render(new AddEventButtonView(), this.tripHeaderElement);
    render(this.eventsListComponent, this.tripHeaderElement, RenderPosition.AFTEREND);
    render(new TripSortingView(), this.tripHeaderElement, RenderPosition.AFTEREND);

    render(new AddEventFormView(), this.eventsListComponent.getElement());

    for (let i = 0; i < SOME_EVENTS_COUNT; i++) {
      render(new EventCardView(), this.eventsListComponent.getElement());
    }
  }
}
