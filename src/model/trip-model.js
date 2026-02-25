import { mockDestinations, mockOffers, generateMockEvents } from '../mocks';

const SOME_EVENTS_COUNT = 4;

export default class TripModel {
  #destinations = mockDestinations;
  #events = generateMockEvents(SOME_EVENTS_COUNT);
  #offers = mockOffers;

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
