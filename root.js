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

  fromElement(child) {
    this.root_elem.appendChild(child);
  }

  fromFactory(fact) {
    console.log(fact);
    let foo = document.createElement(fact._tag);
    foo.textContent = fact._textContent;
    foo.id = fact._id;

    this.fromElement(foo);
  }
}