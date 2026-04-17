import { AbstractView } from '../framework';
import { formatDateRange } from '../utils';

const MAX_DESTINATIONS_IN_TITLE = 3;

function createTripSummaryTitleTemplate(route) {
  const destinationNames = route.length > MAX_DESTINATIONS_IN_TITLE
    ? [route[0], '…', route.at(-1)]
    : route;

  const title = destinationNames.join(' &mdash; ');

  return `<h2 class="trip-header__title">${title}</h2>`;
}

function createTripSummaryTemplate({ route, dates, price }) {
  const { startDate, endDate } = dates;
  const [formattedStartDate, formattedEndDate] = formatDateRange(startDate, endDate);

  return (
    `<div class="trip-header__summary">
      ${createTripSummaryTitleTemplate(route)}
      <p class="trip-header__dates">
        <time datetime="${startDate}">${formattedStartDate}</time> &mdash; <time datetime="${endDate}">${formattedEndDate}</time>
      </p>
      <p class="trip-header__price">Total: €&nbsp;${price}</p>
    </div>`
  );
}

export default class TripSummary extends AbstractView {
  #route = null;
  #dates = null;
  #price = null;

  constructor({ route, dates, price }) {
    super();
    this.#route = route;
    this.#dates = dates;
    this.#price = price;
  }

  _getTemplate() {
    return createTripSummaryTemplate({
      route: this.#route,
      dates: this.#dates,
      price: this.#price,
    });
  }
}
