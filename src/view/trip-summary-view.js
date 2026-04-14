import { AbstractView } from '../framework';

function createTripSummaryTemplate() {
  return (
    `<div class="trip-header__summary">
      <h2 class="trip-header__title">Berlin &mdash; Frankfurt &mdash; Munich</h2>
      <p class="trip-header__dates">
        <time datetime="2026-08-14">14</time> &mdash; <time datetime="2026-08-16">16 Aug</time>
      </p>
      <p class="trip-header__price">Total: €&nbsp;1415</p>
    </div>`
  );
}

export default class TripSummary extends AbstractView {
  _getTemplate() {
    return createTripSummaryTemplate();
  }
}
