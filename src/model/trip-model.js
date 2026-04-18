import { mockDestinations, mockOffers, generateMockEvents } from '../mocks';
import { updateArrayItemById } from '../utils';

const SOME_EVENTS_COUNT = 4;

export default class TripModel {
  #destinations = mockDestinations;
  #events = generateMockEvents(SOME_EVENTS_COUNT);
  #offers = mockOffers;

  get events() {
    return this.#events;
  }

  updateEvent(eventData) {
    updateArrayItemById(this.#events, eventData);
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
