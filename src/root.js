export class Root {
  constructor() {
    this.root_elem = document.getElementById("root");
  }

  static getInstance() {
    if (!Root.instance) {
      Root.instance = new Root();
    }

    return Root.instance;
  }

  appendChild(child) {
    this.root_elem.appendChild(child);
  }

  clearChilds() {
    while(this.root_elem.firstChild) {
      this.root_elem.firstChild.remove();
    }
  }
}