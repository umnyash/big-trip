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

const EVENT_CARDS_COUNT = 3;

export default class TripPresenter {
  eventListComponent = new EventListView();

  constructor({ headerElement }) {
    this.headerElement = headerElement;
  }

  init() {
    render(new TripTitleView(), this.headerElement);
    render(new TripDatesView(), this.headerElement);
    render(new TripPriceView(), this.headerElement);
    render(new TripFilterView(), this.headerElement);
    render(new AddEventButtonView(), this.headerElement);
    render(this.eventListComponent, this.headerElement, RenderPosition.AFTEREND);
    render(new TripSortView(), this.headerElement, RenderPosition.AFTEREND);

    render(new EventFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < EVENT_CARDS_COUNT; i++) {
      render(new EventCardView(), this.eventListComponent.getElement());
    }
  }
}
