(function () {
  let control = {
    totalPage: {
      vertical: 4,
      horizontal: 4
    },
    scrollPoz: {
      vertical: 0,
      horizontal: 0
    },
    pageSize: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    container: null,
    containerHorizontal: null
  };

  window._control = window._control || control;

  function init() {
    initContainerSize();
    addScrollEvent();

    control.handleLeft = handleLeft;
    control.handleRight = handleRight;
  }

  function initContainerSize() {
    control.container = document.querySelector('.container');
    control.containerHorizontal = control.container.querySelector('.container-item-horizontal-container');
    console.log(control);
  }

  function addScrollEvent() {
    document.addEventListener('wheel', moveVertically);
  }

  function moveVertically() {
    // To prevent multiple event, remove event and add it again after animation finished
    document.removeEventListener('wheel', moveVertically);
    setTimeout(function () {
      document.addEventListener('wheel', moveVertically);
    }, 1300);

    let directionV = event.deltaY > 0 ? 'down' : 'up';

    if (directionV === 'down') {
      if (control.scrollPoz.vertical === control.pageSize.height * (control.totalPage.vertical - 1)) {
        console.log('### Hit Bottom');
        return;
      }

      control.scrollPoz.vertical += control.pageSize.height;
    } else if (directionV === 'up') {
      if (control.scrollPoz.vertical === 0) {
        console.log('### Hit Top');
        return;
      }

      control.scrollPoz.vertical -= control.pageSize.height;
    }

    control.container.style.transform = `translate3d(0px, -${control.scrollPoz.vertical}px, 0px)`;
  }

  function moveHorizontally(direction) {
    if (direction === 'right') {
      if (control.scrollPoz.horizontal === control.pageSize.width * (control.totalPage.horizontal - 1)) {
        console.log('### Hit Right');
        return;
      }

      control.scrollPoz.horizontal += control.pageSize.width;
    } else if (direction === 'left') {
      if (control.scrollPoz.horizontal === 0) {
        console.log('### Hit Left');
        return;
      }

      control.scrollPoz.horizontal -= control.pageSize.width;
    }

    control.containerHorizontal.style.transform = `translate3d(-${control.scrollPoz.horizontal}px, 0px, 0px)`;
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
})();
