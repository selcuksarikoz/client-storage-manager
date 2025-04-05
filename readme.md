# LocalStorage, SessionStorage, and IndexedDB Managers with Chainable API

[![NPM Version](https://img.shields.io/npm/v/@kozmonot/client-storage-manager)](https://www.npmjs.com/package/@kozmonot/client-storage-manager)
[![License](https://img.shields.io/npm/l/@kozmonot/client-storage-manager)](https://github.com/selcuksarikoz/client-storage-manager/blob/main/LICENSE)

A simple and type-safe utility for managing `localStorage`, `sessionStorage`, and `IndexedDB` in web applications. This
library provides a chainable API for `localStorage` and `sessionStorage`, and a Promise-based API for `IndexedDB`
operations.

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

Import the `localStorageManager`, `sessionStorageManager`, and `IndexedDBManager` instances (or class) into your
JavaScript or TypeScript files:

```typescript
import { localStorageManager, sessionStorageManager } from '@kozmonot/client-storage-manager';
import { IndexedDBManager, IDBConfig } from '@kozmonot/client-storage-manager/src/indexeddb'; // Adjust path as needed
```

### Types

Add `SessionStorageManagerProps`, `LocalStorageManagerProps`, and `IndexedDBManagerProps` in your `vite-env.d.ts` or
your current `@types` files so that you are able to use keys with auto-complete:

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

    interface IndexedDBManagerProps {
        todo: { title: string, description: string, status: boolean };
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

### IndexedDB Examples

First, you need to create an instance of `IndexedDBManager` with your database configuration:

```typescript
import { IndexedDBManager, IDBConfig } from '@kozmonot/client-storage-manager/src/indexeddb';

const dbConfig: IDBConfig = {
    dbName: 'myAppDataBase',
    version: 1,
    storeName: 'tasks',
    keyPath: 'id'
};

const indexedDBManager = new IndexedDBManager(dbConfig);
```

Then you can use the manager to interact with IndexedDB. While IndexedDB operations are asynchronous, the
`IndexedDBManager` provides a Promise-based API that can be used with `async/await` for sequential operations:

```typescript
async function indexedDBOperations() {
    try {
        // Adding data
        const item1 = {title: 'Buy groceries', description: 'Milk, eggs, bread', status: false};
        const item2 = {id: 2, title: 'Walk the dog', description: 'Around the park', status: true}; // Explicit ID
        const addResult1 = await indexedDBManager.add(item1);
        const addResult2 = await indexedDBManager.add(item2);
        console.log('Item 1 added with key:', addResult1);
        console.log('Item 2 added with key:', addResult2);

        // Getting data
        const retrievedItem = await indexedDBManager.get(2);
        console.log('Retrieved item with ID 2:', retrievedItem);

        // Getting all data
        const allItems = await indexedDBManager.getAll();
        console.log('All items:', allItems);

        // Deleting data
        await indexedDBManager.delete(1);
        console.log('Item with key 1 deleted.');

        // Clearing all data
        await indexedDBManager.clearAll();
        console.log('IndexedDB cleared.');

    } catch (error) {
        console.error('IndexedDB operation failed:', error);
    }
}

indexedDBOperations();
```

You can also chain IndexedDB operations using Promises:

```typescript
async function chainedIndexedDBOperations() {
    try {
        await indexedDBManager
            .add({title: 'Write report', description: 'Monthly sales report', status: false})
            .then(key => {
                console.log('Report added with key:', key);
                return indexedDBManager.add({
                    title: 'Schedule meeting',
                    description: 'Team sync-up',
                    status: true,
                    id: 3
                });
            })
            .then(key => console.log('Meeting scheduled with key:', key))
            .then(() => indexedDBManager.getAll())
            .then(items => console.log('Current tasks:', items))
            .catch(error => console.error('IndexedDB chain failed:', error));
    } catch (error) {
        console.error('Error in chained operation:', error);
    }
}

chainedIndexedDBOperations();
```

**Note:** IndexedDB operations are asynchronous, so you need to use `async/await` or Promise chaining (`.then()`,
`.catch()`) when interacting with the `IndexedDBManager`. Make sure to define the `IndexedDBManagerProps` interface to
match the structure of the data you intend to store in your IndexedDB object store. The `add`, `delete`, and `clearAll`
methods of `IndexedDBManager` now return `Promise<this>`, allowing for a more fluent Promise-based chaining.

## Type Safety

This library is written in TypeScript and provides type safety for the data you store in `localStorage`,
`sessionStorage`, and `IndexedDB`. You can define interfaces (`LocalStorageManagerProps`, `SessionStorageManagerProps`,
and `IndexedDBManagerProps`) to specify the keys and their expected types.

By defining these interfaces, you get compile-time type checking when using the `add` and `get` methods of the
respective managers.

## Chainable API

The `add` and `delete` methods of `LocalStorageManager` and `SessionStorageManager` return the instance of the class,
allowing you to chain multiple operations together for a more concise syntax. The `IndexedDBManager` provides a
Promise-based API where `add`, `delete`, and `clearAll` return `Promise<this>`, enabling fluent chaining of asynchronous
operations.

## Browser Compatibility

This library relies on the standard `localStorage`, `sessionStorage`, and `IndexedDB` APIs, which are supported by all
modern web browsers. It includes checks to prevent errors in environments where these APIs might not be available (e.g.,
server-side rendering without a proper window object).

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/selcuksarikoz/client-storage-manager).

## License

[MIT](https://github.com/selcuksarikoz/client-storage-manager/blob/main/LICENSE)

---

```