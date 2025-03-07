function changeImages(gender) {
  let femaleDiv = document.querySelector(".female"); //selects the first HTML element that has the class female and stores it in femaleDiv
  let maleDiv = document.querySelector(".male");
  let femaleImg = document.getElementById("female-img");
  let maleImg = document.getElementById("male-img");
  let indulge = document.getElementById("text-overlay-indulge");

  if (gender === "female") {
    femaleImg.src = "https://www.perfumestars.com/wp-content/uploads/2024/12/burberry-her-eau-de-parfum-intense-new-fragrance-2024.jpg";
    femaleDiv.classList.add("full-width");
    maleDiv.classList.add("hidden");
    indulge.classList.add("hidden");
  } else if (gender === "male") {
    maleImg.src = "https://cdn.shopify.com/s/files/1/0524/6733/5333/files/Versace_Eros-5_480x480.jpg?v=1609687512";
    maleDiv.classList.add("full-width");
    femaleDiv.classList.add("hidden");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      nav.classList.add('hidden'); // Hide navbar when scrolling down
      nav.classList.remove('nav-visible'); // Remove visibility class
    } else {
      nav.classList.remove('hidden'); // Reset hidden state
      nav.classList.add('nav-visible'); // Show the whole navbar
    }

    lastScrollY = currentScrollY;
  });
});
