import { mockDestinations, mockOffers, generateMockEvents, generateMockEventId } from '../mocks';
import { updateArrayItemById, deleteArrayItemById } from '../utils';

const SOME_EVENTS_COUNT = 4;

export default class TripModel {
  #destinations = mockDestinations;
  #events = generateMockEvents(SOME_EVENTS_COUNT);
  #offers = mockOffers;

  get events() {
    return this.#events;
  }

  createEvent(eventData) {
    this.#events.push({
      id: generateMockEventId(),
      ...eventData,
    });
  }

  updateEvent(eventData) {
    updateArrayItemById(this.#events, eventData);
  }

  deleteEvent(eventId) {
    deleteArrayItemById(this.#events, eventId);
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
