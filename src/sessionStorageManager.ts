class SessionStorageManager {
    private _storages: Storage | undefined;

    constructor() {
        if (typeof window === "undefined" || !("sessionStorage" in window)) return;
        this._storages = sessionStorage;
    }

    add<T extends keyof SessionStorageManagerProps>(
        key: T,
        data: SessionStorageManagerProps[T]
    ): this {
        try {
            if ("sessionStorage" in window && typeof window !== "undefined") {
                const _data = typeof data === "string" ? data : JSON.stringify(data);
                sessionStorage.setItem(key, _data);
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on session storage");
        }
        return this;
    }

    get<T extends keyof SessionStorageManagerProps>(
        key: T
    ): SessionStorageManagerProps[T] | undefined {
        try {
            if (typeof window === "undefined" || !("sessionStorage" in window)) return;

            const storage = sessionStorage.getItem(key) || this._storages?.[key];
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

    delete<T extends keyof SessionStorageManagerProps>(key: T): this {
        try {
            if ("sessionStorage" in window) {
                sessionStorage.removeItem(key);
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on session storage");
        }

        return this;
    }

    clearAllKeys(): void {
        try {
            sessionStorage.clear();
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on session storage");
        }
    }
}

const sessionStorageManager = new SessionStorageManager();
export { sessionStorageManager };