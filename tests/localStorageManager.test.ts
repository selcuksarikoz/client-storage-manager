// tests/localStorage.test.ts
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { localStorageManager } from "../src";

describe('LocalStorageManager', () => {
    beforeEach(() => {
        localStorage?.clear(); // Clear localStorage before each test
    });

    afterEach(() => {
        localStorage?.clear(); // Ensure localStorage is clear after each test
    });

    it('should add and get a string item', () => {
        localStorageManager.add('username', 'Test User');
        const username = localStorageManager.get('username');
        expect(username).toBe('Test User');
    });

    it('should add and get an object item', () => {
        const theme = { primary: 'red', secondary: 'yellow' };
        localStorageManager.add('theme', theme);
        const retrievedTheme = localStorageManager.get('theme');
        expect(retrievedTheme).toEqual(theme);
    });

    it('should return undefined for a non-existent key', () => {
        const value = localStorageManager.get('nonExistentKey');
        expect(value).toBeUndefined();
    });

    it('should delete an existing item', () => {
        localStorageManager.add('username', 'ToDelete');
        localStorageManager.delete('username');
        const value = localStorageManager.get('username');
        expect(value).toBeUndefined();
    });

    it('should not throw error when deleting a non-existent key', () => {
        expect(() => localStorageManager.delete('nonExistentKey')).not.toThrow();
    });

    it('should clear all keys from localStorage', () => {
        localStorageManager.add('key1', 'value1');
        localStorageManager.add('key2', 'value2');
        localStorageManager.clearAllKeys();
        expect(localStorage.getItem('key1')).toBeNull();
        expect(localStorage.getItem('key2')).toBeNull();
    });

    it('should handle adding and getting different types', () => {
        localStorageManager.add('count', 123);
        expect(localStorageManager.get('count')).toBe(123);

        localStorageManager.add('isLoggedIn', true);
        expect(localStorageManager.get('isLoggedIn')).toBe(true);

        localStorageManager.add('nullableValue', null);
        expect(localStorageManager.get('nullableValue')).toBeNull();
    });

    it('should handle stringified values that are not JSON', () => {
        localStorage.setItem('rawString', 'this is a raw string');
        const value = localStorageManager.get('rawString');
        expect(value).toBe('this is a raw string');
    });

    it('should chain add and delete operations', () => {
        localStorageManager
            .add('item1', 'value1')
            .add('item2', 'value2')
            .delete('item1');

        expect(localStorage.getItem('item1')).toBeNull();
        expect(localStorage.getItem('item2')).toBe('value2');
    });
});