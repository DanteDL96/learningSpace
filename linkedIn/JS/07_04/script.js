/**
 * Challenge: Build and modify an array
 * - Build an array with 8 items
 * - Remove the last item
 * - Add the last item as the first item on the array
 * - Sort the items by alphabetical order
 * - Use the find() method to find a specific item in the array
 * - Remove the item you found using the find method from the array.
 */

const brasalet = 'brasalete';
let nose = true;

let arrayTest = [
  'keys',
  'controller',
  'headphones',
  'watch',
  'coaster',
  brasalet,
  nose,
  7,
];

console.log(arrayTest);
arrayTest.pop();
console.log(arrayTest);
arrayTest.unshift(7);
console.log(arrayTest);
arrayTest.sort();
console.log(arrayTest);
const findTrue = arrayTest.find(trueValue);

function trueValue(item) {
  return item === 'controller';
}

console.log(findTrue);

arrayTest.splice(3, 1);
console.log(arrayTest);

var numbers = [1, 2, 3, 4, 5];
numbers.push(6);
numbers.unshift(7);
numbers.pop();
numbers.shift();
console.log(numbers);
