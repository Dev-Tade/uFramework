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

    window.addEventListener('hashchange', () => {
      this.hashChange();
    });

    this.hashChange(); // Trigger initial state
  }

  static hashChange() {
    if (!this.#isInitialized) {
      throw new Error("No router is initialized");
    }

    const hash = window.location.hash || "#";
    const [path, query_string] = hash.split('?');
    const query_params = new URLSearchParams(query_string || '');
    const params = Object.fromEntries(query_params.entries());

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

    const current_path = window.location.hash;
    if (new_path == current_path) return; // Prevent going to the page you already are

    let params = new URLSearchParams();
    for (let key in args) {
      params.set(key, args[key].toString());
    }

    if (params.size > 0) {
      new_path = `${new_path}?${params.toString()}`;
    }

    window.location.hash = new_path;
  }
}