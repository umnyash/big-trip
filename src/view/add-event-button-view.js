import { AbstractView } from '../framework';

function createAddEventButtonTemplate() {
  return '<button class="trip-header__add-button button button--accent button--size_l" type="button" data-text-icon="+">New event</button>';
}

export default class AddEventButtonView extends AbstractView {
  #onButtonClick = null;

  constructor({ onButtonClick }) {
    super();
    this.#onButtonClick = onButtonClick;
    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  _getTemplate() {
    return createAddEventButtonTemplate();
  }

  enable() {
    this.element.disabled = false;
  }

  disable() {
    this.element.disabled = true;
  }

  #buttonClickHandler = () => {
    this.#onButtonClick();
  };
}
