// select modal-btn,modal-overlay,close-btn
// listen for click events on modal-btn and close-btn
// when user clicks modal-btn add .open-modal to modal-overlay
// when user clicks close-btn remove .open-modal from modal-overlay

// const modalBtn = document.querySelector('.modal-btn');
// const modalOverlay = document.querySelector('.modal-overlay');
// const closeBtn = document.querySelector('.close-btn');

const modalBtn = document
  .querySelector('.modal-btn')
  .addEventListener('click', function () {
    modalOverlay.classList.toggle('open-modal');
  });

const modalOverlay = document.querySelector('.modal-overlay');

const closeBtn = document
  .querySelector('.close-btn')
  .addEventListener('click', function () {
    modalOverlay.classList.remove('open-modal');
  });
