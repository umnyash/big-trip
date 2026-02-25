import { AbstractView } from '../framework';

function createTripDatesTemplate() {
  return (
    `<p class="trip-header__dates">
      <time datetime="2026-08-14">14</time> &mdash; <time datetime="2026-08-16">16 Aug</time>
    </p>`
  );
}

export default class TripDatesView extends AbstractView {
  _getTemplate() {
    return createTripDatesTemplate();
  }
}
