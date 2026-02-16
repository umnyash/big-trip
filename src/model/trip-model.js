import { mockDestinations, mockOffers, generateMockEvents } from '../mocks';

const SOME_EVENTS_COUNT = 4;

export default class TripModel {
  destinations = mockDestinations;
  events = generateMockEvents(SOME_EVENTS_COUNT);
  offers = mockOffers;

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
