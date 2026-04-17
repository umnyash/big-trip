import { AbstractView } from '../framework';

const MAX_DESTINATIONS_IN_TITLE = 3;

function createTripSummaryTitleTemplate(route) {
  const destinationNames = route.length > MAX_DESTINATIONS_IN_TITLE
    ? [route[0], '…', route.at(-1)]
    : route;

  const title = destinationNames.join(' &mdash; ');

  return `<h2 class="trip-header__title">${title}</h2>`;
}

function createTripSummaryTemplate({ route }) {
  return (
    `<div class="trip-header__summary">
      ${createTripSummaryTitleTemplate(route)}
      <p class="trip-header__dates">
        <time datetime="2026-08-14">14</time> &mdash; <time datetime="2026-08-16">16 Aug</time>
      </p>
      <p class="trip-header__price">Total: €&nbsp;1415</p>
    </div>`
  );
}

export default class TripSummary extends AbstractView {
  #route = null;

  constructor({ route }) {
    super();
    this.#route = route;
  }

  _getTemplate() {
    return createTripSummaryTemplate({
      route: this.#route,
    });
  }
}
