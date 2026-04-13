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

export { filterEvents, sortEventsBy };
