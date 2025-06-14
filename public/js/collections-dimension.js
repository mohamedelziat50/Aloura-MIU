gsap.registerPlugin(ScrollTrigger); //wasalna el gsap be scroll 3lshan section last
window.addEventListener("load", function () {
  //el page to be fully load 3lshan t3mel el
  const slides = gsap.utils.toArray(".slide"); //25adna el sowar 7atenaha fe array 3lshan ne2dar net7akem feha w nezherha
  const activeSlideImages = gsap.utils.toArray(".active-slide img");

  // Function to get the initial translateZ value
  function getInitialTranslateZ(slide) {
    const style = window.getComputedStyle(slide); //acces el calculations  w el 2rkam el 27na 3mlenha fe el css files w ygebha hena
    const matrix = style.transform.match(/matrix3d\((.+)\)/); // lw ne5aly el transformation y apply 3la el 7aga el 3d
    if (matrix) {
      const values = matrix[1].split(", "); // hanefsel el array w ne7ot  kol wa7da lwa7daha w n3melaha split be comma
      return parseFloat(values[14] || 0); //hatala3 el value of el index
    }
    return 0; // lw mafeesh matrix mawgoda hayreturn zero
  }

  // Function to map range of values () benzabat range of values bta3 el 3d
  function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    // it's used to map the range of currentZ (the current Z-axis position) to the range of opacity values. It ensures that as the slides move along the Z-axis (in 3D space), their opacity changes smoothly.
  }

  // Loop through slides to set up ScrollTrigger
  slides.forEach((slide, index) => {
    const initialZ = getInitialTranslateZ(slide);
    ScrollTrigger.create({
      //zabatna el range bta3 el scroll trigger
      trigger: ".container", //element that triggers the animation
      start: "top top",
      end: "bottom bottom",
      scrub: true, //bet5aly el animation yb2a smooth tool ma 27na mashyeen
      onUpdate: (self) => {
        //kol mara b3mel scroll el function beteshta8al
        const progress = self.progress; // progress el animation tool ma 27na mashyeen bel scroll l7d ma nwsal lel  nehaya
        const zIncrement = progress * 8500; //bta5od el w2ef feen - adjusted for 4 cards - ADJUST THIS TO CONTROL HOW MUCH OF A PROGRESS THERE IS!
        const currentZ = initialZ + zIncrement; //bn7seb el z-axis w2ef feen  + makan el z el adeem 3lshan netala3 el current z
        let opacity;
        if (currentZ > -2500) {
          opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
          //If currentZ is greater than -2500, it means the slide is closer to the viewer, so we map its opacity smoothly from 0.5 to 1 as it moves closer.
        } else {
          //  If currentZ is less than or equal to -2500, it means the slide is farther from the viewer, so we map its opacity smoothly from 0 to 0.5 as it moves farther away.
          opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
        }
        slide.style.opacity = opacity;
        slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;
        if (currentZ < 100) {
          gsap.to(activeSlideImages[index], 1.5, {
            opacity: 1,
            ease: "power3.out", //visiual effect for the opacity
          });
        } else {
          gsap.to(activeSlideImages[index], 1.5, {
            opacity: 0,
            ease: "power3.out",
          });
        }
      },
    });
  });
});

// Intersection Observer for the Universe section
const universeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

// Observe universe elements
document.addEventListener("DOMContentLoaded", () => {
  const universeText = document.querySelector(".universe-text");
  const universeImage = document.querySelector(".universe-image");

  if (universeText) universeObserver.observe(universeText);
  if (universeImage) universeObserver.observe(universeImage);

  // Parallax effect for universe section
  const universeSection = document.querySelector(".universe-section");
  if (universeSection) {
    window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      universeSection.style.backgroundPosition = `${x}px ${y}px`;
    });
  }

  // Add particle effect
  createParticles();
});

// Create floating particles
function createParticles() {
  const universeSection = document.querySelector(".universe-section");
  if (!universeSection) return;

  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles-container";
  particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
  universeSection.appendChild(particlesContainer);

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, ${Math.random() * 0.3});
            border-radius: 50%;
            pointer-events: none;
            width: ${Math.random() * 4}px;
            height: ${Math.random() * 4}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            transform: scale(0);
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
        `;
    particlesContainer.appendChild(particle);
  }
}

// Add explosion effect on universe button click
document.addEventListener("DOMContentLoaded", () => {
  const universeButton = document.querySelector(".universe-button");
  if (universeButton) {
    universeButton.addEventListener("click", createExplosion);
  }
});

function createExplosion(e) {
  const explosion = document.createElement("div");
  explosion.className = "explosion";
  explosion.style.cssText = `
        position: absolute;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
    `;

  // Create particles for explosion
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    const angle = (i / 20) * 360;
    const velocity = 5 + Math.random() * 5;

    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            transform: rotate(${angle}deg) translateX(10px);
            animation: explode 1s ease-out forwards;
        `;

    explosion.appendChild(particle);
  }

  document.body.appendChild(explosion);
  setTimeout(() => explosion.remove(), 1000);
}

// Add style for animations
const style = document.createElement("style");
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        20% {
            transform: translateY(-20%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
        }
    }

    @keyframes explode {
        0% {
            transform: rotate(var(--angle)) translateX(10px);
            opacity: 1;
        }
        100% {
            transform: rotate(var(--angle)) translateX(100px);
            opacity: 0;
        }
    }

    .particle {
        will-change: transform, opacity;
    }

    .explosion {
        z-index: 1000;
    }
`;

document.head.appendChild(style);
