console.log("main.js loaded");
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        event.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});

document.getElementById("year").textContent = new Date().getFullYear();

/*const toggle=document.querySelector(".nav-toggle");
const menu=document.querySelector(".nav-menu");

if (toggle && menu) {
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");

        toggle.setAttribute(
            "aria-expanded",
            menu.classList.contains("active")
        );

        console.log(menu.className);
    });
}
toggle.addEventListener("click",()=>{

    menu.classList.toggle("active");

    toggle.setAttribute(
        "aria-expanded",
        menu.classList.contains("active")
    );

});*/

const sections=document.querySelectorAll("section");
const links=document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        if(pageYOffset>=top){

            current=section.id;

        }

    });

    links.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {

    navToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        const expanded = navMenu.classList.contains("active");

        navToggle.setAttribute("aria-expanded", expanded);

    });

}
const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        navToggle.setAttribute("aria-expanded", "false");

    });

});
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", () => {

        const button = contactForm.querySelector("button");

        button.disabled = true;

        button.textContent = "Sending...";

    });

}
/* test */
/*const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const status = document.getElementById("formStatus");

    const submitButton = contactForm.querySelector("button");

    console.log(contactForm);

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        console.log("SUBMIT INTERCEPTED");

        submitButton.disabled = true;

        submitButton.textContent = "Sending...";

        status.textContent = "";

        status.className = "form-status";

        const formData = new FormData(contactForm);

        try {

            const response = await fetch("https://formspree.io/f/meeyryld", {

                method: "POST",

                body: formData,

                headers: {

                    Accept: "application/json"

                }

            });

            if (response.ok) {

                status.textContent =
                    "✓ Thank you! Your message has been sent.";

                status.classList.add("success");

                contactForm.reset();

                if (window.turnstile) {

                    turnstile.reset();

                }

            } else {

                throw new Error();

            }

        } catch {

            status.textContent =
                "Unable to send your message. Please try again.";

            status.classList.add("error");

        }

        submitButton.disabled = false;

        submitButton.textContent = "Send Message";

    });

}*/