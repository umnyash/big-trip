import { SortType, TimeStatus } from '../constants.js';
import { calcDuration } from './date.js';

const eventComparators = {
  [SortType.DATE_ASC]: (eventA, eventB) => new Date(eventA.startDate) - new Date(eventB.startDate),

  [SortType.DURATION_DESC]: (eventA, eventB) =>
    calcDuration(eventB.startDate, eventB.endDate) - calcDuration(eventA.startDate, eventA.endDate),

  [SortType.PRICE_DESC]: (eventA, eventB) => eventB.basePrice - eventA.basePrice,
};

function sortEventsBy(events, sortType) {
  const comparator = eventComparators[sortType];

  if (!comparator) {
    throw new Error(`Unsupported sort type: ${sortType}`);
  }

  return events.toSorted(comparator);
}

const eventTimeStatusCheckers = {
  [TimeStatus.PAST]: (event, currentDate) => new Date(event.endDate) < currentDate,
  [TimeStatus.UPCOMING]: (event, currentDate) => new Date(event.startDate) > currentDate,
  [TimeStatus.ONGOING]: (event, currentDate) => new Date(event.startDate) <= currentDate && new Date(event.endDate) >= currentDate,
};

function checkEventTimeStatus(event, timeStatus, currentDate) {
  const checker = eventTimeStatusCheckers[timeStatus];

  if (!checker) {
    throw new Error(`Unsupported time status: ${timeStatus}`);
  }

  return checker(event, currentDate);
}

function filterEvents(events, timeStatus) {
  const currentDate = Date.now();
  return events.filter((event) => checkEventTimeStatus(event, timeStatus, currentDate));
}

function extractTripRoute(events, destinations) {
  const sortedEvents = sortEventsBy(events, SortType.DATE_ASC);

  return sortedEvents.reduce((route, event) => {
    const destinationName = destinations[event.destinationId].name;

    if (route.at(-1) !== destinationName) {
      route.push(destinationName);
    }

    return route;
  }, []);
}

function getTripDates(events) {
  let startDate = new Date(events[0].startDate);
  let endDate = new Date(events[0].endDate);

  events.forEach((event) => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);

    if (eventStartDate < startDate) {
      startDate = eventStartDate;
    }

    if (eventEndDate > endDate) {
      endDate = eventEndDate;
    }
  });

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}

function calcTripPrice(events, offers) {
  return events.reduce((tripPrice, event) => {
    const eventOffersPrice = event.offerIds.reduce(
      (offersPrice, offerId) => offersPrice + offers[event.type][offerId].price,
      0,
    );

    const eventPrice = event.basePrice + eventOffersPrice;
    return tripPrice + eventPrice;
  }, 0);
}

export {
  extractTripRoute,
  getTripDates,
  calcTripPrice,
  filterEvents,
  sortEventsBy,
};
