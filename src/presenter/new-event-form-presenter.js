import { RenderPosition, render, remove } from '../framework';
import { isEscapeEvent } from '../utils';
import EventFormView from '../view/event-form-view.js';

export default class NewEventFormPresenter {
  #containerElement = null;
  #destinations = [];
  #offers = [];
  #onEventCancel = null;
  #onEventCreate = null;
  #formComponent = null;

  constructor({
    containerElement,
    destinations,
    offers,
    onEventCreate,
    onEventCancel,
  }) {
    this.#containerElement = containerElement;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onEventCancel = onEventCancel;
    this.#onEventCreate = onEventCreate;
  }

  init() {
    this.#formComponent = new EventFormView({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#formSubmitHandler,
      onCloseButtonClick: this.#formCloseButtonClickHandler,
    });

    render(this.#formComponent, this.#containerElement, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#documentKeyDownHandler);
  }

  destroy() {
    document.removeEventListener('keydown', this.#documentKeyDownHandler);
    remove(this.#formComponent);
  }

  #cancel() {
    this.destroy();
    this.#onEventCancel();
  }

  #formSubmitHandler = (eventData) => {
    this.#onEventCreate(eventData);
  };

  #formCloseButtonClickHandler = () => {
    this.#cancel();
  };

  #documentKeyDownHandler = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this.#cancel();
    }
  };
}
