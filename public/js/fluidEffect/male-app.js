document.addEventListener('DOMContentLoaded', function () {
    // Target the grey section
    const greyCanvas = document.getElementById('male-fluid-canvas');
    if (!greyCanvas) return;

    // Detect if screen is smaller than 768px (phones + small tablets)
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches || 
    /Mobi|Android|iPad|iPhone/i.test(navigator.userAgent);
    
    console.log(`Small screen size detection result: ${isSmallScreen}`);

    if(isSmallScreen)
    {
        // Fallback for smaller screens (hide canvas or show static content)
      greyCanvas.style.display = 'none';
      console.log('Small screen detected. Fluid effect disabled for better performance.');
      return; // Exit early (no Fluid-JS initialization)
    }
  
    // Hardware detection variables
    let hardwareSpecs = {
      cores: 0,
      memory: 0,
      isDiscreteGPU: false,
      gpuInfo: ''
    };
    let currentFPS = 0;
    let fpsArray = [];
    let lastLoop = performance.now();
    let greyFluid;

    // Detect hardware specifications
    function detectSpecs() {
      // Detect CPU cores
      hardwareSpecs.cores = navigator.hardwareConcurrency || 4;
      
      // Detect memory (in GB)
      // Note: navigator.deviceMemory is often capped at 8GB by browsers and may report much lower values
      let detectedMemory = navigator.deviceMemory || 4;
      
      // Fix for deviceMemory API reporting very low values (0.5GB) on high-end systems 
      if (detectedMemory <= 2) {
        detectedMemory = 8; // Set a reasonable default if reported memory is suspiciously low
        console.log('Corrected suspiciously low memory value to:', detectedMemory);
      }
      
      // Fix for deviceMemory API capping at 8GB
      if (detectedMemory >= 6 && hardwareSpecs.cores >= 6) {
        detectedMemory = 16; // Assume higher memory for machines with many cores
        console.log('Adjusted memory value to 16GB based on core count:', hardwareSpecs.cores);
      }
      
      hardwareSpecs.memory = detectedMemory;
            
      // Detect GPU type
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            hardwareSpecs.gpuInfo = renderer;
            
            // Check if GPU is discrete by looking for certain keywords
            const discreteGPUKeywords = [
              // NVIDIA GPUs
              'nvidia', 'geforce', 'rtx', 'gtx', 'quadro', 
              // AMD Radeon GPUs
              'radeon', 'rx', 'vega',
              // Intel discrete GPUs
              'arc', 'iris', 
              // Apple GPUs
              'apple gpu', 'apple m1', 'apple m2', 
              // Other professional/gaming GPUs
              'matrox', 'powervr', 'adreno', 'mali'
            ];
            
            hardwareSpecs.isDiscreteGPU = discreteGPUKeywords.some(keyword => 
              renderer.toLowerCase().includes(keyword)
            );
          }
        }
      } catch (e) {
        console.log('WebGL GPU detection failed:', e);
      }

      // Log more detailed hardware specs for debugging
      console.log('Hardware specs detected:', hardwareSpecs);
      console.log('Raw deviceMemory API value:', navigator.deviceMemory || 'Not available');
      console.log('Raw hardwareConcurrency API value:', navigator.hardwareConcurrency || 'Not available');
      
      return hardwareSpecs;
    }

    // FPS monitoring
    function startFPSMonitor() {
      function updateFPS() {
        const now = performance.now();
        const fps = 1000 / (now - lastLoop);
        lastLoop = now;
        
        // Store FPS in array and keep only values from the last second
        fpsArray.push({
          timestamp: now,
          fps: fps
        });
        
        // Remove FPS values older than 1 second
        const oneSecondAgo = now - 1000;
        fpsArray = fpsArray.filter(item => item.timestamp >= oneSecondAgo);
        
        // Calculate average FPS over the last second
        if (fpsArray.length > 0) {
          const totalFPS = fpsArray.reduce((sum, item) => sum + item.fps, 0);
          currentFPS = totalFPS / fpsArray.length;
        }
        
        requestAnimationFrame(updateFPS);
      }
      
      requestAnimationFrame(updateFPS);
    }

    // Assess performance tier based on hardware specs and FPS
    function assessTier() {
      // Log the current state for debugging
      console.log('Performance assessment:', {
        cores: hardwareSpecs.cores,
        memory: hardwareSpecs.memory,
        isDiscreteGPU: hardwareSpecs.isDiscreteGPU,
        currentFPS: Math.round(currentFPS)
      });
      
      // Only high and low tiers now
      if (hardwareSpecs.cores >= 6 && 
          hardwareSpecs.memory >= 8 && 
          hardwareSpecs.isDiscreteGPU && 
          currentFPS >= 30) {
        return 'high';
      } else {
        return 'low';
      }
    }

    // Define tier-specific settings (removed mid tier)
    const tierSettings = {
      high: {
        sim_resolution: 208,
        dye_resolution: 592,
        curl: 5,
        dissipation: 0.985,
        emitter_size: 0.05,
        velocity: 0.99,
        pressure: 0.55,
        render_bloom: false,
        render_shaders: true,
        transparent: true,
        paused: false
      },
      low: {
        sim_resolution: 84,  // Further reduced from original low tier (was 104)
        dye_resolution: 256, // Further reduced from original low tier (was 296)
        curl: 5,
        dissipation: 0.90,
        emitter_size: 0.05,
        velocity: 0.85,
        pressure: 0.55,
        render_bloom: false,
        render_shaders: false, // Disabled shaders for low tier to improve performance
        transparent: true,
        paused: false
      }
    };
  
    // Only runs on desktop/large screens (>768px)
    if (typeof Fluid !== 'undefined' && greyCanvas) {
      // Detect hardware capabilities first
      detectSpecs();
      
      // Check minimum requirements - if not met, disable fluid effect entirely
      // NOTE: We're checking if either condition passes (has decent CPU/RAM OR has a discrete GPU)
      const hasMinimumRequirements = 
        (hardwareSpecs.cores >= 4 && hardwareSpecs.memory >= 4) && hardwareSpecs.isDiscreteGPU;
      
      if (!hasMinimumRequirements) {
        console.log('Hardware does not meet minimum requirements for fluid effect, disabling');
        greyCanvas.style.display = 'none';
        return; // This return statement ensures we exit without checking FPS
      }
      
      // Continue with FPS monitoring and fluid initialization
      startFPSMonitor();
      
      greyFluid = new Fluid(greyCanvas);
      
      // Set initial tier based on hardware specs
      // (since FPS monitoring hasn't collected enough data yet)
      let initialTier = 'low'; // Default to low tier
      if (hardwareSpecs.cores >= 6 && hardwareSpecs.memory >= 8 && hardwareSpecs.isDiscreteGPU) {
        initialTier = 'high';
      }
      
      console.log('Initial performance tier:', initialTier);
      
      // Apply initial tier settings
      greyFluid.mapBehaviors(tierSettings[initialTier]);
      greyFluid.activate();
      
      // Fade in the canvas after a short delay (after initial bubble would have disappeared)
      setTimeout(() => {
        greyCanvas.style.opacity = '1';
      }, 2500); // Fade in after 2.5 seconds
      
      // Re-assess tier after 3 seconds when we have FPS data
      setTimeout(() => {
        const tier = assessTier();
        console.log('Updated performance tier after FPS analysis:', tier);
        if (tier !== initialTier) {
          greyFluid.mapBehaviors(tierSettings[tier]);
          greyFluid.activate();
          console.log(`Applied ${tier} tier fluid settings`);
        }
      }, 3000);
    }

    // Set canvas resolution lower on mobile
    function isMobileDevice() {
      return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    if (isMobileDevice()) {
      const canvas = document.getElementById('male-fluid-canvas');
      if (canvas) {
        canvas.width = 320;
        canvas.height = 320;
      }
    }
  });

  // FLUID SIMULATION
  document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("male-fluid-canvas");
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

    // Continuously simulate mouse interactions EVERY 2 SECONDS
    setInterval(simulateFullMouseInteraction, 2000);
});