export function tag(name, ...children) {
  let elem = document.createElement(name);

  for (const child of children) {
    elem.appendChild(child);
  }

  elem.$attr = function (name, value) {
    this.setAttribute(name, value);
    return this;
  }

  elem.$onclick = function (fn) {
    elem.onclick = fn;
    return this;
  }

  return elem;
}

export function text(text) {
  return document.createTextNode(text);
}

export function div(...children) {
  return tag("div", ...children);
}

export function img(src) {
  return tag("img").$attr("src", src);
}

export function a(t) {
  return tag("a", text(t))
}

export function h1(t) {
  return tag("h1", text(t));
}

export function h2(t) {
  return tag("h2", text(t));
}


export function h3(t) {
  return tag("h3", text(t));
}

export function p(t) {
  return tag("p", text(t));
}

export function button(t) {
  return tag("button", text(t));
}