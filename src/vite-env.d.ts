/// <reference types="vite/client" />

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
        [key: string]: { title: string, description: string, status: boolean };
    }
}