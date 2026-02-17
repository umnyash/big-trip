import { createElement } from '../framework';
import { eventTypes } from '../data';
import { formatTime, formatDay, getFormattedDuration } from '../utils';

function createEventCardOffersTemplate(event, offers) {
  if (!event.offerIds.length) {
    return '';
  }

  return (
    `<h4 class="visually-hidden">Offers</h4>
    <ul class="event-card__offers">
      ${event.offerIds.map((id) => `
        <li class="event-card__offer">
          ${offers[id].title} +&#8288;€&nbsp;${offers[id].price}
        </li>
      `).join('')}
    </ul>`
  );
}

function createEventCardTemplate({ destination, event, offers }) {
  const { startDate, endDate, basePrice, isFavorite } = event;

  const type = eventTypes[event.type];
  const day = formatDay(startDate);
  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);
  const duration = getFormattedDuration(startDate, endDate);

  return (
    `<li class="event-list__item">
      <article class="event-list__card event-card">
        <h3 class="event-card__title">${type.title} ${destination.name}</h3>
        <span class="event-card__icon event-icon" aria-hidden="true">
          <img class="event-icon__image" src="${type.iconUrl}" width="18" height="18" alt="">
        </span>
        <time class="event-card__day" datetime="${startDate}">${day}</time>
        <p class="event-card__time">
          <time datetime="${startDate}">${startTime}</time>
          &mdash;
          <time datetime="${endDate}">${endTime}</time>
        </p>
        <p class="event-card__duration">${duration}</p>
        <p class="event-card__price">€&nbsp;${basePrice}</p>
        ${createEventCardOffersTemplate(event, offers)}
        <button class="event-card__favorite-button favorite-button" type="button" aria-pressed="${isFavorite}">
          <span class="visually-hidden">Add to favorite</span>
        </button>
        <button class="event-card__edit-button arrow-button" type="button">
          <span class="visually-hidden">Edit event</span>
        </button>
      </article>
    </li>`
  );
}

export default class EventCardView {
  constructor({ event, destination, offers }) {
    this.event = event;
    this.destination = destination;
    this.offers = offers;
  }

  getTemplate() {
    return createEventCardTemplate({
      event: this.event,
      destination: this.destination,
      offers: this.offers,
    });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
