document.addEventListener("DOMContentLoaded", function () {
    let images = [
        document.getElementById("main-image").src,
        ...Array.from(document.getElementsByClassName("subimage")).map(img => img.src)
    ];

    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightbox-img");
    let mainImage = document.getElementById("main-image");
    let prevArrow = document.getElementById("prev-arrow");
    let nextArrow = document.getElementById("next-arrow");
    let overlay = document.createElement("div");
    overlay.id = "lightbox-overlay";
    document.body.appendChild(overlay);
    
    let currentImageIndex = 0;
    let scale = 1;
    const zoomMin = 1;
    const zoomMax = 3;

    function openLightbox(index) {
        currentImageIndex = index;
        lightbox.style.display = "flex";
        overlay.style.display = "block"; // Show overlay
        lightboxImg.src = images[currentImageIndex];
        scale = 1;
        lightboxImg.style.transform = `scale(${scale})`;
        document.body.style.overflow = "hidden"; // Disable scrolling
    }

    function closeLightbox() {
        lightbox.style.display = "none";
        overlay.style.display = "none"; // Hide overlay
        document.body.style.overflow = ""; // Enable scrolling
    }

    mainImage.addEventListener("click", function () {
        openLightbox(0);
    });

    document.querySelectorAll(".subimage").forEach((img, index) => {
        img.addEventListener("click", function () {
            openLightbox(index + 1);
        });
    });

    overlay.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    function changeImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) currentImageIndex = images.length - 1;
        else if (currentImageIndex >= images.length) currentImageIndex = 0;
        lightboxImg.src = images[currentImageIndex];
        scale = 1;
        lightboxImg.style.transform = `scale(${scale})`;
    }

    prevArrow.addEventListener("click", function (event) {
        event.stopPropagation();
        changeImage(-1);
    });

    nextArrow.addEventListener("click", function (event) {
        event.stopPropagation();
        changeImage(1);
    });

    lightboxImg.addEventListener("wheel", function (event) {
        event.preventDefault();
        let zoomFactor = event.deltaY < 0 ? 0.1 : -0.1;
        scale = Math.min(Math.max(zoomMin, scale + zoomFactor), zoomMax);
        lightboxImg.style.transform = `scale(${scale})`;
    });

    let touchStartDistance = 0;
    lightboxImg.addEventListener("touchstart", function (event) {
        if (event.touches.length === 2) touchStartDistance = getTouchDistance(event);
    });

    lightboxImg.addEventListener("touchmove", function (event) {
        if (event.touches.length === 2) {
            event.preventDefault();
            let newDistance = getTouchDistance(event);
            let zoomFactor = newDistance / touchStartDistance;
            scale = Math.min(Math.max(zoomMin, scale * zoomFactor), zoomMax);
            lightboxImg.style.transform = `scale(${scale})`;
            touchStartDistance = newDistance;
        }
    });

    function getTouchDistance(event) {
        let dx = event.touches[0].clientX - event.touches[1].clientX;
        let dy = event.touches[0].clientY - event.touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
});





document.addEventListener("DOMContentLoaded", function () {
    const suggestedProducts = document.getElementById("suggested-products");
    const items = document.querySelectorAll(".suggested-item");
    const itemWidth = items[0].offsetWidth+ 20; // Ensure this includes margins if necessary
    let currentIndex = 0;
    const visibleItems = 3; // Number of items shown at a time
    const totalItems = items.length;

    function updateCarousel() {
        suggestedProducts.style.transition = "transform 0.3s ease-in-out"; // Smooth scrolling
        suggestedProducts.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    document.getElementById("next-suggestion").addEventListener("click", function () {
        if (currentIndex < totalItems - visibleItems) { 
            currentIndex++; 
        } else {
            currentIndex = 0; // Loop back to the start
        }
        updateCarousel();
    });

    document.getElementById("prev-suggestion").addEventListener("click", function () {
        if (currentIndex > 0) { 
            currentIndex--; 
        } else {
            currentIndex = totalItems - visibleItems; // Loop back to the end
        }
        updateCarousel();
    });

    // Ensure correct initial position
    suggestedProducts.style.transform = "translateX(0px)";
});





document.addEventListener("DOMContentLoaded", function() {
    const suggestedProducts = document.getElementById("suggested-products");
    const items = document.querySelectorAll(".suggested-item");
    const prevBtn = document.getElementById("prev-suggestion");
    const nextBtn = document.getElementById("next-suggestion");
    
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 20; // Width + margin
    const visibleItems = 3; // Number of items shown at once
    let autoSlideInterval;

    // Function to move carousel to specific index
    function moveToIndex(index) {
        currentIndex = index;
        suggestedProducts.style.transition = "transform 0.8s ease-in-out";
        suggestedProducts.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Auto-advance to next item
    function autoAdvance() {
        if (currentIndex < items.length - visibleItems) {
            moveToIndex(currentIndex + 1);
        } else {
            // If at end, loop back to start
            moveToIndex(0);
        }
    }

    // Manual navigation
    nextBtn.addEventListener("click", function() {
        clearInterval(autoSlideInterval); // Pause auto-slide on manual interaction
        if (currentIndex < items.length - visibleItems) {
            moveToIndex(currentIndex + 1);
        } else {
            moveToIndex(0);
        }
        startAutoSlide(); // Restart auto-slide after delay
    });

    prevBtn.addEventListener("click", function() {
        clearInterval(autoSlideInterval);
        if (currentIndex > 0) {
            moveToIndex(currentIndex - 1);
        } else {
            moveToIndex(items.length - visibleItems);
        }
        startAutoSlide();
    });

    // Start auto-sliding
    function startAutoSlide() {
        // Clear existing interval if any
        clearInterval(autoSlideInterval);
        // Start new interval
        autoSlideInterval = setInterval(autoAdvance, 3000);
    }

    // Initialize
    moveToIndex(0);
    startAutoSlide();

    // Pause on hover.
    const carouselContainer = document.querySelector("#suggested-products-container");
    carouselContainer.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
    });
    carouselContainer.addEventListener("mouseleave", startAutoSlide);

    // Handle window resize
    window.addEventListener("resize", function() {
        itemWidth = items[0].offsetWidth + 20;
        moveToIndex(currentIndex);
    });
});


5