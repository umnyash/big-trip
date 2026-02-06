import { createElement } from '../framework';

function createEventListTemplate() {
  return '<ul class="trip__list event-list"></ul>';
}

export default class EventListView {
  getTemplate() {
    return createEventListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
