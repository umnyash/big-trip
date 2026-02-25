import { AbstractView } from '../framework';

function createTripTitleTemplate() {
  return '<h2 class="trip-header__title">Berlin &mdash; Frankfurt &mdash; Munich</h2>';
}

export default class TripTitleView extends AbstractView {
  _getTemplate() {
    return createTripTitleTemplate();
  }
}
