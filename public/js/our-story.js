document.addEventListener("DOMContentLoaded", function () {
    const heading = document.querySelector(".grey-content h2");
    const glow = document.querySelector(".glow");
  
    // Trigger animations after a short delay (e.g., 500ms)
    setTimeout(() => {
      heading.classList.add("visible"); // Zoom in the heading
      glow.classList.add("visible"); // Add glow effect
    }, 100); // Adjust the delay as needed
  

  // AUDIO RELATED
  const muteBtn = document.getElementById("muteToggle");
  const muteIcon = muteBtn.querySelector("i");
  const audioElement = document.getElementById("videoAudio");

  // Set initial volume
  audioElement.volume = 0.4; 

  // Mute toggle functionality
  muteBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling

    if (audioElement.paused) {
      // Start audio playback
      audioElement.play();
      muteIcon.className = "fas fa-volume-up";
    } else {
      // Pause audio playback
      audioElement.pause();
      muteIcon.className = "fas fa-volume-mute";
    }
  });

  // VIDEO CYCLE RELATED
  // VIDEO CYCLE RELATED
  const video = document.getElementById("cyclingVideo");
  const source = document.getElementById("videoSource");

  // Array of video sources to cycle through
  const videos = [
    "../videos/photoshoot-2.mp4",
    "../videos/photoshoot.mp4",
    "../videos/photoshoot-romeo.mp4",
    "../videos/photoshoot-3.mp4",
    "../videos/photoshoot-nasser.mp4",
  ];

  let currentIndex = 0;

  video.onended = function () {
    video.style.transition = "opacity 0.7s";
    video.style.opacity = 0; // Fade out

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % videos.length;
      source.src = videos[currentIndex];

      video.load();
      video.oncanplay = function () {
        video.style.opacity = 1; // Fade in
        video.play();
      };
    }, 700); // Wait 1s before switching video
  };
});