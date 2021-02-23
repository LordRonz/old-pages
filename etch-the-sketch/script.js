const container = document.getElementById("container");

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); ++c) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
    cell.addEventListener('mouseover', ()=>{
        let color = "rgb(" + (Math.floor(Math.random() * 255)).toString() + "," + (Math.floor(Math.random() * 255)).toString() + "," + (Math.floor(Math.random() * 255)).toString() + ")";
        cell.style.backgroundColor = color;
    });
  };
};

function clearRows(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

makeRows(10, 10);

let sz = document.getElementById("size");
sz.addEventListener('click', ()=>{
    let newSize = parseInt(prompt("Please enter new size(1-120)", "10"));
    if(newSize > 0 && newSize < 121) {
        clearRows(container);
        makeRows(newSize, newSize);
    }
    else {
        alert("Size not valid!!!");
    }
});

let clear = document.getElementById("clear");
clear.addEventListener('click', ()=>{
    let size = Math.sqrt(container.childElementCount);
    clearRows(container);
    makeRows(size, size);
});

let toggleGrid = document.getElementById("toggle-grid");
toggleGrid.addEventListener('click', ()=>{
    let tmp = container.style.getPropertyValue('--grid-size');
    if(tmp != '0px') {
        container.style.setProperty('--grid-size', '0px');
    }
    else {
        container.style.setProperty('--grid-size', '1px');
    }
});