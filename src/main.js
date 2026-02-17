import TripModel from './model/trip-model.js';
import TripPresenter from './presenter/trip-presenter.js';

const tripHeaderElement = document.querySelector('.trip__header');
const tripModel = new TripModel();

const tripPresenter = new TripPresenter({
  headerElement: tripHeaderElement,
  model: tripModel,
});

tripPresenter.init();
