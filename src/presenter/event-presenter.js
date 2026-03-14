import { render, replace, remove } from '../framework';
import { isEscapeEvent } from '../utils';
import EventCardView from '../view/event-card-view.js';
import EventFormView from '../view/event-form-view.js';

export default class EventPresenter {
  #containerElement = null;
  #destinations = [];
  #offers = [];
  #onEventEnterEditMode = null;
  #onEventExitEditMode = null;

  #event = null;
  #cardComponent = null;
  #formComponent = null;

  constructor({
    containerElement,
    destinations,
    offers,
    onEventEnterEditMode,
    onEventExitEditMode,
  }) {
    this.#containerElement = containerElement;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onEventEnterEditMode = onEventEnterEditMode;
    this.#onEventExitEditMode = onEventExitEditMode;
  }

  init(event) {
    this.#event = event;
    const newCardComponent = this.#createCardComponent();

    if (this.#cardComponent) {
      replace(newCardComponent, this.#cardComponent);
    } else {
      render(newCardComponent, this.#containerElement);
    }

    this.#cardComponent = newCardComponent;
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
    this.#onEventEnterEditMode(this);
  }

  exitEditMode() {
    this.#cardComponent = this.#createCardComponent();
    replace(this.#cardComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#documentKeyDownHandler);
    this.#formComponent = null;
    this.#onEventExitEditMode();
  }

  destroy() {
    document.removeEventListener('keydown', this.#documentKeyDownHandler);
    remove(this.#cardComponent);
    remove(this.#formComponent);
  }

  #cardEditButtonClickHandler = () => {
    this.#enterEditMode();
  };

  #formCloseButtonClickHandler = () => {
    this.exitEditMode();
  };

  #documentKeyDownHandler = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this.exitEditMode();
    }
  };
}
