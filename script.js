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

    // ── Set ─────────────────────────────────────────────────
    set() {
      const s = new Set([1, 2, 2, 3, 3, 3]);
      console.log("Set from [1,2,2,3,3,3]:", [...s]);
      console.log("size:", s.size);
      s.add(4);
      s.delete(1);
      console.log("after add(4) delete(1):", [...s]);
      console.log("has(1):", s.has(1));
      console.log("has(4):", s.has(4));
    },

    // ── Reflect ─────────────────────────────────────────────
    reflect() {
      const obj = { a: 1, b: 2 };
      Reflect.set(obj, "c", 3);
      console.log("get c:", Reflect.get(obj, "c"));
      console.log("has a:", Reflect.has(obj, "a"));
      Reflect.deleteProperty(obj, "b");
      console.log("after deleteProperty b:", JSON.stringify(obj));
    },

    // ── Array.from ──────────────────────────────────────────
    arrayfrom() {
      console.log("from string:", Array.from("hello"));
      console.log("from set:", Array.from(new Set([1, 2, 3])));
      console.log(
        "from map:",
        Array.from({ length: 4 }, (_, i) => i * i),
      );
    },

    // ── find & findIndex ────────────────────────────────────
    find() {
      const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "Diana" },
        { id: 5, name: "Eve" },
      ];
      const target = parseInt(document.getElementById("find-id").value) || 2;
      const found = users.find((u) => u.id === target);
      const idx = users.findIndex((u) => u.id === target);
      console.log(
        "find id=" + target + ":",
        found ? JSON.stringify(found) : "undefined",
      );
      console.log("findIndex:", idx);
    },

    // ── entries & keys ──────────────────────────────────────
    entries() {
      const letters = ["a", "b", "c"];
      for (const [i, v] of letters.entries()) {
        console.log(`entries ${i}: ${v}`);
      }
      console.log("keys:", [...letters.keys()]);
    },

    // ── Object methods ──────────────────────────────────────
    objectmethods() {
      const merged = Object.assign({}, { a: 1 }, { b: 2 }, { a: 99 });
      console.log("assign (a overridden):", merged);

      console.log("Object.is(NaN, NaN):", Object.is(NaN, NaN));
      console.log("NaN === NaN        :", NaN === NaN);
      console.log("Object.is(0, -0)   :", Object.is(0, -0));
      console.log("0 === -0           :", 0 === -0);
    },

    // ── Number.EPSILON ──────────────────────────────────────
    numbereps() {
      const sum = 0.1 + 0.2;
      console.log("0.1 + 0.2 =", sum);
      console.log("=== 0.3?", sum === 0.3);
      console.log("≈ 0.3 via EPSILON?", Math.abs(sum - 0.3) < Number.EPSILON);
      console.log("EPSILON:", Number.EPSILON);
      console.log("MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
      console.log("MIN_SAFE_INTEGER:", Number.MIN_SAFE_INTEGER);
    },

    // ── Math functions ──────────────────────────────────────
    mathfns() {
      console.log("Math.trunc(4.9)  :", Math.trunc(4.9));
      console.log("Math.trunc(-4.9) :", Math.trunc(-4.9));
      console.log("Math.sign(-10)   :", Math.sign(-10));
      console.log("Math.sign(0)     :", Math.sign(0));
      console.log("Math.sign(10)    :", Math.sign(10));
      console.log("Math.cbrt(27)    :", Math.cbrt(27));
      console.log("Math.cbrt(-8)    :", Math.cbrt(-8));
      console.log("Math.log2(8)     :", Math.log2(8));
      console.log("Math.log10(1000) :", Math.log10(1000));
    },
  };
}
const fn = demos[name];
  if (!fn) return;
  const out = captureOutput(fn);
  setOutput("out-" + name, out || "(no output)");

// ── Template literal live widget ────────────────────────────
function updateTemplateLiteral() {
  const name = document.getElementById("tl-name")?.value || "";
  const year = parseInt(document.getElementById("tl-year")?.value) || 2000;
  const age = new Date().getFullYear() - year;
  const el = document.getElementById("tl-result");
  if (el) el.textContent = `Hello, ${name}! You are ${age} years old.`;
}
document
  .getElementById("tl-name")
  ?.addEventListener("input", updateTemplateLiteral);
document
  .getElementById("tl-year")
  ?.addEventListener("input", updateTemplateLiteral);
