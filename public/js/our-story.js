document.addEventListener("DOMContentLoaded", function () {
    const heading = document.querySelector(".grey-content h2");
    const glow = document.querySelector(".glow");
  
    // Trigger animations after a short delay (e.g., 500ms)
    setTimeout(() => {
      heading.classList.add("visible"); // Zoom in the heading
      glow.classList.add("visible"); // Add glow effect
    }, 100); // Adjust the delay as needed
  });