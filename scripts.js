const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;
//initialize all "current" variables to the defaults
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

//functions to set "current" variables to new values
function setCurrentColor(newColor) {
  currentColor = newColor
}
function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}
function setCurrentSize(newSize) {
  currentSize = newSize;
  sizeSlider.setAttribute("value", newSize);
}

//selects all elements needed by ID
const grid = document.getElementById('grid');
const colorChoice = document.getElementById('colorChoice');
const colorBtn = document.getElementById('colorBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');

//variables to help contol how mouseclick and mouseover will function
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//onclick and onchange logic
colorChoice.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onchange= (e) => setCurrentSize(e.target.value);
sizeSlider.oninput = (e) => changeSize(e.target.value);

//function to clear and remake grid
function reloadGrid() {
    clearGrid();
    makeGrid(currentSize); 
  }

//function to make a grid
function makeGrid(size){

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < (size * size); i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.style.backgroundColor = 'transperent';
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        gridElement.classList.add('border-top-left');
        grid.appendChild(gridElement);
         //set border top and left to every grid item
      }
      //add a right border the the right most items
      const rightItems = document.querySelectorAll(`.grid-element:nth-child(${size}n)`);
      for (let i = 0; i < rightItems.length; i++) {
        rightItems[i].setAttribute('data-right', 'true');
        rightItems[i].classList.toggle('border-right');
      }
      // add a bottom border to the bottom most items
    let gridItems = document.querySelectorAll('.grid-element');
    const lastItems = Array.from(gridItems).slice(-`${size}`);
    for (let i = 0; i < lastItems.length; i++) {
        lastItems[i].setAttribute('data-bottom', 'true');
        lastItems[i].classList.toggle('border-bottom');
  }
    }

//function to change color of grid squares
function changeColor(e) {    
  if (e.type === 'mouseover' && !mouseDown) return;
  else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe';
  }
}

//function to make button "active" depending on which was clicked
function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active')
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }
  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
  } else if (newMode === 'color') {
    colorBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}

//changes the size of the grid and reloads it, then updates the html with new size value
function changeSize(value){
  setCurrentSize(value);
  reloadGrid();
  updateSizeValue(value);
}

//updates the values displayed in the html
function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`
}

//blanks entire grid
function clearGrid(){
  grid.innerHTML = '';
}

//loads page with grid using default size
window.onload = () => {
    makeGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
  }