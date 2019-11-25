import {greeting} from "./dependency.js";

box = document.getElementById("box");

// Do this do have stuff globally available for debugging.
window.greeting = greeting;


box.innerHTML = greeting;
