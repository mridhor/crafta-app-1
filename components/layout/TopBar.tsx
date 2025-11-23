"use client";

import Link from "next/link";
import { Search, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useView } from "@/components/providers/ViewContext";

const navItems = [
    { label: "Rhythm", id: "rhythm", icon: "LayoutGrid" },
    { label: "Calendar", id: "calendar", icon: "Calendar" },
    { label: "Pipeline", id: "pipeline", icon: "BarChart3" },
    { label: "Entities", id: "entities", icon: "Users" },
    { label: "Convert", id: "convert", icon: "Inbox" },
    { label: "Canvas", id: "canvas", icon: "Sparkles" },
];

export function TopBar() {
    const viewContext = useView();
    const activeView = viewContext?.activeView || "rhythm";
    const setActiveView = viewContext?.setActiveView || (() => { });

    return (
        <header className="h-16 border-b border-border bg-background px-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <div className="font-bold text-xl tracking-tight flex items-center gap-2">
                    {/* Logo placeholder */}
                    Crafta
                </div>

                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                activeView === item.id
                                    ? "bg-muted text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-64 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-9 pl-9 pr-4 bg-secondary/50 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Bell className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                            WS
                        </div>
                        <span className="text-sm font-medium hidden sm:block">Workspace</span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("text-muted-foreground", activeView === "settings" && "bg-muted text-foreground")}
                        onClick={() => setActiveView("settings")}
                    >
                        <Settings className="w-5 h-5" />
                    </Button>

                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                        <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </header>
    );
}
