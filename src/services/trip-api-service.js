import { ApiService } from '../framework';
import TripApiAdapter from './trip-api-adapter.js';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export default class TripApiService extends ApiService {
  async getEvents() {
    const response = await this._load({ url: 'points' });
    const data = await ApiService.parseResponse(response);
    return data.map(TripApiAdapter.adaptEventToClient);
  }

  async createEvent(eventData) {
    const response = await this._load({
      url: 'points',
      method: HttpMethod.POST,
      body: JSON.stringify(TripApiAdapter.adaptEventToServer(eventData)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const data = await ApiService.parseResponse(response);
    return TripApiAdapter.adaptEventToClient(data);
  }

  async updateEvent(eventData) {
    const response = await this._load({
      url: `points/${eventData.id}`,
      method: HttpMethod.PUT,
      body: JSON.stringify(TripApiAdapter.adaptEventToServer(eventData)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const data = await ApiService.parseResponse(response);
    return TripApiAdapter.adaptEventToClient(data);
  }

  async deleteEvent(eventId) {
    await this._load({
      url: `points/${eventId}`,
      method: HttpMethod.DELETE,
    });
  }

  async getDestinations() {
    const response = await this._load({ url: 'destinations' });
    const data = await ApiService.parseResponse(response);
    return TripApiAdapter.adaptDestinationsToClient(data);
  }

  async getOffers() {
    const response = await this._load({ url: 'offers' });
    const data = await ApiService.parseResponse(response);
    return TripApiAdapter.adaptOffersToClient(data);
  }
}
