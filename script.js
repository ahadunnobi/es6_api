function captureOutput(fn) {
  const lines = [];
  const orig = console.log;
  console.log = (...args) => {
    lines.push(
      args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" "),
    );
  };
  try {
    fn();
  } catch (e) {
    lines.push("Error: " + e.message);
  }
  console.log = orig;
  return lines.join("\n");
}

function setOutput(id, text, isError = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = "output" + (isError ? " error" : "");
}
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".panel")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("panel-" + btn.dataset.tab).classList.add("active");
  });
});

// ── Accordion cards ─────────────────────────────────────────
document.querySelectorAll(".demo-card-header").forEach((header) => {
  header.addEventListener("click", () => {
    header.closest(".demo-card").classList.toggle("open");
  });
});

// ── Run buttons (static demos) ──────────────────────────────
document.querySelectorAll(".btn-run[data-demo]").forEach((btn) => {
  btn.addEventListener("click", () => runDemo(btn.dataset.demo));
});

function runDemo(name) {
  const demos = {
    // ── let & const ─────────────────────────────────────────
    letconst() {
      let score = 10;
      score = 20;
      console.log("score after reassign:", score);

      const MAX = 100;
      console.log("MAX:", MAX);

      if (true) {
        let blockVar = "only inside block";
        console.log("blockVar inside block:", blockVar);
      }
      try {
        // blockVar is not accessible here
        eval("console.log(blockVar)");
      } catch (e) {
        console.log("blockVar outside block → ReferenceError ✓");
      }
    }
    
}
}
