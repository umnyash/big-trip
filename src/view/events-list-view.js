import { createElement } from '../framework/render.js';

function createEventsListTemplate() {
  return '<ul class="trip__list events-list"></ul>';
}

export default class EventsListView {
  getTemplate() {
    return createEventsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
