var numbers = [Infinity];

const { once } = require("events");
const { createReadStream } = require("fs");
const { createInterface } = require("readline");

function locationOf(element, array, start, end) {
  start = start || 0;
  end = end || array.length;
  var pivot = parseInt(start + (end - start) / 2, 10);
  if (array[pivot] === element) return pivot;
  if (end - start <= 1) return array[pivot] > element ? pivot - 1 : pivot;
  if (array[pivot] < element) {
    return locationOf(element, array, pivot, end);
  } else {
    return locationOf(element, array, start, pivot);
  }
}

function insert(element, array) {
  if (element < array[array.length - 1]) {
    array.splice(locationOf(element, array) + 1, 0, element);
    return array.slice(0, 10);
  }
  return array;
}

(async function processLineByLine() {
  try {
    console.log(new Date());
    const rl = createInterface({
      input: createReadStream("numbers.txt"),
      crlfDelay: Infinity
    });

    rl.on("line", line => {
      // Process the line.
      numbers = insert(parseInt(line), numbers);
    });

    await once(rl, "close");

    console.log(numbers.reduce((a, b) => a + b, 0));
    console.log(new Date());
  } catch (err) {
    console.error(err);
  }
})();
