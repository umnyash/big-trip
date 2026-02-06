import TripPresenter from './presenter/trip-presenter.js';

const tripHeaderElement = document.querySelector('.trip__header');
const tripPresenter = new TripPresenter({ tripHeaderElement });

tripPresenter.init();
