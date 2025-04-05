// tests/sessionStorage.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { sessionStorageManager } from "../src";

describe('SessionStorageManager', () => {
    beforeEach(() => {
        sessionStorage.clear(); // Clear sessionStorage before each test
    });

    afterEach(() => {
        sessionStorage.clear(); // Ensure sessionStorage is clear after each test
    });

    it('should add and get a string item', () => {
        sessionStorageManager.add('sessionId', 'session123');
        const sessionId = sessionStorageManager.get('sessionId');
        expect(sessionId).toBe('session123');
    });

    it('should add and get an object item', () => {
        const userRole = 'admin';
        sessionStorageManager.add('userRole', userRole);
        const retrievedRole = sessionStorageManager.get('userRole');
        expect(retrievedRole).toBe(userRole);
    });

    it('should return undefined for a non-existent key', () => {
        const value = sessionStorageManager.get('nonExistentKey');
        expect(value).toBeUndefined();
    });

    it('should delete an existing item', () => {
        sessionStorageManager.add('sessionId', 'toDelete');
        sessionStorageManager.delete('sessionId');
        const value = sessionStorageManager.get('sessionId');
        expect(value).toBeUndefined();
    });

    it('should not throw error when deleting a non-existent key', () => {
        expect(() => sessionStorageManager.delete('nonExistentKey')).not.toThrow();
    });

    it('should clear all keys from sessionStorage', () => {
        sessionStorageManager.add('keyA', 'valueA');
        sessionStorageManager.add('keyB', 'valueB');
        sessionStorageManager.clearAllKeys();
        expect(sessionStorage.getItem('keyA')).toBeNull();
        expect(sessionStorage.getItem('keyB')).toBeNull();
    });

    it('should handle adding and getting different types', () => {
        sessionStorageManager.add('lastActivity', Date.now());
        expect(typeof sessionStorageManager.get('lastActivity')).toBe('number');

        sessionStorageManager.add('isActive', false);
        expect(sessionStorageManager.get('isActive')).toBe(false);

        sessionStorageManager.add('emptyValue', null);
        expect(sessionStorageManager.get('emptyValue')).toBeNull();
    });

    it('should handle stringified values that are not JSON', () => {
        sessionStorage.setItem('simpleString', 'just a string here');
        const value = sessionStorageManager.get('simpleString');
        expect(value).toBe('just a string here');
    });

    it('should chain add and delete operations', () => {
        sessionStorageManager
            .add('temp1', 'data1')
            .add('temp2', 'data2')
            .delete('temp1');

        expect(sessionStorage.getItem('temp1')).toBeNull();
        expect(sessionStorage.getItem('temp2')).toBe('data2');
    });
});