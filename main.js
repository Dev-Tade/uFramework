import { Root } from "./src/root.js"
import { a, div, h1, img, p } from "./src/tag.js";

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

function nav_bar() {
  Root.getInstance().appendChild(
    div(
      a("Main")
        .$attr("href", "#")
        .$onclick(main),

      a("Sub")
        .$attr("href", "#")
        .$onclick(() => {
          Root.getInstance().clearChilds();
          nav_bar();
          Root.getInstance().appendChild(
            div(
              h1("Sub page"),
              p(LOREM)
            )
          );
        })
    ).$attr("id", "nav")
  );
}

export function main() {
  console.log("Hello uFramework");

  Root.getInstance().clearChilds();
  nav_bar();
  Root.getInstance().appendChild(
    div(
      h1("Hello World"),
      div(img("foo.jpeg").$attr("width", "80"))
    )
  );
}