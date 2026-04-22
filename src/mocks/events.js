import dayjs from 'dayjs';
import { eventTypeIds } from '../data';
import { mockDestinations } from './destinations.js';
import { mockOffers } from './offers.js';
import { generateRandomInt, getRandomArrayItem, getUniqueRandomArrayItems } from './utils.js';

const TIME_UNIT = 'minute';

const BasePrice = {
  MIN: 25,
  MAX: 200,
};

const StartDateOffsetInMinutes = {
  MIN: -4320, // -3 days
  MAX: 4320, // +3 days
};

const DurationInMinutes = {
  MIN: 20,
  MAX: 4320, // 3 days
};

function createEventIdGenerator() {
  let eventNumber = 0;
  return () => `event-${++eventNumber}-id`;
}

const generateMockEventId = createEventIdGenerator();

function generateDates(baseDate) {
  const startDateOffset = generateRandomInt(StartDateOffsetInMinutes.MIN, StartDateOffsetInMinutes.MAX);
  const duration = generateRandomInt(DurationInMinutes.MIN, DurationInMinutes.MAX);

  const startDate = baseDate.add(startDateOffset, TIME_UNIT);
  const endDate = startDate.add(duration, TIME_UNIT);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}

function generateMockEvents(count) {
  const destinationsIds = Object.keys(mockDestinations);
  const now = dayjs().second(0).millisecond(0);

  return Array.from({ length: count }, () => {
    const type = getRandomArrayItem(eventTypeIds);
    const offerIdsOfType = Object.keys(mockOffers[type]);

    return {
      id: generateMockEventId(),
      type,
      destinationId: getRandomArrayItem(destinationsIds),
      ...generateDates(now),
      basePrice: generateRandomInt(BasePrice.MIN, BasePrice.MAX),
      offerIds: getUniqueRandomArrayItems(offerIdsOfType),
      isFavorite: Boolean(generateRandomInt(0, 1)),
    };
  });
}

export { generateMockEvents, generateMockEventId };
