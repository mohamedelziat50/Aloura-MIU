document.addEventListener('DOMContentLoaded', function () {
  // Target the grey section
  const greyCanvas = document.getElementById('grey-fluid-canvas');

  if (typeof Fluid !== 'undefined' && greyCanvas) {
    let greyFluid = new Fluid(greyCanvas);

    // Initialize Fluid
    greyFluid.mapBehaviors({
      paused: false,
      // If color options are available in the Fluid implementation
      // Try adding a color parameter here if supported
    });
    greyFluid.activate();

    // Function to simulate mouse interaction
    function createAutomaticEffect() {
      const rect = greyCanvas.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;
      
      // Generate random position
      const randomX = Math.random() * canvasWidth;
      const randomY = Math.random() * canvasHeight;
      
      // Add fluid splat at random position
      // Simulate the mouse being held down
      if (greyFluid && greyFluid.addSplat) {
        greyFluid.addSplat(randomX, randomY, 1); // The third parameter might represent mouse button state
      }
    }

    // Create automatic animation at regular intervals
    setInterval(createAutomaticEffect, 150);

    // Keep the original mousemove handler if present
    document.querySelector('.grey-section').addEventListener('mousemove', function (event) {
      const rect = greyCanvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Pass mouse button state (1 = pressed)
      if (greyFluid && greyFluid.addSplat) {
        greyFluid.addSplat(mouseX, mouseY, 1);
      }
    });
  }
});