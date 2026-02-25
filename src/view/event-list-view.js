import { AbstractView } from '../framework';

function createEventListTemplate() {
  return '<ul class="trip__list event-list"></ul>';
}

export default class EventListView extends AbstractView {
  _getTemplate() {
    return createEventListTemplate();
  }
}
