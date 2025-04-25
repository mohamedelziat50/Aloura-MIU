document.addEventListener("DOMContentLoaded", function () {
  const heading = document.querySelector(".grey-content h2");
  const glow = document.querySelector(".glow");
  const video = document.getElementById("cyclingVideo");
  const source = document.getElementById("videoSource");
  const audioElement = document.getElementById("videoAudio");
  const muteBtn = document.getElementById("muteToggle");
  const muteIcon = muteBtn.querySelector("i");
  
  // Set initial volume
  audioElement.volume = 0.4;
  
  // Check if it's a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Trigger animations after a short delay
  setTimeout(() => {
    heading.classList.add("visible"); // Zoom in the heading
    glow.classList.add("visible"); // Add glow effect
  }, 100);
  
  // Function to handle video transitions without layout shifts
  function switchVideo(newSrc) {
    video.style.transition = "opacity 0.7s";
    video.style.opacity = 0; // Fade out
    
    setTimeout(() => {
      source.src = newSrc;
      video.load();
      
      // When video can play, fade it in
      video.oncanplay = function() {
        video.style.opacity = 1; // Fade in
        video.play().catch(error => {
          console.log("Video play error:", error);
        });
      };
    }, 700);
  }
  
  // Mobile-friendly audio toggle
  muteBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    
    if (audioElement.paused) {
      // Start audio playback with a user gesture
      audioElement.play()
        .then(() => {
          muteIcon.className = "fas fa-volume-up";
        })
        .catch(error => {
          console.log("Audio play error:", error);
          // If there's an error playing, show a message for mobile users
          if (isMobile) {
            alert("Please enable sound in your browser settings for the full experience.");
          }
        });
    } else {
      // Pause audio playback
      audioElement.pause();
      muteIcon.className = "fas fa-volume-mute";
    }
  });
  
  // Array of video sources to cycle through
  const videos = [
    "../videos/photoshoot-2.mp4",
    "../videos/photoshoot.mp4",
    "../videos/photoshoot-romeo.mp4",
    "../videos/photoshoot-3.mp4",
    "../videos/photoshoot-nasser.mp4",
  ];
  
  let currentIndex = 0;
  
  // Handle video ending and transition to next video
  video.onended = function() {
    currentIndex = (currentIndex + 1) % videos.length;
    switchVideo(videos[currentIndex]);
  };
  
  // On mobile, preload the next video ahead of time to reduce jank
  if (isMobile) {
    // Preload next video when current one is halfway through
    video.ontimeupdate = function() {
      if (video.currentTime > video.duration / 2 && !window.nextVideoPreloaded) {
        const nextIndex = (currentIndex + 1) % videos.length;
        const nextVideo = new Image();
        nextVideo.src = videos[nextIndex];
        window.nextVideoPreloaded = true;
      }
    };
    
    // Reset preload flag when video changes
    video.onplay = function() {
      window.nextVideoPreloaded = false;
    };
  }
});