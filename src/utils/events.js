import { SortType } from '../constants.js';
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

export { sortEventsBy };
