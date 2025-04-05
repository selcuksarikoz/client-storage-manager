```markdown
# LocalStorage and SessionStorage Managers with Chainable API

[![NPM Version](https://img.shields.io/npm/v/your-package-name)](https://www.npmjs.com/package/your-package-name)
[![License](https://img.shields.io/npm/l/your-package-name)](https://github.com/your-username/your-repo-name/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-username/your-repo-name/main.yml?branch=main)](https://github.com/your-username/your-repo-name/actions/workflows/main.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/your-username/your-repo-name)](https://codecov.io/gh/your-username/your-repo-name)

A simple and type-safe utility for managing `localStorage` and `sessionStorage` in web applications. This library provides a chainable API for adding, getting, deleting, and clearing data.

## Installation

You can install this package using npm:

```bash
npm install your-package-name
```

Or yarn:

```bash
yarn add your-package-name
```

*(Replace `your-package-name` with the actual name of your npm package once you publish it.)*

## Usage

Import the `localStorageManager` and `sessionStorageManager` instances into your JavaScript or TypeScript files:

```typescript
import { localStorageManager, sessionStorageManager } from 'your-package-name';

// Or if you are using direct file import:
// import { localStorageManager } from './path/to/localStorage';
// import { sessionStorageManager } from './path/to/sessionStorage';
```

### LocalStorage Examples

```typescript
// Adding data (chainable)
localStorageManager
  .add('username', 'JohnDoe')
  .add('theme', { primary: 'blue', secondary: 'gray' });

// Getting data
const username = localStorageManager.get('username');
const theme = localStorageManager.get('theme');
console.log('Username:', username); // Output: Username: JohnDoe
console.log('Theme:', theme);   // Output: Theme: { primary: 'blue', secondary: 'gray' }

// Deleting data (chainable)
localStorageManager.delete('username');
console.log('Username after delete:', localStorageManager.get('username')); // Output: Username after delete: undefined

// Clearing all data
localStorageManager.clearAllKeys();
console.log('LocalStorage cleared.');
```

### SessionStorage Examples

```typescript
// Adding data (chainable)
sessionStorageManager
  .add('sessionId', 'abcdef123')
  .add('isLoggedIn', true);

// Getting data
const sessionId = sessionStorageManager.get('sessionId');
const isLoggedIn = sessionStorageManager.get('isLoggedIn');
console.log('Session ID:', sessionId);   // Output: Session ID: abcdef123
console.log('Is Logged In:', isLoggedIn); // Output: Is Logged In: true

// Deleting data (chainable)
sessionStorageManager.delete('sessionId');
console.log('Session ID after delete:', sessionStorageManager.get('sessionId')); // Output: Session ID after delete: undefined

// Clearing all data
sessionStorageManager.clearAllKeys();
console.log('SessionStorage cleared.');
```

## Type Safety

This library is written in TypeScript and provides type safety for the data you store in `localStorage` and `sessionStorage`. You can define interfaces (`LocalStorageManagerProps` and `SessionStorageManagerProps`) to specify the keys and their expected types:

```typescript
// localStorage.ts
interface LocalStorageManagerProps {
  username?: string;
  theme?: { primary: string; secondary: string };
  // Add other keys and their types here
}

// sessionStorage.ts
interface SessionStorageManagerProps {
  sessionId?: string;
  isLoggedIn?: boolean;
  lastVisitedPage?: string;
  // Add other keys and their types here
}
```

By defining these interfaces, you get compile-time type checking when using the `add` and `get` methods.

## Chainable API

The `add` and `delete` methods return the instance of the `LocalStorageManager` or `SessionStorageManager` class, allowing you to chain multiple operations together for a more concise syntax:

```typescript
localStorageManager
  .add('userToken', 'your-auth-token')
  .add('expirationTime', Date.now() + 3600000)
  .delete('tempData');
```

## Browser Compatibility

This library relies on the standard `localStorage` and `sessionStorage` APIs, which are supported by all modern web browsers. It includes checks to prevent errors in environments where these APIs might not be available (e.g., server-side rendering without a proper window object).

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/your-username/your-repo-name).

## License

[MIT](https://github.com/your-username/your-repo-name/blob/main/LICENSE)

---

*(Remember to replace `your-package-name`, `your-username`, and `your-repo-name` with your actual package and repository information.)*
```

**Explanation of the README Features:**

* **Clear Title and Description:** Briefly explains what the library does.
* **Badges:** Includes common badges for npm version, license, build status, and code coverage (replace the placeholder URLs with your actual ones).
* **Installation Instructions:** Provides clear instructions on how to install the package using npm or yarn.
* **Usage Examples:** Shows basic usage for both `localStorageManager` and `sessionStorageManager`, demonstrating the `add`, `get`, `delete`, and `clearAllKeys` methods.
* **Type Safety Section:** Highlights the TypeScript support and explains how to define the `LocalStorageManagerProps` and `SessionStorageManagerProps` interfaces for type safety.
* **Chainable API Section:** Explicitly explains and demonstrates the chainable nature of the `add` and `delete` methods.
* **Browser Compatibility:** Briefly mentions browser support.
* **Contributing Guidelines:** Encourages contributions and provides a link to the GitHub repository.
* **License Information:** Specifies the license under which the library is distributed.

**To Use This README:**

1.  **Replace Placeholders:** Update all instances of `your-package-name`, `your-username`, and `your-repo-name` with your actual information.
2.  **Add Badges:** Make sure the badge URLs are correct for your repository and setup (e.g., link your actual GitHub Actions workflow and Codecov report).
3.  **Save as `README.md`:** Save this content as a file named `README.md` in the root directory of your project.

When you publish your package to npm and host your repository on GitHub, this `README.md` file will be displayed on both platforms, providing essential information to potential users.