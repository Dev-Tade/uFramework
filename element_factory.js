export function ElementFactory() {
  return {
    _tag: "",
    _id: "",
    _textContent: "",

    tag(tag) {
      this._tag = tag;
      return this;
    },

    id(id) {
      this._id = id;
      return this;
    },

    text(text) {
      this._textContent = text;
      return this;
    }
  }
}