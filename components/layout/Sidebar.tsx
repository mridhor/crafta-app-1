import Link from "next/link";
import {
    LayoutDashboard,
    Calendar,
    BarChart3,
    Users,
    ArrowRightLeft,
    Sparkles,
    Search,
    Bell,
    Settings,
    HelpCircle,
    LogOut,
    User,
    Keyboard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const navItems = [
    { icon: LayoutDashboard, label: "Rhythm", href: "/", id: "rhythm" },
    { icon: Calendar, label: "Calendar", href: "/calendar", id: "calendar" },
    { icon: BarChart3, label: "Pipeline", href: "/pipeline", id: "pipeline" },
    { icon: Users, label: "Entities", href: "/entities", id: "entities" },
    { icon: ArrowRightLeft, label: "Convert", href: "/convert", id: "convert" },
    { icon: Sparkles, label: "Canvas", href: "/canvas", id: "canvas" },
];

export function Sidebar() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [activeWorkspace, setActiveWorkspace] = useState("Relatel wise");

    return (
        <aside className="w-64 bg-background border-r border-border h-screen flex flex-col sticky top-0 z-50">
            {/* Workspace Menu */}
            <div className="p-4 border-b border-border">
                <Button
                    variant="ghost"
                    className="w-full justify-between px-2 hover:bg-muted"
                    onClick={() => setActiveWorkspace(activeWorkspace === "Relatel wise" ? "Demo Workspace" : "Relatel wise")}
                >
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shrink-0">
                            {activeWorkspace.charAt(0)}
                        </div>
                        <div className="text-left min-w-0">
                            <h1 className="font-bold text-sm truncate">{activeWorkspace}</h1>
                            <p className="text-xs text-muted-foreground truncate">microdose.studio</p>
                        </div>
                    </div>
                </Button>
            </div>

            {/* Global Search */}
            <div className="px-4 py-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={cn(
                            "w-full h-9 pl-9 pr-4 bg-muted/50 border border-transparent rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all",
                            isSearchFocused && "bg-background border-border shadow-sm"
                        )}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    {isSearchFocused && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-lg p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                            <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5">Recents</div>
                            <div className="space-y-1">
                                <div className="px-2 py-1.5 hover:bg-muted rounded text-sm cursor-pointer flex items-center gap-2">
                                    <Users className="w-3 h-3" /> Acme Corp
                                </div>
                                <div className="px-2 py-1.5 hover:bg-muted rounded text-sm cursor-pointer flex items-center gap-2">
                                    <BarChart3 className="w-3 h-3" /> Q4 Expansion
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                "text-muted-foreground hover:text-foreground hover:bg-muted"
                                // Active state would be handled by checking pathname in a real app or passed prop
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border space-y-1">
                <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4" />
                        Notifications
                    </div>
                    <span className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full">3</span>
                </div>

                <div className="pt-2 mt-2 border-t border-border/50">
                    <Button variant="ghost" className="w-full justify-start px-3 py-2 h-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted overflow-hidden shrink-0">
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500" />
                            </div>
                            <div className="text-left min-w-0 flex-1">
                                <p className="text-sm font-medium text-foreground truncate">Kamil Bachanek</p>
                                <p className="text-xs text-muted-foreground truncate">Settings</p>
                            </div>
                        </div>
                    </Button>
                </div>
            </div>
        </aside>
    );
}
