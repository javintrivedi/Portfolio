document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    function updateActiveLink() {
        let scrollPosition = window.scrollY + 100; // Offset to detect section correctly

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove("active"));
                correspondingNavLink.classList.add("active");
            }
        });
    }

    // Detect scroll to update active link
    window.addEventListener("scroll", updateActiveLink);

    // Add smooth scrolling behavior for nav links
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjust to match navbar height
                behavior: "smooth"
            });

            // Manually update active class for immediate effect
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });
});

window.addEventListener("scroll", function () {
    let reveals = document.querySelectorAll(".reveal");
  
    reveals.forEach((section) => {
      let windowHeight = window.innerHeight;
      let sectionTop = section.getBoundingClientRect().top;
      let sectionVisible = 150;
  
      if (sectionTop < windowHeight - sectionVisible) {
        section.classList.add("active");
      }
    });
  });

  window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    navbar.classList.toggle("shrink", window.scrollY > 50);
  });
  