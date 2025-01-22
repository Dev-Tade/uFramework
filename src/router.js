import { Root } from "./root.js";

export class Router {
  static #routes = {};
  static #isInitialized = false;
  
  static at(path, target) {
    if (this.#isInitialized) {
      throw new Error("Cannot add routes once router has ben initialized");
    }
    
    this.#routes[path] = target;
    return this;
  }

  static init() {
    if (this.#isInitialized) {
      throw new Error("Cannot re init an already running router");
    }

    this.#isInitialized = true;

    window.onpopstate = () => this.stateChange();
  }

  static stateChange() {
    if (!this.#isInitialized) {
      throw new Error("No router is initialized");
    }

    const path = window.location.pathname;
    const target = this.#routes[path];

    if (target != null) {
      Root.clear();
      target();
    }
    else {
      console.error(`Path: "${path}" has no target assigned`);
    }
  }

  static navigate(new_path) {
    if (!this.#isInitialized) {
      throw new Error("Cannot navigate with an uninitialzed router");
    }

    const current_path = window.location.pathname;

    if (new_path == current_path) return; // Prevent going to the page you already are

    history.pushState({}, "", new_path); // Save new page to history
    this.stateChange(); // History.pushState doesn't trigger a popstate apparently
  }
}