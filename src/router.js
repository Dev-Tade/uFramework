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
    
    const oldPushState = history.pushState;
    const oldReplaceState = history.replaceState;
    
    history.pushState = (data, unused, url) => {
      oldPushState.call(history, data, unused, url);
      Router.stateChange();
    };

    history.replaceState = (data, unused, url) => {
      oldReplaceState.call(history, data, unused, url);
      Router.stateChange();
    };

    window.addEventListener('popstate', () => {
      this.stateChange();
    });
  }

  static stateChange() {
    if (!this.#isInitialized) {
      throw new Error("No router is initialized");
    }

    const url = new URL(window.location.href);
    const path = url.pathname;
    const params = Object.fromEntries(url.searchParams.entries());

    const target = this.#routes[path];

    if (target != null) {
      Root.clear();

      if (target.length > 0) target(params);
      else target();
    }
    else {
      console.error(`Path: "${path}" has no target assigned`);
    }
  }

  static navigate(new_path, args = {}) {
    if (!this.#isInitialized) {
      throw new Error("Cannot navigate with an uninitialzed router");
    }

    const current_path = window.location.pathname;

    if (new_path == current_path) return; // Prevent going to the page you already are

    let params = new URLSearchParams();
    for (let key in args) {
      params.set(key, args[key].toString());
    }

    if (params.size > 0) {
      new_path = `${new_path}?${params.toString()}`;
    }

    history.pushState({}, "", new_path); // Save new page to history
    this.stateChange(); // History.pushState doesn't trigger a popstate apparently
  }
}