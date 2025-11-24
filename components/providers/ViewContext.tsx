"use client";

import { createContext, useContext } from "react";

interface ViewContextType {
    activeView: string;
    setActiveView: (view: string) => void;
    viewParams: any;
    setViewParams: (params: any) => void;
}

export const ViewContext = createContext<ViewContextType | null>(null);

export function useView() {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error("useView must be used within a ViewProvider");
    }
    return context;
}
