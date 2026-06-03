import { createElement } from '../render.js';
import './abstract-view.css';

/** @const {string} Класс CSS, реализующий эффект "покачивания головой" */
const SHAKE_ANIMATION_CLASS_NAME = 'shake';

/** @const {number} Время анимации в миллисекундах */
const SHAKE_ANIMATION_TIMEOUT = 600;

/**
 * Абстрактный класс представления
 */
export default class AbstractView {
  /** @type {HTMLElement|null} Элемент представления */
  #element = null;

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('AbstractView can\'t be instantiated directly');
    }
  }

  /**
   * Геттер для получения элемента
   * @returns {HTMLElement} Элемент представления
   */
  get element() {
    this.#element ??= createElement(this._getTemplate());
    return this.#element;
  }

  /**
   * Метод для получения разметки элемента
   * @abstract
   * @returns {string} Разметка элемента в виде строки
   */
  _getTemplate() {
    throw new Error('Abstract method not implemented: _getTemplate');
  }

  /** Метод для удаления элемента */
  removeElement() {
    this.#element = null;
  }

  /**
   * Метод, реализующий эффект "покачивания головой"
   * @param {HTMLElement} [targetElement] Элемент, к которому будет применена анимация
   * @param {shakeCallback} [callback] Функция, которая будет вызвана после завершения анимации
   */
  shake(targetElement = this.element, callback) {
    targetElement.classList.add(SHAKE_ANIMATION_CLASS_NAME);

    setTimeout(() => {
      targetElement.classList.remove(SHAKE_ANIMATION_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

/**
 * Функция, которая будет вызвана методом shake после завершения анимации
 * @callback shakeCallback
 */
