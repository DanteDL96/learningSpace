// Holds options
const options = [];
let noRepeat = '';

let winner = ''; // Now a string instead of an array
const valueBox = document.getElementById('box-value');

// Defines the empty UL
const $options = document.querySelector('.options');
const $clearArray = document.getElementById('clear');

let closePopup = document.getElementById('popup-close');
let overlay = document.getElementById('overlay');
let popup = document.getElementById('popup');

// Function to clear list
function clearOptions() {
  if (options.length === 0) {
    alert('The list is already empty');
  } else {
    options.length = 0; // More efficient way to clear the array
    $options.innerHTML = '';
  }
}

// Attach event listener to clear button
document.getElementById('clear').addEventListener('click', clearOptions);

// Function to add options to the list
function addOptions() {
  const newOption = document.createElement('li');
  newOption.setAttribute('class', 'text-center');
  newOption.textContent = options[options.length - 1]; // Adds only the latest item
  $options.appendChild(newOption);
}

// Handles adding options from input box (supports Enter key)
const handleAdd = (event) => {
  // Check if Enter key is pressed or button is clicked
  if (event.type === 'click' || event.key === 'Enter') {
    if (valueBox.value.trim().length === 0) {
      alert('You must write an option first');
      return;
    }
    // Add trimmed value to options
    options.push(valueBox.value.trim());
    valueBox.value = ''; // Clear input after adding
    addOptions();
  }
};
// Add event listener for clicking the "Add" button
document.getElementById('add-button').addEventListener('click', handleAdd);

// Add event listener for pressing Enter inside the input field
valueBox.addEventListener('keydown', handleAdd);

// Defines select button
let $button = document.getElementById('pick');
$button.addEventListener('click', picker);

// Randomizes options and displays selection in the popup
let lastWinner = ''; // Store last selected option

function picker() {
  let $winner = document.getElementById('winner');

  if (options.length === 0) {
    alert('You must add items to the list first');
    return;
  }

  let randomIndex;
  let newWinner;

  // Keep selecting until it's different
  do {
    randomIndex = Math.floor(Math.random() * options.length);
    newWinner = options[randomIndex] || lastWinner[randomIndex];
  } while (newWinner === lastWinner && options.length > 1);

  lastWinner = newWinner; // Store the new winner for comparison next time
  overlay.style.display = 'block';
  popup.style.display = 'block';
  $winner.innerHTML = newWinner;
}

// Close Popup Event
closePopup.onclick = function () {
  overlay.style.display = 'none';
  popup.style.display = 'none';
  document.body.style.overflow = 'auto'; // Enable scrolling again
};

// Trap focus inside the popup when opened
popup.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault(); // Stop default tabbing behavior

    // If Shift+Tab is pressed, move focus back to close button
    if (document.activeElement === popup) {
      document.getElementById('popup-close').focus();
    } else {
      popup.focus();
    }
  }
});
