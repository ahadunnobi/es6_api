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


## Data Structures & Asynchronous Javascript

| Feature | Description |
| :--- | :--- |
| **Promises** | An object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. |
| **Map Objects** | A collection of keyed data items, similar to an Object, but allows keys of any type and maintains insertion order. |
| **Set Objects** | A collection of unique values (can be primitives or object references). |
| **Symbol** | A completely unique and immutable primitive value, often used as "hidden" identifiers for object properties. |

### Examples

```js
// Promises
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data loaded!"), 1000);
  });

fetchData()
  .then(data => console.log(data))   // "Data loaded!"
  .catch(err => console.error(err));

// Promise chaining
fetch("https://api.example.com/users")
  .then(res => res.json())
  .then(users => console.log(users))
  .catch(err => console.error("Error:", err));

// Map
const map = new Map();
map.set("name", "Alice");
map.set(42, "the answer");
map.set(true, "boolean key");

console.log(map.get(42));    // "the answer"
console.log(map.size);       // 3

for (const [key, value] of map) {
  console.log(`${key} → ${value}`);
}

// Set
const set = new Set([1, 2, 3, 2, 1]);
console.log(set.size);         // 3 (duplicates removed)
console.log([...set]);         // [1, 2, 3]

set.add(4);
set.delete(1);
console.log(set.has(1));       // false

// Symbol
const id = Symbol("id");
const secret = Symbol("secret");

const obj = {
  [id]: 123,
  name: "Alice"
};

console.log(obj[id]);          // 123
console.log(id === secret);    // false — every Symbol is unique
console.log(Object.keys(obj)); // ["name"] — Symbols are not enumerable
```

---

## Advanced Object & Metaprogramming Features

| Feature | Description |
| :--- | :--- |
| **Proxy** | An object that wraps another object to intercept and redefine fundamental operations (like property lookup, assignment, enumeration). |
| **Reflect** | A built-in object that provides methods for interceptable JavaScript operations, mirroring the Proxy handler methods. |

### Examples

```js
// Proxy — validation trap
const validator = {
  set(target, prop, value) {
    if (prop === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    target[prop] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.name = "Alice"; // ✅
person.age = 30;       // ✅
// person.age = "old"; // ❌ TypeError

// Proxy — logging trap
const handler = {
  get(target, prop) {
    console.log(`Getting property: ${prop}`);
    return Reflect.get(target, prop);
  }
};

const logged = new Proxy({ x: 10, y: 20 }, handler);
console.log(logged.x); // "Getting property: x" → 10

// Reflect
const obj = { a: 1, b: 2 };

Reflect.set(obj, "c", 3);
console.log(Reflect.get(obj, "c")); // 3
console.log(Reflect.has(obj, "a")); // true
Reflect.deleteProperty(obj, "b");
console.log(obj);                   // { a: 1, c: 3 }
```

---

## Built-in Object Methods

### Array Methods
| Feature | Description |
| :--- | :--- |
| **`Array.from()`** | Creates a new Array instance from an array-like or iterable object (not just strings). |
| **`Array.prototype.find()`** | Returns the value of the first element in the array that satisfies the provided testing function. |
| **`Array.prototype.findIndex()`** | Returns the index of the first element in the array that satisfies the provided testing function. |
| **`Array.prototype.entries()`** | Returns a new Array Iterator object that contains the key/value pairs for each index in the array. |
| **`Array.prototype.keys()`** | Returns a new Array Iterator object that contains the keys for each index in the array. |

#### Examples

```js
// Array.from()
console.log(Array.from("hello"));          // ['h', 'e', 'l', 'l', 'o']
console.log(Array.from({ length: 3 }, (_, i) => i * 2)); // [0, 2, 4]
console.log(Array.from(new Set([1, 2, 3]))); // [1, 2, 3]

// find() & findIndex()
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const found = users.find(u => u.id === 2);
console.log(found);      // { id: 2, name: "Bob" }

const idx = users.findIndex(u => u.name === "Charlie");
console.log(idx);        // 2

// entries() & keys()
const letters = ["a", "b", "c"];

for (const [index, value] of letters.entries()) {
  console.log(`${index}: ${value}`);
}
// 0: a
// 1: b
// 2: c

console.log([...letters.keys()]); // [0, 1, 2]
```

### String Methods
| Feature | Description |
| :--- | :--- |
| **`String.prototype.includes()`** | Returns `true` if a string contains a specified value. |
| **`String.prototype.startsWith()`**| Returns `true` if a string begins with a specified value. |
| **`String.prototype.endsWith()`** | Returns `true` if a string ends with a specified value. |

#### Examples

```js
const str = "Hello, World!";

// includes()
console.log(str.includes("World"));   // true
console.log(str.includes("world"));   // false (case-sensitive)

// startsWith()
console.log(str.startsWith("Hello")); // true
console.log(str.startsWith("World")); // false
console.log(str.startsWith("World", 7)); // true (search from index 7)

// endsWith()
console.log(str.endsWith("!"));       // true
console.log(str.endsWith("World!"));  // true
console.log(str.endsWith("Hello", 5)); // true (consider only first 5 chars)
```
