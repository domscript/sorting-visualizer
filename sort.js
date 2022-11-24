import { Column } from "./column.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { bubbleSortBack } from "./algorithms/bubbleSortBack.js";
import { selectionSort } from "./algorithms/selectionSort.js";
import { selectionSortBack } from "./algorithms/selectionSortBack.js";
import { insertionSort } from "./algorithms/insertionSort.js";

const myButtons = document.getElementsByClassName("myButtons")[0];

const sizeW =
  window.screen.width < 700
    ? window.screen.width * 0.95
    : window.screen.width * 0.8 || 300;
const sizeH = Math.min(myCanvas.width * 0.6, window.outerHeight * 0.9);
console.log(sizeW, sizeH);
const context = myCanvas.getContext("2d");
myCanvas.style.width = `${sizeW}px`;
myCanvas.style.height = `${sizeH}px`;
const scale = window.devicePixelRatio || 1;
myCanvas.width = Math.floor(sizeW * scale);
myCanvas.height = Math.floor(sizeH * scale);

document.getElementById("speed").addEventListener("onchange", (e) => {
  console.log(e);
  console.log();
});

// Normalize coordinate system to use CSS pixels.
// context.scale(scale, scale);

const margin = 30;
let amount;
let speed;
const maxColumnHeight = myCanvas.height * 0.7;
let array = [];
let cols = [];
let moves = [];
function init() {
  array = [];
  cols = [];
  amount = setAmount();
  speed = setSpeed();
  const grow = (myCanvas.height * 0.2) / amount;

  const spacing = (myCanvas.width - margin * 2) / amount;
  const gap = (spacing * 2) / amount;

  for (let i = 0; i < amount; i++) {
    array[i] = Math.random();
  }
  moves = [];
  for (let i = 0; i < array.length; i++) {
    const x = i * spacing + spacing / 2 + margin;
    const y = myCanvas.height - margin - i * grow;
    const width = spacing - gap;
    const height = maxColumnHeight * array[i];
    cols[i] = new Column(x, y, width, height);
  }
}

myButtons.addEventListener("click", (e) => {
  switch (e.target.dataset.sort) {
    case "bubble":
      bubble();
      break;
    case "bubbleBack":
      bubbleBack();
      break;
    case "selection":
      selection();
      break;
    case "selectionBack":
      selectionBack();
      break;
    case "insertion":
      insertion();
      break;
  }
});

function setAmount() {
  return document.getElementById("amount").value;
}
function setSpeed() {
  return document.getElementById("speed").value;
}

function bubble() {
  init();
  moves = bubbleSort(array);
}
function bubbleBack() {
  init();
  moves = bubbleSortBack(array);
}
function insertion() {
  init();
  moves = insertionSort(array);
}
function selection() {
  init();
  moves = selectionSort(array);
}
function selectionBack() {
  init();
  moves = selectionSortBack(array);
}

animate();

function animate() {
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  let changed = false;
  let frameCount;

  for (let i = 0; i < cols.length; i++) {
    changed = cols[i].draw(context) || changed;
  }

  if (!changed && moves.length > 0) {
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.swap) {
      switch (speed) {
        case "1":
          frameCount = 100;
          break;
        case "2":
          frameCount = 50;
          break;
        case "3":
          frameCount = 20;
          break;
        case "4":
          frameCount = 10;
          break;
        case "5":
          frameCount = 1;
          break;
        default:
          frameCount = 25;
          break;
      }

      cols[i].moveTo(cols[j], 1, frameCount);
      cols[j].moveTo(cols[i], -1, frameCount);
      [cols[i], cols[j]] = [cols[j], cols[i]];
    } else {
      // todo
    }
  }

  requestAnimationFrame(animate);
}
