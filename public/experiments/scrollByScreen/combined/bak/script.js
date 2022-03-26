// (function () {
const totalPage = 4;
// const pageWidth = 1344;
const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
let currentScrollPozY = 0;
let currentScrollPozX = 0;
let container;
let containerHorizontal;

function init() {
  initContainerSize();
  addScrollEvent();
}

function initContainerSize() {
  console.log(`### pageWidth: ${pageWidth}, pageHeight: ${pageHeight}`);

  container = document.querySelector('.container');
  containerHorizontal = container.querySelector('.container-item-horizontal-container');
}

function addScrollEvent() {
  document.addEventListener('wheel', moveVertically);
}

function moveVertically(direction) {
  // To prevent multiple event, remove event and add it again after animation finished
  document.removeEventListener('wheel', moveVertically);
  setTimeout(function () {
    document.addEventListener('wheel', moveVertically);
  }, 1300);

  let directionV = event.deltaY > 0 ? 'down' : 'up';

  if (directionV === 'down') {
    if (currentScrollPozY === pageHeight * (totalPage - 1)) {
      console.log('### Hit Bottom');
      return;
    }

    currentScrollPozY += pageHeight;
  } else if (directionV === 'up') {
    if (currentScrollPozY === 0) {
      console.log('### Hit Top');
      return;
    }

    currentScrollPozY -= pageHeight;
  }

  container.style.transform = `translate3d(0px, -${currentScrollPozY}px, 0px)`;
}

function moveHorizontally(direction) {
  if (direction === 'right') {
    if (currentScrollPozX === pageWidth * (totalPage - 1)) {
      console.log('### Hit Right');
      return;
    }

    currentScrollPozX += pageWidth;
    containerHorizontal.style.transform = `translate3d(-${currentScrollPozX}px, 0px, 0px)`;
  } else if (direction === 'left') {
    if (currentScrollPozX === 0) {
      console.log('### Hit Left');
      return;
    }

    currentScrollPozX -= pageWidth;
    containerHorizontal.style.transform = `translate3d(-${currentScrollPozX}px, 0px, 0px)`;
  }

  console.log(`### direction: ${direction}, currentScrollPoz: ${currentScrollPozX}, pageHeight: ${pageHeight}`);
}

function handleLeft() {
  moveHorizontally('left');
}

function handleRight() {
  moveHorizontally('right');
}

window.onload = () => {
  init();
};
// })();
