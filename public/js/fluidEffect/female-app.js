document.addEventListener('DOMContentLoaded', function () {
    // Target the grey section
    const greyCanvas = document.getElementById('female-fluid-canvas');
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
        // emitter_size: 0.06,      // Finer mist (0.05–0.1 for delicate sprays)
        // velocity: 0.99,          // Smoother, slower movement
        // pressure: 0.9,          // Less "explosive" splats (softer dispersion)

        // transparent: true,      // Transparent background makes image look better
        // multi_color: false,     // Enable multi-color mode (default: false)
        // render_shaders: true,

        // // Both of these also effect the fluid
        // sim_resolution: 208,  // Lower resolution = less GPU strain (default: 128) + 80 or - 80
        // dye_resolution: 592 // Lower for performance (default: 512)

        curl: 2,                  // Reduced for more subtle, elegant movement
        dissipation: 0.99,        // Increased for longer-lasting, smoother trails
        emitter_size: 0.05,       // Smaller for more delicate, fine mist effect
        velocity: 0.985,           // Adjusted for slower, more elegant movement
        pressure: 0.6,            // Reduced for gentler fluid dispersion
        render_bloom: false,      // Disable bloom for cleaner look
        render_shaders: true,     // Ensure shaders are used
        transparent: true,        // Keep transparent background
        sim_resolution: 208,      // Adjusted for better detail/performance balance
        dye_resolution: 592       // Higher resolution for smoother appearance
      });
      greyFluid.activate();

      // Initially hide the canvas to prevent seeing the initial bubble
      greyCanvas.style.opacity = '0';
      
      // Fade in the canvas after a short delay (after initial bubble would have disappeared)
      setTimeout(() => {
        greyCanvas.style.transition = 'opacity 2.5s ease'; // Still intial bubble appears but is quite good
        greyCanvas.style.opacity = '1';
      }, 2500);
    }
  });

  // FLUID SIMULATION
  document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("female-fluid-canvas");
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

    // Continuously simulate mouse interactions EVERY 2 SECOND
    setInterval(simulateFullMouseInteraction, 2000);
});