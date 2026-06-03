export default class TripApiAdapter {
  static adaptEventToClient(eventData) {
    return {
      id: eventData.id,
      type: eventData.type,
      destinationId: eventData.destination,
      startDate: eventData.date_from,
      endDate: eventData.date_to,
      basePrice: eventData.base_price,
      offerIds: eventData.offers,
      isFavorite: eventData.is_favorite,
    };
  }

  static adaptEventToServer(eventData) {
    return {
      ...('id' in eventData && { id: eventData.id }),
      type: eventData.type,
      destination: eventData.destinationId,
      'date_from': eventData.startDate,
      'date_to': eventData.endDate,
      'base_price': eventData.basePrice,
      offers: eventData.offerIds,
      'is_favorite': eventData.isFavorite,
    };
  }

  static adaptDestinationsToClient(destinationsData) {
    return destinationsData.reduce((destinationsById, destination) => {
      const images = destination.pictures.map(({ src, description }) => ({
        url: src,
        description,
      }));

      destinationsById[destination.id] = {
        name: destination.name,
        description: destination.description,
        images,
      };

      return destinationsById;
    }, {});
  }

  static adaptOffersToClient(offersData) {
    return offersData.reduce((offersByType, { type, offers }) => {
      offersByType[type] = offers.reduce((offersById, { id, title, price }) => {
        offersById[id] = { title, price };
        return offersById;
      }, {});

      return offersByType;
    }, {});
  }
}
