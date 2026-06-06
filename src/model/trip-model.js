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

  async createEvent(eventData) {
    try {
      const newEvent = await this.#tripApiService.createEvent(eventData);
      this.#events.push(newEvent);
    } catch {
      throw new Error('Can\'t create event');
    }
  }

  async updateEvent(eventData) {
    const eventIndex = this.#events.findIndex(({ id }) => id === eventData.id);

    if (eventIndex === -1) {
      throw new Error(`Can't update unexisting event (id: ${eventData.id})`);
    }

    try {
      const updatedEvent = await this.#tripApiService.updateEvent(eventData);
      this.#events[eventIndex] = updatedEvent;
      return updatedEvent;
    } catch {
      throw new Error(`Can't update event (id: ${eventData.id})`);
    }
  }

  async deleteEvent(eventId) {
    const eventIndex = this.#events.findIndex(({ id }) => id === eventId);

    if (eventIndex === -1) {
      throw new Error(`Can't delete unexisting event (id: ${eventId})`);
    }

    try {
      await this.#tripApiService.deleteEvent(eventId);
      this.#events.splice(eventIndex, 1);
    } catch {
      throw new Error(`Can't delete event (id: ${eventId})`);
    }
  }
}
