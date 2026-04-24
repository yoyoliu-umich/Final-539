// Accordion functionality
const accordions = document.querySelectorAll(".accordion");

function openAccordion(button) {
  const panelId = button.getAttribute("aria-controls");
  const panel = document.getElementById(panelId);

  button.setAttribute("aria-expanded", "true");
  panel.hidden = false;
}

function closeAccordion(button) {
  const panelId = button.getAttribute("aria-controls");
  const panel = document.getElementById(panelId);

  button.setAttribute("aria-expanded", "false");
  panel.hidden = true;
}

accordions.forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";

    if (expanded) {
      closeAccordion(button);
    } else {
      openAccordion(button);
    }
  });
});

// Open accordion panel if the URL has a hash
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;

  if (hash) {
    const panel = document.querySelector(hash);

    if (panel && panel.classList.contains("panel")) {
      panel.hidden = false;

      const buttonId = panel.getAttribute("aria-labelledby");
      const button = document.getElementById(buttonId);

      if (button) {
        button.setAttribute("aria-expanded", "true");

        setTimeout(() => {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }
});

// Dark mode toggle
const darkToggle = document.getElementById("darkToggle");

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkToggle.textContent = "☀️ Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      darkToggle.textContent = "🌙 Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkToggle.textContent = "☀️ Light Mode";
  }
}

// Daily wellness tip on homepage
const dailyTip = document.getElementById("daily-tip");

if (dailyTip) {
  const tips = [
    "Wellness Tip: Take a five-minute break away from your screen.",
    "Wellness Tip: Drink water and give your body a short reset.",
    "Wellness Tip: Try writing down one task you can finish today.",
    "Wellness Tip: Take three slow breaths before starting your next assignment.",
    "Wellness Tip: A short walk can help clear your mind and reduce stress."
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  dailyTip.textContent = randomTip;
}

// Resource search filter
const searchInput = document.getElementById("search");
const noResults = document.getElementById("no-results");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const items = document.querySelectorAll(".resource-list li");
    let visibleCount = 0;

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();

      if (text.includes(value)) {
        item.style.display = "block";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    accordions.forEach((button) => {
      openAccordion(button);
    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  });
}

// Check-in form personalized feedback
const wellnessForm = document.querySelector(".wellness-form");
const checkinResult = document.getElementById("checkin-result");

if (wellnessForm && checkinResult) {
  wellnessForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const feelingInput = document.querySelector("input[name='feeling']:checked");
    const supportInputs = document.querySelectorAll("input[name='support']:checked");

    const name = nameInput.value.trim() || "there";
    const feeling = feelingInput ? feelingInput.value : "";
    const selectedSupports = Array.from(supportInputs).map((input) => input.value);

    let title = `Thanks for checking in, ${name}!`;
    let message = "Based on your response, here are some resources that may be helpful today.";
    let recommendation = "";

    if (feeling === "stressed" || feeling === "overwhelmed" || selectedSupports.includes("mental-health")) {
      recommendation = `
        <h4>Recommended: Mental Health Support</h4>
        <p>You may want to start with counseling, crisis support, or Wolverine Wellness resources.</p>
        <a href="resources.html#panel1">View Mental Health Resources</a>
      `;
    } else if (selectedSupports.includes("study-support")) {
      recommendation = `
        <h4>Recommended: Academic Support</h4>
        <p>You may benefit from writing support, tutoring, or study tools.</p>
        <a href="resources.html#panel2">View Academic Support Resources</a>
      `;
    } else if (selectedSupports.includes("self-care")) {
      recommendation = `
        <h4>Recommended: Self-Care & Wellness</h4>
        <p>Try exploring sleep, mindfulness, and daily wellness resources.</p>
        <a href="resources.html#panel3">View Self-Care Resources</a>
      `;
    } else {
      recommendation = `
        <h4>Recommended: Explore All Resources</h4>
        <p>You can browse different wellness categories and choose what feels most useful.</p>
        <a href="resources.html">Explore Resources</a>
      `;
    }

    if (feeling === "good") {
      message = "It is great that you are feeling good today. Keep building routines that support your wellbeing.";
    }

    if (feeling === "okay") {
      message = "Thanks for taking time to reflect. Even small wellness steps can help.";
    }

    checkinResult.innerHTML = `
      <h3>${title}</h3>
      <p>${message}</p>
      ${recommendation}
    `;

    checkinResult.hidden = false;
    checkinResult.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
