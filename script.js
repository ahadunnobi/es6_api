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
    },
      arrow() {
      const add = (a, b) => a + b;
      const square = (x) => x * x;
      const greet = () => "Hello!";

      console.log("add(3, 4)   =", add(3, 4));
      console.log("square(5)   =", square(5));
      console.log("greet()     =", greet());

      // Lexical 'this'
      const timer = {
        id: 42,
        start() {
          return [1, 2, 3].map((n) => n + this.id);
        },
      };
      console.log("lexical this:", timer.start());
    },

    // ── Template literals ───────────────────────────────────
    template() {
      const name = document.getElementById("tl-name").value || "Alice";
      const year = parseInt(document.getElementById("tl-year").value) || 1995;
      const age = new Date().getFullYear() - year;

      console.log(`Hello, ${name}!`);
      console.log(`You are ${age} years old.`);
      const card = `\n  Name: ${name}\n  Age:  ${age}\n`;
      console.log("Multi-line string:", card);
    },

    // ── Destructuring ───────────────────────────────────────
    destructure() {
      const user = { id: 1, name: "Bob", role: "admin" };
      const { name, role } = user;
      console.log("Object destructure:", name, role);

      const [r, , b] = ["red", "green", "blue"];
      console.log("Array destructure (skip middle):", r, b);

      let x = 1,
        y = 2;
      [x, y] = [y, x];
      console.log("Swap x, y:", x, y);

      const { a: { b: deep } = {}, c = "default" } = { a: { b: 99 } };
      console.log("Nested + default:", deep, c);
    },

}
}
