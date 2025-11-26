"use client";

import { ToastProvider } from "./ToastContext";
import { QueryProvider } from "./QueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </QueryProvider>
    );
}