updateTemplateLiteral();

// ── Generator (Fibonacci stepper) ──────────────────────────
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let fibGen = fibonacci();
let fibStep = 0;
let fibHistory = [];

document.getElementById("gen-next-btn")?.addEventListener("click", () => {
  const { value } = fibGen.next();
  fibStep++;
  fibHistory.push(value);
  document.getElementById("gen-val").textContent = value;
  document.getElementById("gen-step").textContent = fibStep;
  document.getElementById("out-gen").textContent =
    "History: " + fibHistory.slice(-8).join(" → ");
});

document.getElementById("gen-reset-btn")?.addEventListener("click", () => {
  fibGen = fibonacci();
  fibStep = 0;
  fibHistory = [];
  document.getElementById("gen-val").textContent = "—";
  document.getElementById("gen-step").textContent = "0";
  document.getElementById("out-gen").textContent =
    "Click next() to step through Fibonacci...";
});

// ── Promise demo ─────────────────────────────────────────────
function setPill(active) {
  ["idle", "pending", "resolved", "rejected"].forEach((state) => {
    const el = document.getElementById("pill-" + state);
    if (el)
      el.className = "state-pill" + (state === active ? " " + active : "");
  });
}
setPill("idle");

function runPromise(succeed) {
  const outEl = document.getElementById("out-promise");
  if (!outEl) return;
  setPill("pending");
  outEl.textContent = "⏳ Waiting 1.2s...";

  new Promise((resolve, reject) => {
    setTimeout(() => {
      succeed
        ? resolve("✅ Data loaded successfully!")
        : reject(new Error("❌ Network error — request failed"));
    }, 1200);
  })
    .then((val) => {
      setPill("resolved");
      outEl.textContent = val;
      outEl.className = "output";
    })
    .catch((err) => {
      setPill("rejected");
      outEl.textContent = err.message;
      outEl.className = "output error";
    });
}

document
  .getElementById("promise-resolve-btn")
  ?.addEventListener("click", () => runPromise(true));
document
  .getElementById("promise-reject-btn")
  ?.addEventListener("click", () => runPromise(false));


// ── Map demo ─────────────────────────────────────────────────
const liveMap = new Map([
  ["name", "Alice"],
  ["city", "Tokyo"],
]);
function renderMap() {
  const tbody = document.querySelector("#map-table tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  liveMap.forEach((val, key) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${key}</td><td>${val}</td>`;
    tbody.appendChild(tr);
  });
}
renderMap();

document.getElementById("map-set-btn")?.addEventListener("click", () => {
  const k = document.getElementById("map-key").value.trim();
  const v = document.getElementById("map-val").value.trim();
  if (k) {
    liveMap.set(k, v);
    renderMap();
  }
});

document.getElementById("map-del-btn")?.addEventListener("click", () => {
  const k = document.getElementById("map-key").value.trim();
  liveMap.delete(k);
  renderMap();
});

// ── Set demo ─────────────────────────────────────────────────
const liveSet = new Set(["apple", "banana", "cherry"]);
function renderSet() {
  const el = document.getElementById("set-display");
  if (el)
    el.textContent =
      "{ " + [...liveSet].join(", ") + " }  (size: " + liveSet.size + ")";
}
renderSet();

document.getElementById("set-add-btn")?.addEventListener("click", () => {
  const v = document.getElementById("set-val").value.trim();
  if (v) {
    liveSet.add(v);
    renderSet();
  }
});

document.getElementById("set-del-btn")?.addEventListener("click", () => {
  const v = document.getElementById("set-val").value.trim();
  liveSet.delete(v);
  renderSet();
});

// ── Proxy demo ───────────────────────────────────────────────
const proxyTarget = { name: "Alice", age: 30 };
const proxyLog = [];
const liveProxy = new Proxy(proxyTarget, {
  get(target, prop) {
    const val = Reflect.get(target, prop);
    proxyLog.push({ type: "get", prop, val });
    renderProxyLog();
    return val;
  },
  set(target, prop, value) {
    if (prop === "age") {
      const n = Number(value);
      if (isNaN(n) || n < 0 || n > 120) {
        proxyLog.push({
          type: "err",
          msg: `age must be 0–120, got "${value}"`,
        });
        renderProxyLog();
        return false;
      }
    }
    proxyLog.push({ type: "set", prop, val: value });
    Reflect.set(target, prop, value);
    renderProxyLog();
    return true;
  },
});

