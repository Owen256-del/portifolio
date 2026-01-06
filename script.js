"use strict";
//auto update year
document.querySelector(".current-year").textContent = new Date().getFullYear();
// Mobile Navigation Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

// Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message! I will get back to you soon.");
  this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});
//Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");

  // Check for saved theme preference
  const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Priority: 1. User saved preference, 2. System preference, 3. Default light
    if (savedTheme) {
      return savedTheme;
    } else if (prefersDark) {
      return "dark";
    } else {
      return "light"; // Your default design
    }
  };

  // Apply theme
  const applyTheme = (theme) => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("portfolio-theme", "dark");
      console.log("Applied: Dark mode");
    } else {
      html.removeAttribute("data-theme");
      localStorage.setItem("portfolio-theme", "light");
      console.log("Applied: Light mode (your design)");
    }

    // Update toggle animation
    themeToggle.classList.add("loading");
    setTimeout(() => {
      themeToggle.classList.remove("loading");
    }, 500);
  };

  // Initialize theme on page load
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";
    body.classList.add("theme-transition");

    setTimeout(() => {
      body.classList.remove("theme-transition");
    }, 500);
    body.style.backgroundColor = isDark ? "#ffffff" : "#121212";

    // Toggle between your light mode and dark mode
    applyTheme(isDark ? "light" : "dark");

    // Optional: Add sound effect
    const clickSound = new Audio();
    clickSound.src =
      "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ"; // Silent audio
    clickSound.play().catch((e) => console.log("Audio play failed:", e));
  });

  // Listen for system theme changes (optional)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // Only change if user hasn't set a preference
      if (!localStorage.getItem("portfolio-theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });

  // Add keyboard accessibility
  themeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      themeToggle.click();
    }
  });
});
