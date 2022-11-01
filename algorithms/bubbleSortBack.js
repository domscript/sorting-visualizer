export function bubbleSortBack(array) {
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
