document.addEventListener("DOMContentLoaded", function () {
  const heading = document.querySelector(".grey-content h2");
  const glow = document.querySelector(".glow");
  const videos = [
    document.getElementById("video1"),
    document.getElementById("video2"),
    document.getElementById("video3"),
    document.getElementById("video4"),
    document.getElementById("video5")
  ];
  const audioElement = document.getElementById("videoAudio");
  const muteBtn = document.getElementById("muteToggle");
  const muteIcon = muteBtn.querySelector("i");
  
  // Set initial volume
  audioElement.volume = 0.4;
  
  // Trigger animations after a short delay
  setTimeout(() => {
    heading.classList.add("visible"); // Zoom in the heading
    glow.classList.add("visible"); // Add glow effect
  }, 100);
  
  // Set up initial video styles
  videos.forEach((video, index) => {
    // Add transition for smooth fade effect
    video.style.transition = "opacity 0.7s ease";
    
    // Make sure first video is fully visible
    if (index === 0) {
      video.style.opacity = 1;
      video.style.display = "block";
    } else {
      video.style.opacity = 0;
      video.style.display = "none";
    }
  });
  
  let currentVideoIndex = 0;
  let isTransitioning = false;
  
  // Function to show next video with proper fade effect
  function showNextVideo() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Get current and next video elements
    const currentVideo = videos[currentVideoIndex];
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    const nextVideo = videos[nextIndex];
    
    // 1. Start by fading out current video
    currentVideo.style.opacity = 0;
    
    // 2. After fade out completes, prepare next video but keep it invisible
    setTimeout(() => {
      // Hide the current video completely after fade out
      currentVideo.style.display = "none";
      
      // Reset current video to beginning for next time
      currentVideo.currentTime = 0;
      
      // Show next video element but with opacity 0
      nextVideo.style.display = "block";
      nextVideo.style.opacity = 0;
      
      // Make sure video is ready to play
      nextVideo.load();
      
      // 3. Start playing next video while still invisible
      const playPromise = nextVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 4. After a small delay, fade in the next video
            setTimeout(() => {
              nextVideo.style.opacity = 1;
              currentVideoIndex = nextIndex;
              isTransitioning = false;
            }, 50);
          })
          .catch(error => {
            console.log("Video play error:", error);
            // If error playing, still show the video and move to next index
            nextVideo.style.opacity = 1;
            currentVideoIndex = nextIndex;
            isTransitioning = false;
          });
      } else {
        // Fallback if play() doesn't return a promise (older browsers)
        setTimeout(() => {
          nextVideo.style.opacity = 1;
          currentVideoIndex = nextIndex;
          isTransitioning = false;
        }, 50);
      }
    }, 700); // Wait for fade out to complete
  }
  
  // Set up ended event for each video
  videos.forEach(video => {
    // When video ends, show next video
    video.addEventListener("ended", showNextVideo);
    
    // Handle errors by skipping to next video
    video.addEventListener("error", function(e) {
      console.error("Video error:", e);
      showNextVideo();
    });
    
    // For iOS/mobile - ensure videos don't stall
    video.addEventListener("stalled", function(e) {
      console.warn("Video stalled:", e);
      if (!isTransitioning) {
        showNextVideo();
      }
    });
  });
  
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
          muteIcon.className = "fas fa-volume-mute";
          
          // Simple alert for audio issues
          alert("To enable sound: Make sure your device is not on silent mode and your media volume is turned up.");
        });
    } else {
      // Pause audio playback
      audioElement.pause();
      muteIcon.className = "fas fa-volume-mute";
    }
  });
});