import { createElement } from '../framework/render.js';

function createEventCardTemplate() {
  return (
    `<li class="events-list__item">
      <article class="events-list__card event-card">
        <h3 class="event-card__title">Bus Berlin</h3>
        <span class="event-card__icon event-icon">
          <img class="event-icon__image" src="img/icons/event-types/bus.png" width="18" height="18" alt="">
        </span>
        <time class="event-card__day" datetime="2026-08-14">Aug 14</time>
        <p class="event-card__time">
          <time datetime="2026-08-14T09:00">09:00</time>
          &mdash;
          <time datetime="2026-08-14T09:45">09:45</time>
        </p>
        <p class="event-card__duration">45m</p>
        <p class="event-card__price">€&nbsp;25</p>
        <h4 class="visually-hidden">Offers</h4>
        <ul class="event-card__offers">
          <li class="event-card__offer">Choose seats +&#8288;€&nbsp;5</li>
          <li class="event-card__offer">Infotainment system +&#8288;€&nbsp;3</li>
          <li class="event-card__offer">Order meal +&#8288;€&nbsp;7</li>
        </ul>
        <button class="event-card__favorite-button favorite-button" type="button" aria-pressed="true">
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
  getTemplate() {
    return createEventCardTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
