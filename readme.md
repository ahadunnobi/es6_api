Readme · MD
Copy

# JavaScript 2015 (ES6) / ECMAScript 2015

ECMAScript 2015, also known as ES6, was the second major revision to JavaScript. It introduced a massive set of new features and syntax improvements that modernize the language and make complex applications easier to write and maintain.

Below is a comprehensive cheat sheet of the features introduced in ES6.

---

## Core Syntax & Features

| Feature | Description |
| :--- | :--- |
| **`let` keyword** | Declares a variable with block scope. |
| **`const` keyword** | Declares a block-scoped variable that cannot be reassigned (note: objects/arrays assigned to `const` can still be mutated). |
| **Arrow Functions** | `() => {}` Allows a shorter syntax for writing function expressions and lexically binds the `this` value. |
| **Template Literals** | `` `Hello ${name}` `` Allows string interpolation and multi-line strings using backticks. |
| **Object Destructuring** | `{a, b} = obj` Extracts object properties and assigns them to distinct variables. |
| **Array Destructuring** | `[a, b] = arr` Extracts array values and assigns them to distinct variables. |
| **Spread Operator** | `...` Expands an array or iterable into individual elements (e.g., `[...arr]`). |
| **Rest Parameters** | `...args` Allows functions to treat an indefinite number of arguments as an array. |
| **Default Parameters** | Allows specifying default values for function parameters (e.g., `function(a = 10)`). |
| **`for...of` Loop** | Loops through the values of iterable objects (like Arrays, Maps, Sets, Strings). |
| **Classes** | Syntactical sugar over JavaScript's existing prototype-based inheritance, providing a template for creating objects. |
| **Modules** | `import` / `export` syntax that allows breaking code up into separate files and reusable components. |
| **Generators** | `function*` functions that can be paused and exited and later re-entered, yielding multiple values over time. |

### Examples

```js
// let & const
let score = 10;
score = 20; // ✅ allowed
const MAX = 100;
// MAX = 200; // ❌ TypeError

// Arrow Functions
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// Template Literals
const name = "Alice";
console.log(`Hello, ${name}! You are ${2025 - 2000} years old.`);

// Object & Array Destructuring
const user = { id: 1, username: "alice", role: "admin" };
const { username, role } = user;

const colors = ["red", "green", "blue"];
const [primary, , tertiary] = colors;

// Spread & Rest
const nums = [1, 2, 3];
const moreNums = [...nums, 4, 5]; // [1, 2, 3, 4, 5]

function sum(...args) {
  return args.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Default Parameters
function greet(name = "stranger") {
  return `Hello, ${name}!`;
}
console.log(greet());         // "Hello, stranger!"
console.log(greet("Bob"));    // "Hello, Bob!"

// for...of Loop
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

// Classes
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
    return `${this.name} barks.`;
  }
}

const dog = new Dog("Rex");
console.log(dog.speak()); // "Rex barks."

// Modules (math.js)
// export const PI = 3.14159;
// export function square(x) { return x * x; }

// import { PI, square } from './math.js';

// Generators
function* counter(start = 0) {
  while (true) yield start++;
}
const gen = counter(1);
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

---