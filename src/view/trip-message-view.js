import { AbstractView } from '../framework';

const MessageVariant = {
  LOADING: 'loading',
  LOAD_FAILED: 'load failed',
  NO_EVENTS: 'no events',
  NO_PAST_EVENTS: 'no past events',
  NO_ONGOING_EVENTS: 'no ongoing events',
  NO_UPCOMING_EVENTS: 'no upcoming events',
};

const messages = {
  [MessageVariant.LOADING]: 'Loading<span class="animated-ellipsis"><span>...</span></span>',
  [MessageVariant.LOAD_FAILED]: 'We couldn’t load route information.<br> Please try again later',
  [MessageVariant.NO_EVENTS]: 'Click New Event to create your first point',
  [MessageVariant.NO_PAST_EVENTS]: 'No past events',
  [MessageVariant.NO_ONGOING_EVENTS]: 'No ongoing events',
  [MessageVariant.NO_UPCOMING_EVENTS]: 'No upcoming events',
};

function createTripMessageTemplate(variant) {
  return `<p class="trip__message">${messages[variant]}</p>`;
}

export default class TripMessage extends AbstractView {
  #variant = null;

  constructor({ variant }) {
    super();
    this.#variant = variant;
  }

  _getTemplate() {
    return createTripMessageTemplate(this.#variant);
  }
}

export { MessageVariant };
