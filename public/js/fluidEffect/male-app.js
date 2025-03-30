document.addEventListener('DOMContentLoaded', function () {
    // Target the grey section
    const greyCanvas = document.getElementById('male-fluid-canvas');
  
    if (typeof Fluid !== 'undefined' && greyCanvas) {
      let greyFluid = new Fluid(greyCanvas);
  
      // Initialize Fluid
      greyFluid.mapBehaviors({
        // OLD
        // paused: false,
        // curl: 5,
        // dissipation: 0.98,  // Slower fade for longer trails
        // emitter_size: 0.1,       // Smaller splats (like fine mist)
  
        // NEW
        paused: false,
        curl: 8,                 // Slightly stronger swirls (5–10 for subtlety)
        dissipation: 0.985,      // Even slower fade (preserves trails longer)
        emitter_size: 0.08,      // Finer mist (0.05–0.1 for delicate sprays)
        velocity: 0.97,          // Smoother, slower movement
        pressure: 0.75,          // Less "explosive" splats (softer dispersion)
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