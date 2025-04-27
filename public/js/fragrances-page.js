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


    // Collapsible sections functionality
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the arrow icon
            const arrow = this.querySelector('.collapsible-arrow');
            arrow.classList.toggle('active');
            
            // Toggle the content visibility
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });

    // Initialize static gender slider based on data attribute
    const genderSlider = document.querySelector('.gender-slider-container');
    if (genderSlider) {
        // Get the gender value from the data attribute (default to 2 if not set)
        const genderValue = genderSlider.getAttribute('data-gender-value') || '2';
        
        // Convert the gender value to a slider position (1-3)
        let sliderPosition;
        switch (genderValue) {
            case '1': // Male
                sliderPosition = '1';
                break;
            case '2': // Neutral
                sliderPosition = '2';
                break;
            case '3': // Female
                sliderPosition = '3';
                break;
            default:
                sliderPosition = '2'; // Default to neutral
        }
        
        // Remove active class from all points
        const sliderPoints = genderSlider.querySelectorAll('.slider-point');
        sliderPoints.forEach(point => {
            point.classList.remove('active');
            
            // Add active class to the point that matches the gender value
            if (point.getAttribute('data-value') === sliderPosition) {
                point.classList.add('active');
            }
        });
    }
});





document.addEventListener('DOMContentLoaded', function() {
    const suggestedProducts = document.getElementById('suggested-products');
    const prevBtn = document.getElementById('prev-suggestion');
    const nextBtn = document.getElementById('next-suggestion');
    const items = document.querySelectorAll('.suggested-item');
    const itemWidth = items[0].offsetWidth + 32; // width + gap (2rem = 32px)
    
    let currentPosition = 0;
    let autoScrollInterval;
    const totalItems = items.length;
    const visibleItems = 4; // Number of items visible at once
    const maxPosition = -(totalItems - visibleItems) * itemWidth;
    
    // Initialize auto-scroll
    startAutoScroll();
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
        resetAutoScroll();
        if (currentPosition > maxPosition) {
            currentPosition -= itemWidth;
            suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
        } else {
            // If at end, loop back to start
            currentPosition = 0;
            suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
        }
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
        resetAutoScroll();
        if (currentPosition < 0) {
            currentPosition += itemWidth;
            suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
        } else {
            // If at start, loop to end
            currentPosition = maxPosition;
            suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
        }
    });
    
    // Start auto-scroll interval
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (currentPosition > maxPosition) {
                currentPosition -= itemWidth;
                suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
            } else {
                // If at end, loop back to start
                currentPosition = 0;
                suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    // Reset auto-scroll timer when user interacts
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }
    
    // Pause auto-scroll on hover
    suggestedProducts.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    // Resume auto-scroll when mouse leaves
    suggestedProducts.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Recalculate item width on resize
        itemWidth = items[0].offsetWidth + 32;
        maxPosition = -(totalItems - visibleItems) * itemWidth;
        
        // Adjust current position if it's beyond new max position
        if (currentPosition < maxPosition) {
            currentPosition = maxPosition;
        }
        
        suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
    });
});


