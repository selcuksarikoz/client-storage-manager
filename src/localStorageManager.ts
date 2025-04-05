class LocalStorageManager {
    private _storages;

    constructor() {
        if (typeof window === "undefined" || !("localStorage" in window)) return;
        this._storages = localStorage;
    }

    add<T extends keyof LocalStorageManagerProps>(key: T, data: LocalStorageManagerProps[T]): this {
        try {
            if ("localStorage" in window && typeof window !== "undefined") {
                const _data = typeof data === "string" ? data : JSON.stringify(data);
                localStorage.setItem(key, _data);
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on local storage");
        }
        return this;
    }

    get<T extends keyof LocalStorageManagerProps>(key: T): LocalStorageManagerProps[T] | undefined {
        try {
            if (typeof window === "undefined" || !("localStorage" in window)) return;

            const storage = localStorage.getItem(key) || this._storages?.[key];
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

    delete<T extends keyof LocalStorageManagerProps>(key: T): this {
        try {
            if ("localStorage" in window) {
                localStorage.removeItem(key);
            }
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on local storage");
        }

        return this;
    }

    clearAllKeys(): void {
        try {
            localStorage.clear();
        } catch (error) {
            throw new Error(String(error) || "Something went wrong on local storage");
        }
    }
}

const localStorageManager = new LocalStorageManager();
export { localStorageManager };
