const heroContainer = document.querySelectorAll('.hero')[0];
const heroBad = document.querySelectorAll('.newspaper--bad')[0];
const heroBadWrapper = document.querySelectorAll('.newspaper__bad-wrapper')[0];
const dragButton = document.querySelectorAll('.drag-button')[0];
const dragButtonWrapper = document.querySelectorAll('.drag-button--wrapper')[0];
let startX = 0;
let distanceX = 0;
let distanceXPercentage = 0;
let currentDistanceX = 65;
let touchStart = false;

// get width of browser
const setWidth = () => {
  console.log(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
  const initialWidth = document.documentElement.clientWidth ||
    document.body.clientWidth ||
    window.innerWidth;
  heroBadWrapper.style.width = `${initialWidth}px`;
};

setWidth();


window.onresize = () => {
  setWidth();
};

const startHandler = (event) => {
  startX = (event.touches ? event.touches[0].pageX : event.pageX);
  touchStart = true;

  event.preventDefault();
};

const moveHandler = (event) => {
  if (
    (touchStart && event.touches) || // touch screen
    (touchStart && event.buttons >= 1) || // button is pressed
    (touchStart && event.which >= 1)) { // button is pressed (safari workaround)
    distanceX = (event.touches ? event.touches[0].pageX : event.pageX) - startX;
    distanceXPercentage = ((distanceX / heroContainer.getBoundingClientRect().width) * 100);

    if (currentDistanceX + distanceXPercentage <= 3) {
      heroBad.style.width = '3%';
      dragButtonWrapper.style.right = '97%';
    } else if (currentDistanceX + distanceXPercentage >= 97) {
      heroBad.style.width = '97%';
      dragButtonWrapper.style.right = '3%';
    } else {
      setWidth();

      heroBad.style.width = `${Math.floor(currentDistanceX + distanceXPercentage)}%`;
      dragButtonWrapper.style.right = `${100 - Math.floor(currentDistanceX + distanceXPercentage)}%`;
    }

    event.preventDefault();
  }
};

const endHandler = (event) => {
  currentDistanceX += distanceXPercentage;

  if (currentDistanceX <= 0) {
    currentDistanceX = 0;
  } else if (currentDistanceX >= 100) {
    currentDistanceX = 100;
  }

  distanceX = 0;
  distanceXPercentage = 0;
  touchStart = false;

  event.preventDefault();
};

const handleMouseLeave = () => {
  currentDistanceX += distanceXPercentage;

  if (currentDistanceX <= 0) {
    currentDistanceX = 0;
  } else if (currentDistanceX >= 100) {
    currentDistanceX = 100;
  }
};

dragButton.addEventListener('touchstart', startHandler);
heroContainer.addEventListener('touchmove', moveHandler);
heroContainer.addEventListener('touchend', endHandler);

dragButton.addEventListener('mousedown', startHandler);
heroContainer.addEventListener('mousemove', moveHandler);
heroContainer.addEventListener('mouseup', endHandler);

heroContainer.addEventListener('mouseleave', handleMouseLeave);
