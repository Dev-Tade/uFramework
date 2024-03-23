import { Root } from "./root.js"
import { ElementFactory } from "./element_factory.js";

export function main() {
  let h1 = document.createElement("h1");
  h1.textContent = "Hello World";
  h1.id = "foo";

  Root.getInstance().fromElement(h1);
  Root.getInstance().fromFactory(
    ElementFactory()
      .tag("p")
      .text("Hi")
      .id("bar")
  );
  

  console.log(ElementFactory().tag("p").id("lel"));
  console.log("Hello uFramework");
}