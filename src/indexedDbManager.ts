export interface IDBConfig {
    dbName: string;
    version: number;
    storeName: string;
    indexName?: string; // Optional index name
    keyPath?: string;   // Optional key path
}

/**
 * @description Manages interactions with the browser's IndexedDB with a chainable API.
 * Provides methods to open the database, add, retrieve, delete, clear data, and get all data.
 */
export class IndexedDBManager {
    private _dbPromise: Promise<IDBDatabase> | null = null;
    private _config: IDBConfig;

    /**
     * Initializes the IndexedDBManager with the provided configuration.
     * @param config Configuration object for the IndexedDB.
     */
    constructor(config: IDBConfig) {
        this._config = config;
    }

    /**
     * Adds new data to the database.
     *
     * @template T The key type.
     * @param {IndexedDBManagerProps[T]} value The data to add.
     * @param {T} [key] The key for the data (if keyPath is not defined).
     * @returns {Promise<this>} A Promise that resolves with the instance of IndexedDBManager for chaining.
     * @throws {Error} If an error occurs while opening the database or during the transaction.
     */
    async add<T extends keyof IndexedDBManagerProps>(value: IndexedDBManagerProps[T], key?: T): Promise<this> {
        try {
            const db = await this._openDatabase();
            const transaction = db.transaction(this._config.storeName, 'readwrite');
            const store = transaction.objectStore(this._config.storeName);
            const request = key !== undefined && !this._config.keyPath ? store.add(value, key) : store.add(value);

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(this);
                request.onerror = (event) => reject(new Error(String((event.target as IDBRequest).error) || "Error adding data"));
            });
        } catch (error) {
            this._dbPromise = null; // Reset promise on error
            throw new Error(String(error) || "An error occurred while adding data to IndexedDB.");
        }
    }

    /**
     * Retrieves data from the database based on the provided key.
     *
     * @template T The key type.
     * @param {T} key The key of the data to retrieve.
     * @returns {Promise<IndexedDBManagerProps[T] | undefined>} A Promise that resolves with the found data or undefined if not found.
     * @throws {Error} If an error occurs while opening the database or during the transaction.
     */
    async get<T extends keyof IndexedDBManagerProps>(key: T): Promise<IndexedDBManagerProps[T] | undefined> {
        try {
            const db = await this._openDatabase();
            const transaction = db.transaction(this._config.storeName, 'readonly');
            const store = transaction.objectStore(this._config.storeName);
            const request = store.get(key);

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    resolve((event.target as IDBRequest).result as IndexedDBManagerProps[T] | undefined);
                };
                request.onerror = (event) => reject(new Error(String((event.target as IDBRequest).error) || "Error getting data"));
            });
        } catch (error) {
            this._dbPromise = null; // Reset promise on error
            throw new Error(String(error) || "An error occurred while retrieving data from IndexedDB.");
        }
    }

    /**
     * Deletes data from the database with the specified key.
     *
     * @template T The key type.
     * @param {T} key The key of the data to delete.
     * @returns {Promise<this>} A Promise that resolves with the instance of IndexedDBManager for chaining.
     * @throws {Error} If an error occurs while opening the database or during the transaction.
     */
    async delete<T extends keyof IndexedDBManagerProps>(key: T): Promise<this> {
        try {
            const db = await this._openDatabase();
            const transaction = db.transaction(this._config.storeName, 'readwrite');
            const store = transaction.objectStore(this._config.storeName);
            const request = store.delete(key);

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(this);
                request.onerror = (event) => reject(new Error(String((event.target as IDBRequest).error) || "Error deleting data"));
            });
        } catch (error) {
            this._dbPromise = null; // Reset promise on error
            throw new Error(String(error) || "An error occurred while deleting data from IndexedDB.");
        }
    }

    /**
     * @description Clears all data from the object store.
     * @returns {Promise<this>} A Promise that resolves with the instance of IndexedDBManager for chaining.
     * @throws {Error} If an error occurs while opening the database or during the transaction.
     */
    async clearAll(): Promise<this> {
        try {
            const db = await this._openDatabase();
            const transaction = db.transaction(this._config.storeName, 'readwrite');
            const store = transaction.objectStore(this._config.storeName);
            const request = store.clear();

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(this);
                request.onerror = (event) => reject(new Error(String((event.target as IDBRequest).error) || "Error clearing data"));
            });
        } catch (error) {
            this._dbPromise = null; // Reset promise on error
            throw new Error(String(error) || "An error occurred while clearing IndexedDB.");
        }
    }

    /**
     * Retrieves all data from the object store as an array.
     *
     * @returns {Promise<IndexedDBManagerProps[]>} A Promise that resolves with an array containing all the data.
     * @throws {Error} If an error occurs while opening the database or during the transaction.
     */
    async getAll(): Promise<IndexedDBManagerProps[]> {
        try {
            const db = await this._openDatabase();
            const transaction = db.transaction(this._config.storeName, 'readonly');
            const store = transaction.objectStore(this._config.storeName);
            const request = store.getAll();

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    resolve((event.target as IDBRequest).result as IndexedDBManagerProps[]);
                };
                request.onerror = (event) => reject(new Error(String((event.target as IDBRequest).error) || "Error getting all data"));
            });
        } catch (error) {
            this._dbPromise = null; // Reset promise on error
            throw new Error(String(error) || "An error occurred while retrieving all data from IndexedDB.");
        }
    }

    /**
     * Opens the IndexedDB database based on the current configuration.
     * If the database is already opening or open, it returns the existing Promise.
     * @returns A Promise that resolves with the IDBDatabase instance.
     */
    private _openDatabase(): Promise<IDBDatabase> {
        if (!this._dbPromise) {
            this._dbPromise = new Promise((resolve, reject) => {
                const request = indexedDB.open(this._config.dbName, this._config.version);

                request.onupgradeneeded = (event) => {
                    const db = (event.target as IDBRequest).result as IDBDatabase;
                    if (!db.objectStoreNames.contains(this._config.storeName)) {
                        const objectStore = db.createObjectStore(this._config.storeName, {
                            keyPath: this._config.keyPath || 'id',
                            autoIncrement: !this._config.keyPath
                        });
                        if (this._config.indexName) {
                            objectStore.createIndex(this._config.indexName, this._config.indexName);
                        }
                    }
                };

                request.onsuccess = (event) => {
                    resolve((event.target as IDBRequest).result as IDBDatabase);
                };

                request.onerror = (event) => {
                    reject((event.target as IDBRequest).error);
                };
            });
        }
        return this._dbPromise;
    }
}