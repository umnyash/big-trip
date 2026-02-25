import { AbstractView } from '../framework';

function createTripPriceTemplate() {
  return '<p class="trip-header__price">Total: €&nbsp;1415</p>';
}

export default class TripPriceView extends AbstractView {
  _getTemplate() {
    return createTripPriceTemplate();
  }
}
