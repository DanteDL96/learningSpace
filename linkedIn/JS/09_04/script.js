// defines the grid
const grid = (boxGenerator) => {
  const gridHome = document.querySelector('.grid__home');
  //appends boxes to grid
  const generatedBoxes = boxGenerator();
  generatedBoxes.forEach((box) => {
    gridHome.appendChild(box);
  });
  // grid home defined and loaded with basic code
  gridHome.addEventListener('mouseenter', (event) => {
    console.log('you are inside of grid');
    gridHome.classList.add('focus');
  });

  // code no work on non-input code
  // gridHome.addEventListener('focus', (event) => {
  //   gridHome.classList.add('focus');
  //   console.log('element is on focus');
  // });
  gridHome.addEventListener('mouseleave', (event) => {
    console.log('you are out of grid');
    gridHome.classList.remove('focus');
  });
  return gridHome;
};
//  function that generate divs
const boxGenerator = () => {
  const boxes = []; // Array to store the generated boxes
  for (let i = 0; i < 16; i++) {
    const gridBoxes = document.createElement('div');
    const boxContent = `
      <button class="invisible__button">O</button>
    `;
    gridBoxes.innerHTML = boxContent;
    boxes.push(gridBoxes); // Add the generated box to the array
  }
  return boxes;
};
const gridHome = grid(boxGenerator);

const buttonColors = () => {
  const colors = {
    default: ['transparent'],
    hover: ['#AAF5C0', '#AAB9F5', '#F5AADF', '#F5E6AA'],
    click: ['#003366', '#f35d40', '#f69a92', '#66cdaa'],
  };

  const applyDefaultColor = (button) => {
    button.style.backgroundColor = colors.default[0];
  };

  const applyRandomHoverColor = (button) => {
    const randomIndex = Math.floor(Math.random() * colors.hover.length);
    button.style.backgroundColor = colors.hover[randomIndex];
  };

  const applyRandomClickColor = (button) => {
    const randomIndex = Math.floor(Math.random() * colors.click.length);
    button.style.backgroundColor = colors.click[randomIndex];
    console.log('Button clicked');
  };

  const buttons = document.querySelectorAll('.invisible__button');

  buttons.forEach((button) => {
    applyDefaultColor(button);

    button.addEventListener('mouseover', () => {
      applyRandomHoverColor(button);
    });

    button.addEventListener('click', () => {
      applyRandomClickColor(button);
    });

    button.addEventListener('mouseout', () => {
      applyDefaultColor(button);
    });
  });
};

buttonColors();
