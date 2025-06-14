window.addEventListener("load", function () {
  // Triggers when page fully loads
  const loader = document.querySelector(".fullpage-loader"); // Loader container
  const bar = document.querySelector(".loading-bar"); // Progress bar

  // Force smooth completion:
  bar.style.animation = "none"; // Stops infinite loop
  bar.style.transition = "width 0.4s linear"; // Matches CSS transition
  bar.style.width = "100%"; // Instantly triggers fill animation

  // Timing control:
  setTimeout(() => {
    // Waits for bar to fill (500ms)
    loader.style.opacity = "0"; // Starts fade-out
    setTimeout(() => loader.remove(), 300); // Removes after fade completes -> .remove() built-in function deletes an HTML element From the DOM
  }, 500); // Matches transition duration
});

/* EXPLAINATION & FLOW

Critical Matches:
CSS transition: width 0.5s linear ↔ JS setTimeout(..., 500) -> Ensures JS waits for CSS animation to finish -> waits for progress bar animation
CSS transition: opacity 0.3s ↔ JS setTimeout(remove, 300) -> Removes element only after fade-out completes -> waits for the entire container opacity transition

Flow:
1. Page loads → Logo pops in via CSS animation
2. Progress bar loops infinitely via loadingBar
3. On window.load:
JS stops loop and forces final fill (0.5s)
After fill completes, triggers fade-out (0.3s)
Removes loader from DOM after fade 
*/
