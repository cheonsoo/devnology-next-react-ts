(function () {
  const totalPage = 4;
  const pageHeight = window.innerHeight;
  let currentScrollPoz = 0;

  function init() {
    addScrollEvent();
  }

  function addScrollEvent() {
    function move(event) {
      // To prevent multiple event, remove event and add it again after animation finished
      document.removeEventListener('wheel', move);
      setTimeout(function () {
        document.addEventListener('wheel', move);
      }, 1000);

      const container = document.querySelector('.container');
      let direction = event.deltaY > 0 ? 'down' : 'up';

      if (direction === 'down') {
        if (currentScrollPoz === pageHeight * (totalPage - 1)) {
          console.log('### Hit Bottom');
          return;
        }

        currentScrollPoz += pageHeight;
        container.style.transform = `translate3d(0px, -${currentScrollPoz}px, 0px)`;
      } else if (direction === 'up') {
        if (currentScrollPoz === 0) {
          console.log('### Hit Top');
          return;
        }

        currentScrollPoz -= pageHeight;
        container.style.transform = `translate3d(0px, -${currentScrollPoz}px, 0px)`;
      }

      console.log(`### direction: ${direction}, currentScrollPoz: ${currentScrollPoz}, pageHeight: ${pageHeight}`);
    }

    document.addEventListener('wheel', move);
  }

  window.onload = () => {
    init();
  };
})();
