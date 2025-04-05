/**
 * @description Manages interactions with the browser's Local Storage.
 * Provides methods to add, retrieve, delete, and clear data from Local Storage.
 * It gracefully handles environments where Local Storage is not available (e.g., server-side rendering).
 */
class LocalStorageManager {
    private _storages: Storage | undefined;

    constructor() {
        if (typeof window === "undefined" || !("localStorage" in window)) return;
        this._storages = localStorage;
    }

    /**
     * @description Adds or updates data in Local Storage for the given key.
     * Converts non-string data to JSON before storing.
     * @template T The key type.
     * @param {T} key The key under which to store the data.
     * @param {LocalStorageManagerProps[T]} data The data to be stored.
     * @returns {this} The instance of LocalStorageManager for chaining.
     * @throws {Error} If Local Storage is not available or if an error occurs during the operation.
     */
    add<T extends keyof LocalStorageManagerProps>(key: T, data: LocalStorageManagerProps[T]): this {
        try {
            if (this._storages) {
                const _data = typeof data === "string" ? data : JSON.stringify(data);
                this._storages.setItem(key, _data);
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on local storage");
        }
        return this;
    }

    /**
     * @description Retrieves data from Local Storage based on the provided key.
     * Attempts to parse the stored value as JSON, otherwise returns it as a string.
     * @template T The key type.
     * @param {T} key The key of the data to retrieve.
     * @returns {LocalStorageManagerProps[T] | undefined} The retrieved data, or undefined if the key does not exist or Local Storage is not available.
     * @throws {Error} If an error occurs during the operation.
     */
    get<T extends keyof LocalStorageManagerProps>(key: T): LocalStorageManagerProps[T] | undefined {
        try {
            if (!this._storages) return;

            const storage = this._storages.getItem(key);
            if (!storage) return;

            try {
                return JSON.parse(storage) as LocalStorageManagerProps[T];
            } catch {
                return storage as unknown as LocalStorageManagerProps[T];
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on local storage");
        }
    }

    /**
     * @description Deletes data from Local Storage associated with the given key.
     * @template T The key type.
     * @param {T} key The key of the data to delete.
     * @returns {this} The instance of LocalStorageManager for chaining.
     * @throws {Error} If Local Storage is not available or if an error occurs during the operation.
     */
    delete<T extends keyof LocalStorageManagerProps>(key: T): this {
        try {
            if (this._storages) {
                this._storages.removeItem(key);
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on local storage");
        }

        return this;
    }

    /**
     * @description Clears all key-value pairs from Local Storage.
     * @throws {Error} If Local Storage is not available or if an error occurs during the operation.
     */
    clearAllKeys(): void {
        try {
            if (this._storages) {
                this._storages.clear();
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on local storage");
        }
    }
}

const localStorageManager = new LocalStorageManager();
export { localStorageManager };