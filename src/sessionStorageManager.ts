/**
 * @description Manages interactions with the browser's Session Storage.
 * Provides methods to add, retrieve, delete, and clear data from Session Storage.
 * It gracefully handles environments where Session Storage is not available (e.g., server-side rendering).
 */
class SessionStorageManager {
    private _storages: Storage | undefined;

    constructor() {
        if (typeof window === "undefined" || !("sessionStorage" in window)) return;
        this._storages = sessionStorage;
    }

    /**
     * @description Adds or updates data in Session Storage for the given key.
     * Converts non-string data to JSON before storing.
     * @template T The key type.
     * @param {T} key The key under which to store the data.
     * @param {SessionStorageManagerProps[T]} data The data to be stored.
     * @returns {this} The instance of SessionStorageManager for chaining.
     * @throws {Error} If Session Storage is not available or if an error occurs during the operation.
     */
    add<T extends keyof SessionStorageManagerProps>(
        key: T,
        data: SessionStorageManagerProps[T]
    ): this {
        try {
            if (this._storages) {
                const _data = typeof data === "string" ? data : JSON.stringify(data);
                this._storages.setItem(key, _data);
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on session storage");
        }
        return this;
    }

    /**
     * @description Retrieves data from Session Storage based on the provided key.
     * Attempts to parse the stored value as JSON, otherwise returns it as a string.
     * @template T The key type.
     * @param {T} key The key of the data to retrieve.
     * @returns {SessionStorageManagerProps[T] | undefined} The retrieved data, or undefined if the key does not exist or Session Storage is not available.
     * @throws {Error} If an error occurs during the operation.
     */
    get<T extends keyof SessionStorageManagerProps>(
        key: T
    ): SessionStorageManagerProps[T] | undefined {
        try {
            if (!this._storages) return;

            const storage = this._storages.getItem(key);
            if (!storage) return;

            try {
                return JSON.parse(storage) as SessionStorageManagerProps[T];
            } catch {
                return storage as unknown as SessionStorageManagerProps[T];
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on session storage");
        }
    }

    /**
     * @description Deletes data from Session Storage associated with the given key.
     * @template T The key type.
     * @param {T} key The key of the data to delete.
     * @returns {this} The instance of SessionStorageManager for chaining.
     * @throws {Error} If Session Storage is not available or if an error occurs during the operation.
     */
    delete<T extends keyof SessionStorageManagerProps>(key: T): this {
        try {
            if (this._storages) {
                this._storages.removeItem(key);
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on session storage");
        }

        return this;
    }

    /**
     * @description Clears all key-value pairs from Session Storage.
     * @throws {Error} If Session Storage is not available or if an error occurs during the operation.
     */
    clearAllKeys(): void {
        try {
            if (this._storages) {
                this._storages.clear();
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on session storage");
        }
    }
}

const sessionStorageManager = new SessionStorageManager();
export { sessionStorageManager };