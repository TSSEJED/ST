// scripts/app.js
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
window.onscroll = function() {
    let button = document.getElementById("backToTop");
    if (document.documentElement.scrollTop > 200) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  // Function to apply typewriter effect to multiple elements
function typeWriterEffect(element) {
    const text = element.innerHTML; // Get the text content
    let index = 0;
    element.innerHTML = ""; // Clear the text for animation
  
    function typeEffect() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index); // Add one letter at a time
        index++;
        setTimeout(typeEffect, 100); // Adjust speed (lower is faster)
      }
    }
    typeEffect();
  }
  
  // Apply the effect to all elements with the class "typewrite"
  window.onload = () => {
    const elements = document.querySelectorAll(".typewrite"); // Select all matching elements
    elements.forEach((element) => {
      typeWriterEffect(element);
    });
  };
  
