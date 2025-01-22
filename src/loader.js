import '../routes.js'
import { Root } from './root.js';
import { Router } from "./router.js";

document.addEventListener('DOMContentLoaded', () => {
  Root.clear();
  Router.stateChange();
});