let currentImageIndex = 0;
let images = [];
let scale = 1; // Initial zoom scale
const zoomMin = 1;
const zoomMax = 3;

document.addEventListener("DOMContentLoaded", function () {
    images = [
        document.getElementById("main-image").src,
        ...Array.from(document.getElementsByClassName("subimage")).map(img => img.src)
    ];

    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightbox-img");

    // Zoom on scroll (mouse wheel)
    lightbox.addEventListener("wheel", function (event) {
        event.preventDefault();
        let zoomFactor = event.deltaY < 0 ? 0.1 : -0.1;
        scale = Math.min(Math.max(zoomMin, scale + zoomFactor), zoomMax);
        lightboxImg.style.transform = `scale(${scale})`;
    });

    // Touch zoom for mobile
    let touchStartDistance = 0;

    lightboxImg.addEventListener("touchstart", function (event) {
        if (event.touches.length === 2) {
            touchStartDistance = getTouchDistance(event);
        }
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

function openLightbox(imgElement) {
    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightbox-img");

    currentImageIndex = images.indexOf(imgElement.src);
    lightbox.style.display = "flex";
    lightboxImg.src = imgElement.src;

    scale = 1; // Reset zoom
    lightboxImg.style.transform = `scale(${scale})`;

    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
    document.body.style.overflow = "auto";
}

function changeImage(step) {
    currentImageIndex = (currentImageIndex + step + images.length) % images.length;
    let lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = images[currentImageIndex];

    scale = 1; // Reset zoom when changing image
    lightboxImg.style.transform = `scale(${scale})`;
}
