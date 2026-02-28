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
    // ── Spread & Rest ───────────────────────────────────────
    spread() {
      const a = [1, 2, 3];
      const b = [0, ...a, 4];
      console.log("Spread array:", b);

      const obj1 = { x: 1 };
      const obj2 = { ...obj1, y: 2 };
      console.log("Spread object:", obj2);

      function sum(first, ...rest) {
        return first + rest.reduce((t, n) => t + n, 0);
      }
      console.log("Rest params sum(1,2,3,4):", sum(1, 2, 3, 4));

      // for...of
      const fruits = ["🍎", "🍌", "🍒"];
      const result = [];
      for (const f of fruits) result.push(f);
      console.log("for...of fruits:", result.join(" "));
    },

    // ── Classes ─────────────────────────────────────────────
    classes() {
      class Animal {
        constructor(name) {
          this.name = name;
        }
        speak() {
          return `${this.name} makes a noise.`;
        }
      }
      class Dog extends Animal {
        speak() {
          return `${this.name} barks!`;
        }
      }
      const a = new Animal("Cat");
      const d = new Dog("Rex");
      console.log(a.speak());
      console.log(d.speak());
      console.log("d instanceof Animal:", d instanceof Animal);
      console.log("d instanceof Dog:", d instanceof Dog);
    },

    // ── Symbol ──────────────────────────────────────────────
    symbol() {
      const id = Symbol("id");
      const id2 = Symbol("id");
      console.log("id === id2:", id === id2);

      const obj = { [id]: 123, name: "Alice" };
      console.log("obj[id]:", obj[id]);
      console.log("Object.keys:", Object.keys(obj));
      console.log("Symbol hidden from for-in ✓");
    },


}
}
