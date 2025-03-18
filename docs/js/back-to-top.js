window.addEventListener('scroll', function()
{
  // This calculates the current scroll position of the user
  const scrollPosition = window.scrollY || window.pageYOffset;

  const triggerPosition = 500; // Desired scroll position on window

  // Our back to top button that we want to play with
  const element = document.getElementById('back-to-top-button');

  // Only change opacity, in which animation happens through 'transition' inside css
  if (scrollPosition > triggerPosition) {
    element.style.opacity = '1'; // Fade in
    element.style.cursor = "pointer"
  } else {
    element.style.opacity = '0'; // Fade out
    element.style.cursor = "default"
  }
});