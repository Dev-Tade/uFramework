import { Root } from "./src/root.js"
import { Router } from "./src/router.js";
import { a, button, div, h1, img, p } from "./src/tag.js";

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

function nav_bar() {
  Root.present(
    div(
      button("main")
        .$attr("class", "nav_button")
        .$onclick( () => { Router.navigate('/main'); } ),

      button("sub")
        .$attr("class", "nav_button")
        .$onclick( () => { Router.navigate('/sub'); } )
    ).$attr("class", "nav_bar")
  );
}

export function sub_page() {
  nav_bar();
  Root.present(
    div(
      h1("Sub page"),
      p(LOREM)
    )
  );
}

export function main() {
  console.log("Hello uFramework");

  nav_bar();
  Root.present(
    div(
      h1("Hello World"),
      div(img("foo.jpeg").$attr("width", "80"))
    ),

    button("foo")
      .$onclick( () => { console.log(v_h1("hello")); })
  );
}