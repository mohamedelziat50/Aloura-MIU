gsap.registerPlugin(ScrollTrigger); //wasalna el gsap be scroll 3lshan section last
window.addEventListener("load", function () { //el page to be fully load 3lshan t3mel el
    const slides = gsap.utils.toArray(".slide"); //25adna el sowar 7atenaha fe array 3lshan ne2dar net7akem feha w nezherha  
    const activeSlideImages = gsap.utils.toArray(".active-slide img");

    // Function to get the initial translateZ value
    function getInitialTranslateZ(slide) {
        const style = window.getComputedStyle(slide); //acces el calculations  w el 2rkam el 27na 3mlenha fe el css files w ygebha hena
        const matrix = style.transform.match(/matrix3d\((.+)\)/);  // lw ne5aly el transformation y apply 3la el 7aga el 3d
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
        ScrollTrigger.create({ //zabatna el range bta3 el scroll trigger
            trigger: ".container", //element that triggers the animation
            start: "top top",
            end: "bottom bottom",
            scrub: true, //bet5aly el animation yb2a smooth tool ma 27na mashyeen
            onUpdate: (self) => { //kol mara b3mel scroll el function beteshta8al
                const progress = self.progress; // progress el animation tool ma 27na mashyeen bel scroll l7d ma nwsal lel  nehaya
                const zIncrement = progress * 7500;  //bta5od el w2ef feen - adjusted for 4 cards - ADJUST THIS TO CONTROL HOW MUCH OF A PROGRESS THERE IS!
                const currentZ = initialZ + zIncrement;  //bn7seb el z-axis w2ef feen  + makan el z el adeem 3lshan netala3 el current z
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


