import { AbstractView } from '../framework';

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

export default class AddEventButtonView extends AbstractView {
  _getTemplate() {
    return createAddEventButtonTemplate();
  }
}
