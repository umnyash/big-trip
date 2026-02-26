import { AbstractView } from '../framework';

const MessageVariant = {
  Loading: 'Loading',
  LoadFailed: 'LoadFailed',
  NoEvents: 'NoEvents',
  NoPastEvents: 'NoPastEvents',
  NoCurrentEvents: 'NoCurrentEvents',
  NoUpcomingEvents: 'NoUpcomingEvents',
};

const messages = {
  [MessageVariant.Loading]: 'Loading<span class="animated-ellipsis"><span>...</span></span>',
  [MessageVariant.LoadFailed]: 'We couldn’t load route information.<br> Please try again later',
  [MessageVariant.NoEvents]: 'Click New Event to create your first point',
  [MessageVariant.NoPastEvents]: 'No past events',
  [MessageVariant.NoCurrentEvents]: 'No current events',
  [MessageVariant.NoUpcomingEvents]: 'No upcoming events',
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

  get template() {
    return createTripMessageTemplate(this.#variant);
  }
}

export { MessageVariant };
