// Keyboard navigation, theme toggle, copy-to-clipboard, and scrollspy
(function () {
  var sections = ["work", "about", "experience", "skills", "contact"];

  // Helper: Flash visual feedback on nav link
  function flashNav(index) {
    var links = document.querySelectorAll(".site-nav a");
    if (links && links[index]) {
      links[index].classList.add("nav-active");
      setTimeout(function () {
        links[index].classList.remove("nav-active");
      }, 500);
    }
  }

  // Theme Toggle Logic
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme");
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) { }

    var themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.classList.add("theme-btn-pulse");
      setTimeout(function () {
        themeBtn.classList.remove("theme-btn-pulse");
      }, 350);
    }
  }

  // Bind Theme Toggle Button Click
  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Keyboard Navigation & Shortcuts
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;

    var key = e.key;
    var n = parseInt(key, 10);

    // Number keys 1-5
    if (n >= 1 && n <= sections.length) {
      flashNav(n - 1);
      var el = document.getElementById(sections[n - 1]);
      if (el) {
        el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        history.replaceState(null, "", "#" + sections[n - 1]);
      } else {
        location.href = "/#" + sections[n - 1];
      }
    }
    // T for theme toggle
    else if (key === "t" || key === "T") {
      toggleTheme();
    }
    // Esc to return to work
    else if (key === "Escape" && location.pathname.indexOf("/projects/") === 0) {
      location.href = "/#work";
    }
    // Left/Right arrow keys for projects
    else if (key === "ArrowLeft" || key === "ArrowRight") {
      var link = document.querySelector('[data-key="' + (key === "ArrowLeft" ? "prev" : "next") + '"]');
      if (link) location.href = link.getAttribute("href");
    }
  });

  // Copy Email Buttons
  var copyBtns = document.querySelectorAll(".btn-copy");
  copyBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var email = btn.getAttribute("data-email");
      if (!email) return;
      navigator.clipboard.writeText(email).then(function () {
        var label = btn.querySelector(".copy-text") || btn.querySelector(".copy-label");
        if (label) {
          var original = label.textContent;
          label.textContent = "Copied!";
          btn.classList.add("copied");
          setTimeout(function () {
            label.textContent = original;
            btn.classList.remove("copied");
          }, 2000);
        }
      }).catch(function () {
        location.href = "mailto:" + email;
      });
    });
  });

  // Scrollspy for active nav link
  if ("IntersectionObserver" in window && (location.pathname === "/" || location.pathname === "/index.html")) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            var navLinks = document.querySelectorAll(".site-nav a");
            navLinks.forEach(function (a) {
              if (a.getAttribute("href").indexOf("#" + id) !== -1) {
                a.classList.add("nav-active");
              } else {
                a.classList.remove("nav-active");
              }
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(function (secId) {
      var el = document.getElementById(secId);
      if (el) observer.observe(el);
    });
  }
})();

