myCanvas.width = 800;
myCanvas.height = Math.min(myCanvas.width * 0.6, window.outerHeight * 0.9);
const context = myCanvas.getContext("2d");
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

function setAmount() {
  return document.getElementById("amount").value;
}
function setSpeed() {
  return document.getElementById("speed").value;
}
function playBubble() {
  init();
  moves = bubbleSort(array);
}
function playInsertion() {
  init();
  moves = insertionSort(array);
}
function playBubbleBack() {
  init();
  moves = bubbleSortBack(array);
}
function playSelection() {
  init();
  moves = selectionSort(array);
}
function playSelectionBack() {
  init();
  moves = selectionSortBack(array);
}

animate();

function bubbleSort(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        swapped = true;
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        moves.push({
          indices: [i - 1, i],
          swap: true,
        });
      } else {
        moves.push({
          indices: [i - 1, i],
          swap: false,
        });
      }
    }
  } while (swapped);
  return moves;
}

function bubbleSortBack(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i - 1] > array[i]) {
        swapped = true;
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        moves.push({
          indices: [i - 1, i],
          swap: true,
        });
      } else {
        moves.push({
          indices: [i - 1, i],
          swap: false,
        });
      }
    }
  } while (swapped);
  return moves;
}

function insertionSort(array) {
  const moves = [];
  for (let i = 1; i < array.length; i++) {
    let [key, j] = [array[i], i - 1];

    while (j >= 0 && array[j] > key) {
      const tempArr = [...array];
      array[j] = array[j + 1];
      array[j + 1] = tempArr[j];
      moves.push({
        indices: [j, j + 1],
        swap: true,
      });
      j--;
    }
  }
  return moves;
}

function selectionSort(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[i]) {
          swapped = true;
          [array[j], array[i]] = [array[i], array[j]];
          moves.push({
            indices: [i, j],
            swap: true,
          });
        } else {
          moves.push({
            indices: [j, i],
            swap: false,
          });
        }
      }
    }
  } while (swapped);
  return moves;
}

function selectionSortBack(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = array.length - 1; i >= 0; i--) {
      for (let j = array.length; j >= i + 1; j--) {
        if (array[j] < array[i]) {
          swapped = true;
          [array[j], array[i]] = [array[i], array[j]];
          moves.push({
            indices: [i, j],
            swap: true,
          });
        } else {
          moves.push({
            indices: [j, i],
            swap: false,
          });
        }
      }
    }
  } while (swapped);
  return moves;
}

// JavaScript program for Merge Sort

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr, l, m, r, moves) {
  var n1 = m - l + 1;
  var n2 = r - m;

  // Create temp arrays
  var L = new Array(n1);
  var R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (var i = 0; i < n1; i++) L[i] = arr[l + i];
  for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  var i = 0;

  // Initial index of second subarray
  var j = 0;

  // Initial index of merged subarray
  var k = l;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      // swapped = true;
      // moves.push({
      //   indices: [i, j],
      //   swap: true,
      // });
      arr[k] = L[i];
      i++;
    } else {
      swapped = true;
      moves.push({
        indices: [i, j],
        swap: true,
      });
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  do {
    swapped = false;

    while (i < n1) {
      console.log(L);
      swapped = true;
      moves.push({
        indices: [i, j],
        swap: true,
      });
      arr[k] = L[i];
      i++;
      k++;
    }
    swapped = false;
  } while (swapped);

  // Copy the remaining elements of
  // R[], if there are any
  do {
    swapped = false;

    while (j < n2) {
      console.log(R);
      swapped = true;
      moves.push({
        indices: [j, k],
        swap: true,
      });
      arr[k] = R[j];
      j++;
      k++;
    }
    swapped = false;
  } while (swapped);
  return moves;
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(arr, l, r) {
  if (l >= r) {
    return; //returns recursively
  }
  if (!moves) var moves = [];

  let m = l + parseInt((r - l) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r, moves);
  return moves;
}

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
