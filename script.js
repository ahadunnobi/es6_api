
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
