import { render, replace } from '../framework';
import { isEscapeEvent } from '../utils';
import EventCardView from '../view/event-card-view.js';
import EventFormView from '../view/event-form-view.js';

export default class EventPresenter {
  #containerElement = null;
  #destinations = [];
  #offers = [];

  #event = null;
  #cardComponent = null;
  #formComponent = null;

  constructor({ containerElement, destinations, offers }) {
    this.#containerElement = containerElement;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init(event) {
    this.#event = event;
    this.#cardComponent = this.#createCardComponent();
    render(this.#cardComponent, this.#containerElement);
  }

  #createCardComponent() {
    return new EventCardView({
      event: this.#event,
      destination: this.#destinations[this.#event.destinationId],
      offers: this.#offers[this.#event.type],
      onEditButtonClick: this.#cardEditButtonClickHandler,
    });
  }

  #createFormComponent() {
    return new EventFormView({
      event: this.#event,
      destinations: this.#destinations,
      offers: this.#offers,
      onCloseButtonClick: this.#formCloseButtonClickHandler,
    });
  }

  #enterEditMode() {
    this.#formComponent = this.#createFormComponent();
    replace(this.#formComponent, this.#cardComponent);
    document.addEventListener('keydown', this.#documentKeyDownHandler);
    this.#cardComponent = null;
  }

  #exitEditMode() {
    this.#cardComponent = this.#createCardComponent();
    replace(this.#cardComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#documentKeyDownHandler);
    this.#formComponent = null;
  }

  #cardEditButtonClickHandler = () => {
    this.#enterEditMode();
  };

  #formCloseButtonClickHandler = () => {
    this.#exitEditMode();
  };

  #documentKeyDownHandler = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this.#exitEditMode();
    }
  };
}
