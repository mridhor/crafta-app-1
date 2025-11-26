"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Settings, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "@/components/search/GlobalSearch";

const navItems = [
    { label: "Rhythm", href: "/rhythm", icon: "LayoutGrid" },
    { label: "Calendar", href: "/calendar", icon: "Calendar" },
    { label: "Pipeline", href: "/pipeline", icon: "BarChart3" },
    { label: "Entities", href: "/entities", icon: "Users" },
    { label: "Convert", href: "/convert", icon: "Inbox" },
    { label: "Canvas", href: "/canvas", icon: "Sparkles" },
];

export function TopBar() {
    const pathname = usePathname();

    return (
        <header className="h-16 border-b border-border bg-background px-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <div className="font-bold text-xl tracking-tight flex items-center gap-2">
                    {/* Logo placeholder */}
                    Crafta
                </div>

                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                pathname?.startsWith(item.href)
                                    ? "bg-muted text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <GlobalSearch />

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Bell className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">
                            WS
                        </div>
                        <span className="text-sm font-medium hidden sm:block">Workspace</span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
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
