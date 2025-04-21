document.addEventListener('DOMContentLoaded', function () {
  // Target the grey section
  const greyCanvas = document.getElementById('grey-fluid-canvas');
  if (!greyCanvas) return;

    // Detect if screen is smaller than 1024px (phones + small tablets)
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches || 
    /Mobi|Android|iPad|iPhone/i.test(navigator.userAgent);

    if(isSmallScreen)
    {
        // Fallback for smaller screens (hide canvas or show static content)
      greyCanvas.style.display = 'none';
      return; // Exit early (no Fluid-JS initialization)
    }
  
  // Only runs on desktop/large screens (>1024px)
  if (typeof Fluid !== 'undefined' && greyCanvas) {
    let greyFluid = new Fluid(greyCanvas);

    // Initialize Fluid
    greyFluid.mapBehaviors({
      // NEW
      paused: false,
      // curl: 8,                 // Slightly stronger swirls (5–10 for subtlety)
      // dissipation: 0.985,      // Even slower fade (preserves trails longer)
      // emitter_size: 0.08,      // Finer mist (0.05–0.1 for delicate sprays)
      // velocity: 0.97,          // Smoother, slower movement
      // pressure: 0.75,          // Less "explosive" splats (softer dispersion)

      curl: 8,                // Even more subtle for male side, matching template
      dissipation: 0.98,       // Slightly faster dissipation than female
      emitter_size: 0.06,       // Slightly larger than female for different effect
      velocity: 0.97,           // Slightly slower movement
      pressure: 0.9,            // Different pressure level for unique fluid behavior

      transparent: true,      // Transparent background makes image look better
      render_bloom: false,      // Disable bloom for cleaner look
      render_shaders: true,     // Ensure shaders are used
      sim_resolution: 208,      // Adjusted resolution for male side
      dye_resolution: 592       // Slightly different from female for unique effect
    });
    greyFluid.activate();
  }
});

// FLUID SIMULATION
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("grey-fluid-canvas");
  if (!canvas) return;

  // Function to simulate mouse down event (pressing the mouse button)
  function simulateMouseDown(x, y) {
    const rect = canvas.getBoundingClientRect();
    const mouseDownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: rect.left + x,
      clientY: rect.top + y,
      button: 0, // Left mouse button
      buttons: 1, // Left mouse button pressed
    });
    canvas.dispatchEvent(mouseDownEvent);
  }

  // Simulate a complete mouse interaction (down, move, up)
  function simulateFullMouseInteraction() {
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;

    // Random position
    const startX = Math.random() * canvasWidth;
    const startY = Math.random() * canvasHeight;

    // Simulate mouse down
    simulateMouseDown(startX, startY);
  }

  // Continuously simulate mouse interactions EVERY 1 SECONDS
  setInterval(simulateFullMouseInteraction, 1000);
});