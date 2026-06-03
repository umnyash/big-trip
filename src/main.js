import TripModel from './model/trip-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripApiService from './services/trip-api-service.js';

const AUTHORIZATION = 'Basic umnyash';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const tripHeaderElement = document.querySelector('.trip__header');

const tripModel = new TripModel({
  tripApiService: new TripApiService(END_POINT, AUTHORIZATION),
});

const tripPresenter = new TripPresenter({
  headerElement: tripHeaderElement,
  model: tripModel,
});

tripPresenter.init();
