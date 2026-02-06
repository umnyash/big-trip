import { createElement } from '../framework/render.js';

function createAddEventButtonTemplate() {
  return (
    `<button
      class="trip-header__add-button button button--accent button--size_l"
      type="button"
      data-text-icon="+"
    >
      New event
    </button>`
  );
}

export default class AddEventButtonView {
  getTemplate() {
    return createAddEventButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
