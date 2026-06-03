import { generateMockEventId } from '../mocks';
import { updateArrayItemById, deleteArrayItemById } from '../utils';

export default class TripModel {
  #tripApiService = null;

  #destinations = null;
  #events = [];
  #offers = null;

  constructor({ tripApiService }) {
    this.#tripApiService = tripApiService;
  }

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      [this.#destinations, this.#events, this.#offers] = await Promise.all([
        this.#tripApiService.getDestinations(),
        this.#tripApiService.getEvents(),
        this.#tripApiService.getOffers(),
      ]);
    } catch {
      throw new Error('Cat\'t load data');
    }
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
}
