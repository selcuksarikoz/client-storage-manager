# LocalStorage and SessionStorage Managers with Chainable API

[![NPM Version](https://img.shields.io/npm/v/@kozmonot/client-storage-manager)](https://www.npmjs.com/package/@kozmonot/client-storage-manager)
[![License](https://img.shields.io/npm/l/@kozmonot/client-storage-manager)](https://github.com/selcuksarikoz/client-storage-manager/blob/main/LICENSE)

A simple and type-safe utility for managing `localStorage` and `sessionStorage` in web applications. This library provides a chainable API for adding, getting, deleting, and clearing data.


## DEMO
https://client-storage-manager.vercel.app/

## Installation

npm:
```bash
npm i @kozmonot/client-storage-manager
```

yarn:
```bash
yarn add @kozmonot/client-storage-manager
```

## Usage

Import the `localStorageManager` and `sessionStorageManager` instances into your JavaScript or TypeScript files:

```typescript
import { localStorageManager, sessionStorageManager } from '@kozmonot/client-storage-manager';

```

### Types

add SessionStorageManagerProps and LocalStorageManagerProps in vite-env.d.ts or your current @types files so that you are able to use keys with auto-complete

```typescript
export declare global {
    interface SessionStorageManagerProps {
        sessionId: string;
        isLoggedIn: boolean;
    }

    interface LocalStorageManagerProps {
        username: string;
        theme: { primary: string; secondary: string };
    }
}
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
// localStorageManager.ts
interface LocalStorageManagerProps {
  username?: string;
  theme?: { primary: string; secondary: string };
  // Add other keys and their types here
}

// sessionStorageManager.ts
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

Contributions are welcome! Please feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/selcuksarikoz/client-storage-manager).

## License

[MIT](https://github.com/selcuksarikoz/client-storage-manager/blob/main/LICENSE)

---