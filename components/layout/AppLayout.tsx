"use client";

import { TopBar } from "./TopBar";
import { RightPanel } from "./RightPanel";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
    children: React.ReactNode;
    leftSidebar?: React.ReactNode;
}

export function AppLayout({ children, leftSidebar }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopBar />
            <div className="flex flex-1">
                {/* Left Sidebar Slot */}
                {leftSidebar && (
                    <aside className="w-64 border-r border-border bg-background h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto hidden lg:block">
                        {leftSidebar}
                    </aside>
                )}

                {/* Main Content */}
                <main className={cn(
                    "flex-1 min-w-0 overflow-y-auto h-[calc(100vh-4rem)]",
                    !leftSidebar && "pl-0" // Adjust if no sidebar
                )}>
                    {children}
                </main>

                {/* Right Panel (AI Context) */}
                <RightPanel />
            </div>
        </div>
    );
}
