document.addEventListener('DOMContentLoaded', function () {
  // Initialize Fluid for the female image
  const femaleCanvas = document.getElementById('female-canvas');
  const femaleContainer = document.querySelector('.female .fluid-container');

  if (typeof Fluid !== 'undefined' && femaleCanvas) {
    let femaleFluid = new Fluid(femaleCanvas);

    // Initialize Fluid
    femaleFluid.mapBehaviors({
      paused: false
    });
    femaleFluid.activate();

    // Add mousemove event listener to the female container
    femaleContainer.addEventListener('mousemove', function (event) {
      const rect = femaleContainer.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Simulate fluid interaction at the mouse position
      if (femaleFluid && femaleFluid.addSplat) {
        femaleFluid.addSplat(mouseX, mouseY);
      }
    });
  }

  // Initialize Fluid for the male image
  const maleCanvas = document.getElementById('male-canvas');
  const maleContainer = document.querySelector('.male .fluid-container');

  if (typeof Fluid !== 'undefined' && maleCanvas) {
    let maleFluid = new Fluid(maleCanvas);

    // Initialize Fluid
    maleFluid.mapBehaviors({
      paused: false
    });
    maleFluid.activate();

    // Add mousemove event listener to the male container
    maleContainer.addEventListener('mousemove', function (event) {
      const rect = maleContainer.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Simulate fluid interaction at the mouse position
      if (maleFluid && maleFluid.addSplat) {
        maleFluid.addSplat(mouseX, mouseY);
      }
    });
  }
});