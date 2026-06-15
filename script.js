const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const cursorLight = document.querySelector(".cursor-light");
const contactForm = document.querySelector("#contactForm");
const statusEl = document.querySelector(".form-status");
const copyButtons = document.querySelectorAll(".copy-email");

const OWNER_EMAIL = "akib.md.shehabuddin@g.bracu.ac.bd";
const EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${OWNER_EMAIL}`;

const savedTheme = localStorage.getItem("akib-theme");
if (savedTheme === "light") {
  root.classList.add("light");
}

toggle?.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("akib-theme", root.classList.contains("light") ? "light" : "dark");
});

window.addEventListener("pointermove", (event) => {
  if (!cursorLight) return;
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});

copyButtons?.forEach((button) => {
  button.addEventListener("click", async () => {
    const originalText = button.textContent;
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = button.dataset.copy.includes("@") ? "Email copied" : "Number copied";
      
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    } catch (error) {
      button.textContent = button.dataset.copy;
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  });
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  if (formData.get("_honey")) return;

  const submitButton = contactForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  statusEl.textContent = "Sending from this page...";

  try {
    const response = await fetch(EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error("Email service did not accept the message.");
    }

    contactForm.reset();
    statusEl.textContent = "Message sent. Thank you - Akib will receive it by email.";
  } catch (error) {
    statusEl.textContent =
      "The form is ready, but the email service may need first-time activation after upload. Please use the copied email or try again from the live GitHub Pages site.";
  } finally {
    submitButton.disabled = false;
  }
});
