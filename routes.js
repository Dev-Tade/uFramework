import { Router } from './src/router.js';
import { main, sub_page } from './main.js'

Router.
  at('/',     main).
  at('/main', main).
  at('/sub',  sub_page).
  init();