function renderProxyLog() {
  const el = document.getElementById("proxy-log");
  if (!el) return;
  el.innerHTML = proxyLog
    .slice(-20)
    .map((entry) => {
      if (entry.type === "get")
        return `<div class="log-line log-get">GET  ${entry.prop} → ${JSON.stringify(entry.val)}</div>`;
      if (entry.type === "set")
        return `<div class="log-line log-set">SET  ${entry.prop} = ${JSON.stringify(entry.val)}</div>`;
      return `<div class="log-line log-err">ERR  ${entry.msg}</div>`;
    })
    .join("");
  el.scrollTop = el.scrollHeight;
}

document.getElementById("proxy-set-btn")?.addEventListener("click", () => {
  const k = document.getElementById("proxy-key").value.trim();
  const v = document.getElementById("proxy-val").value.trim();
  if (k) liveProxy[k] = v;
});

document.getElementById("proxy-get-btn")?.addEventListener("click", () => {
  const k = document.getElementById("proxy-key").value.trim();
  if (k) liveProxy[k]; // triggers get trap
});

// ── String methods live widget ────────────────────────────────
function updateStringDemo() {
  const main = document.getElementById("str-main")?.value || "";
  const search = document.getElementById("str-search")?.value || "";
  const el = document.getElementById("str-result");
  if (!el) return;
  el.textContent =
    `includes("${search}")   : ${main.includes(search)}\n` +
    `startsWith("${search}") : ${main.startsWith(search)}\n` +
    `endsWith("${search}")   : ${main.endsWith(search)}`;
}
document
  .getElementById("str-main")
  ?.addEventListener("input", updateStringDemo);
document
  .getElementById("str-search")
  ?.addEventListener("input", updateStringDemo);
updateStringDemo();

// ── Number live widget ───────────────────────────────────────
function updateNumberDemo() {
  const raw = document.getElementById("num-input")?.value ?? "";
  const el = document.getElementById("num-result");
  if (!el) return;
  const v =
    raw === "NaN"
      ? NaN
      : raw === "Infinity"
        ? Infinity
        : raw === "-Infinity"
          ? -Infinity
          : Number(raw);
  el.textContent =
    `isInteger(${raw})    : ${Number.isInteger(v)}\n` +
    `isSafeInteger(${raw}): ${Number.isSafeInteger(v)}\n` +
    `isFinite(${raw})     : ${Number.isFinite(v)}\n` +
    `isNaN(${raw})        : ${Number.isNaN(v)}`;
}
document
  .getElementById("num-input")
  ?.addEventListener("input", updateNumberDemo);
updateNumberDemo();

// ── Math live widget ─────────────────────────────────────────
function updateMathDemo() {
  const raw = parseFloat(document.getElementById("math-input")?.value);
  const el = document.getElementById("math-result");
  if (!el || isNaN(raw)) {
    if (el) el.textContent = "Enter a number";
    return;
  }
  el.textContent =
    `Math.trunc(${raw})  = ${Math.trunc(raw)}\n` +
    `Math.sign(${raw})   = ${Math.sign(raw)}\n` +
    `Math.cbrt(${raw})   = ${Math.cbrt(raw).toFixed(4)}\n` +
    `Math.log2(${raw})   = ${raw > 0 ? Math.log2(raw).toFixed(4) : "NaN (must be > 0)"}\n` +
    `Math.log10(${raw})  = ${raw > 0 ? Math.log10(raw).toFixed(4) : "NaN (must be > 0)"}`;
}
document
  .getElementById("math-input")
  ?.addEventListener("input", updateMathDemo);
updateMathDemo();

// ── find() widget wiring ─────────────────────────────────────
document.getElementById("find-id")?.addEventListener("input", () => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Diana" },
    { id: 5, name: "Eve" },
  ];
  const target = parseInt(document.getElementById("find-id").value);
  const found = users.find((u) => u.id === target);
  const idx = users.findIndex((u) => u.id === target);
  const el = document.getElementById("find-result");
  if (el)
    el.textContent = found
      ? `found: ${JSON.stringify(found)}   index: ${idx}`
      : `No user with id=${target}`;
});
// Trigger once on load
document.getElementById("find-id")?.dispatchEvent(new Event("input"));
