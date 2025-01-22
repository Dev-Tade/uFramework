export class Root {
  static #root;
  static #isInitialized = false;

  static #init() {
    this.#root = document.getElementById('root');
    this.#isInitialized = true;
  } 

  static present(...childs) {
    if (!this.#isInitialized) {
      throw new Error("Cannot present on a uninitialized root");
    }

    childs.forEach(child => {
      this.#root.appendChild(child);
    });
  }

  static clear() {
    if (!this.#isInitialized) {
      this.#init();
    }

    while(this.#root.firstChild) {
      this.#root.firstChild.remove();
    }
  }
}