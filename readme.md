JavaScript 2015 (ES6) / ECMAScript 2015

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

---