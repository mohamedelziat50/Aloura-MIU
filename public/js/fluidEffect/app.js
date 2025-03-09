document.addEventListener('DOMContentLoaded', function () {
  // Target the grey section
  const greyCanvas = document.createElement('canvas');
  greyCanvas.id = 'grey-fluid-canvas';
  document.querySelector('.grey-section').appendChild(greyCanvas);

  if (typeof Fluid !== 'undefined' && greyCanvas) {
    let greyFluid = new Fluid(greyCanvas);

    // Initialize Fluid
    greyFluid.mapBehaviors({
      paused: false
    });
    greyFluid.activate();

    // Add mousemove event listener to create fluid effect on hover
    document.querySelector('.grey-section').addEventListener('mousemove', function (event) {
      const rect = greyCanvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (greyFluid && greyFluid.addSplat) {
        greyFluid.addSplat(mouseX, mouseY);
      }
    });
  }
});
