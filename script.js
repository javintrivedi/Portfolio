document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    const nav = document.querySelector('.navbar ul');
    const burger = document.querySelector('.burger');

    function updateActiveLink() {
        let scrollPosition = window.scrollY + 100; // Offset to detect section correctly

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove("active"));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add("active");
                }
            }
        });
    }

    function handleScrollReveal() {
        let reveals = document.querySelectorAll(".reveal");
  
        reveals.forEach((section) => {
            let windowHeight = window.innerHeight;
            let sectionTop = section.getBoundingClientRect().top;
            let sectionVisible = 150;
  
            if (sectionTop < windowHeight - sectionVisible) {
                section.classList.add("active");
            }
        });
    }

    function handleNavbarShrink() {
        let navbar = document.querySelector(".navbar");
        navbar.classList.toggle("shrink", window.scrollY > 50);
    }

    // Combined scroll event handler
    function handleScroll() {
        updateActiveLink();
        handleScrollReveal();
        handleNavbarShrink();
    }

    // Attach single scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Trigger once on load to set initial states
    handleScroll();

    // Add smooth scrolling behavior for nav links
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust to match navbar height
                    behavior: "smooth"
                });

                // Manually update active class for immediate effect
                navLinks.forEach(link => link.classList.remove("active"));
                this.classList.add("active");
            }

            // Close mobile menu if open
            if (nav && nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                if (burger) burger.classList.remove('toggle');
            }
        });
    });
    
    // Burger menu functionality
    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            // Toggle nav
            if (nav) nav.classList.toggle('nav-active');
             
            // Animate burger
            burger.classList.toggle('toggle');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav) nav.classList.remove('nav-active');
            if (burger) burger.classList.remove('toggle');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && burger && nav.classList.contains('nav-active') && 
            !nav.contains(e.target) && 
            !burger.contains(e.target)) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});
  
