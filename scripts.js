let DEFAULT_SIZE = 16;

let currentSize = DEFAULT_SIZE;
let grid = document.getElementById('grid');

//function to clear and remake grid
function reloadGrid() {
    clearGrid()
    makeGrid(currentSize)
  }
//function to make a grid
function makeGrid(size){

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

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

    //function to change color of grid squars
function changeColor(e) {    
    e.target.style.backgroundColor = black;
}
//loads page with grid using default size
window.onload = () => {
    makeGrid(DEFAULT_SIZE)
    // activateButton(DEFAULT_MODE)
  }