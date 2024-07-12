let divHolder = document.querySelector('.sketch-divs');
let colorPicker = document.querySelector('#color-picker');

let selectedColor = colorPicker.value;
let isMouseDown = false;
let isEraserMode = false;
let isRainbowMode = false;
let isColorMode = true


let clearBtn = document.querySelector('.btn.clear-btn');
let eraserBtn = document.querySelector('.btn.eraser-btn');
let colorModeBtn = document.querySelector('.btn.color-mode');
let rainbowModeBtn = document.querySelector('.btn.rainbow-mode');

function updateSetting(grids){
   document.querySelector('.setting-title').textContent = grids+" x "+grids;
   updatePixels(grids);
}


function updatePixels(grids){


    divHolder.innerHTML = '';

    if (

        grids != 0

    ){

        let pixelSize=(divHolder.clientWidth) / grids;

        for (let i = 0; i < grids*grids; i++) {

            let pixel = document.createElement('div');

            pixel.className = 'pixel';

            pixel.style.width=pixelSize+"px";

            pixel.style.height=pixelSize+"px";

            divHolder.appendChild(pixel);

        }

    }

}

divHolder.addEventListener('mousedown',(event) => {
        event.preventDefault();
        isMouseDown = true;
        colorPixel(event.target);
});


document.addEventListener('mouseup', () => {
    isMouseDown = false;
});


divHolder.addEventListener('mouseover', (event) => {
    if (isMouseDown) {
        colorPixel(event.target);
    }
});

document.addEventListener('selectstart', (event) => {
    if (isMouseDown) {
        event.preventDefault();
    }
});


function colorPixel(pixel){
    if (pixel.classList.contains('pixel')) {
        if (isEraserMode) {
            pixel.style.backgroundColor = '';
        } else if (isRainbowMode) {
            pixel.style.backgroundColor = getRandomColor();
        } else {
            pixel.style.backgroundColor = selectedColor;
        }
    }
}


colorPicker.addEventListener('input', (event) => {
    selectedColor = event.target.value;
});

eraserBtn.addEventListener('click', () => {
    isEraserMode = !isEraserMode;
    eraserBtn.style.borderColor = isEraserMode ? '#00FF00' : '#FF0000';
    eraserBtn.textContent = isEraserMode ? 'Eraser On' : 'Eraser Off';

    if (isEraserMode) {
        isRainbowMode = false;
        isColorMode = false;
        rainbowModeBtn.textContent = 'Rainbow Mode';
        colorModeBtn.textContent = 'Color Mode';
    }
});

clearBtn.addEventListener('click', () => {

    clearPixel();

});


rainbowModeBtn.addEventListener('click', () => {
    isRainbowMode = !isRainbowMode;
    rainbowModeBtn.style.borderColor = isRainbowMode ? '#00FF00' : '#000000';
    if (isRainbowMode) {
        isEraserMode = false;
        isColorMode = false;
        eraserBtn.textContent = 'Eraser Off';
        eraserBtn.style.borderColor = '#FF0000';
        colorModeBtn.textContent = 'Color Mode';
    }
});



colorModeBtn.addEventListener('click', () => {
    isColorMode = !isColorMode;
    if (isColorMode) {
        isEraserMode = false;
        isRainbowMode = false;
        eraserBtn.textContent = 'Eraser Off';
        eraserBtn.style.borderColor = '#FF0000';
        rainbowModeBtn.textContent = 'Rainbow Mode';
        rainbowModeBtn.style.borderColor = '#000000';
    }
});


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function clearPixel() {

    const pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pixel => {

        pixel.style.backgroundColor = '';

    });

}


updateSetting(16);












