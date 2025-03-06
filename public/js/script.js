function changeImages(gender) {
  let femaleDiv = document.querySelector(".female"); //selects the first HTML element that has the class female and stores it in femaleDiv
  let maleDiv = document.querySelector(".male");
  let femaleImg = document.getElementById("female-img");
  let maleImg = document.getElementById("male-img");

  if (gender === "female") {
    femaleImg.src = "https://www.perfumestars.com/wp-content/uploads/2024/12/burberry-her-eau-de-parfum-intense-new-fragrance-2024.jpg";
    femaleDiv.classList.add("full-width");
    maleDiv.classList.add("hidden");
  } else if (gender === "male") {
    maleImg.src = "https://cdn.shopify.com/s/files/1/0524/6733/5333/files/Versace_Eros-5_480x480.jpg?v=1609687512";
    maleDiv.classList.add("full-width");
    femaleDiv.classList.add("hidden");
  }
}