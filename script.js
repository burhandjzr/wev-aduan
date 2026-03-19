function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

// COUNTER
function animateCounter(id, target) {
  let count = 0;
  let speed = target / 100;

  let interval = setInterval(() => {
    count += speed;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    document.getElementById(id).innerText = Math.floor(count);
  }, 20);
}

// SCROLL ANIMATION
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.style.opacity = 1;
      sec.style.transform = "translateY(0)";
    }
  });
});

// LOAD
window.onload = () => {
  animateCounter("c1", 300);
  animateCounter("c2", 236);
  animateCounter("c3", 11952);
};
