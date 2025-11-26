"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: string;
    title: string;
    description?: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (props: Omit<Toast, "id">) => void;
    dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        console.error("useToast called outside of ToastProvider");
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    console.log("ToastProvider rendering");
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback(({ title, description, type }: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, title, description, type }]);

        // Auto dismiss
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast, dismiss }}>
            {children}
            <div className="fixed bottom-0 right-0 z-[100] p-4 space-y-4 max-h-screen w-full md:max-w-[420px] pointer-events-none flex flex-col items-end">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={cn(
                            "pointer-events-auto w-full bg-background border rounded-lg shadow-lg p-4 flex gap-3 animate-in slide-in-from-right-full duration-300",
                            t.type === "success" && "border-green-200 bg-green-50 dark:bg-green-900/10",
                            t.type === "error" && "border-red-200 bg-red-50 dark:bg-red-900/10",
                            t.type === "warning" && "border-orange-200 bg-orange-50 dark:bg-orange-900/10",
                            t.type === "info" && "border-blue-200 bg-blue-50 dark:bg-blue-900/10"
                        )}
                    >
                        <div className={cn(
                            "mt-0.5",
                            t.type === "success" && "text-green-600",
                            t.type === "error" && "text-red-600",
                            t.type === "warning" && "text-orange-600",
                            t.type === "info" && "text-blue-600"
                        )}>
                            {t.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                            {t.type === "error" && <AlertCircle className="w-5 h-5" />}
                            {t.type === "warning" && <AlertTriangle className="w-5 h-5" />}
                            {t.type === "info" && <Info className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-sm">{t.title}</h3>
                            {t.description && <p className="text-sm text-muted-foreground mt-1">{t.description}</p>}
                        </div>
                        <button
                            onClick={() => dismiss(t.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
