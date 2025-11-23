import Link from "next/link";
import { LayoutDashboard, Calendar, CheckSquare, Settings, Bell, Inbox, FileText, PieChart, Users, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: CheckSquare, label: "Tasks", href: "/tasks" },
    { icon: FileText, label: "Backlog", href: "/backlog", count: 24, indent: true },
    { icon: CheckSquare, label: "In progress", href: "/in-progress", count: 4, indent: true },
    { icon: CheckSquare, label: "Validation", href: "/validation", count: 7, indent: true },
    { icon: CheckSquare, label: "Done", href: "/done", count: 13, indent: true },
];

const toolItems = [
    { icon: Bell, label: "Notification", href: "/notifications", count: 7, alert: true },
    { icon: Inbox, label: "Inbox", href: "/inbox" },
    { icon: FileText, label: "Integration", href: "/integration" },
    { icon: PieChart, label: "Reporting", href: "/reporting" },
];

export function Sidebar() {
    return (
        <aside className="w-64 bg-background border-r border-border h-screen flex flex-col sticky top-0">
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                    R
                </div>
                <div>
                    <h1 className="font-bold text-sm">Relatel wise</h1>
                    <p className="text-xs text-muted-foreground">microdose.studio</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                <div>
                    <h3 className="px-3 text-xs font-medium text-muted-foreground mb-2">Overview</h3>
                    <nav className="space-y-1">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    item.indent ? "ml-4 text-muted-foreground hover:text-foreground hover:bg-muted" : "text-foreground hover:bg-muted",
                                    index === 2 && "bg-muted text-foreground" // Active state mock
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </div>
                                {item.count !== undefined && (
                                    <span className="text-xs text-muted-foreground">{item.count}</span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div>
                    <h3 className="px-3 text-xs font-medium text-muted-foreground mb-2">Tools</h3>
                    <nav className="space-y-1">
                        {toolItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted hover:text-foreground transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </div>
                                {item.count !== undefined && (
                                    <span className={cn("text-xs px-1.5 py-0.5 rounded-full", item.alert ? "bg-destructive text-destructive-foreground" : "text-muted-foreground")}>
                                        {item.count}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="p-4 border-t border-border space-y-1">
                <Link href="/help" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted hover:text-foreground">
                    <HelpCircle className="w-4 h-4" />
                    Help Center
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted hover:text-foreground">
                    <Settings className="w-4 h-4" />
                    Settings
                </Link>
                <div className="mt-4 flex items-center gap-3 px-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        {/* Placeholder avatar */}
                        <div className="w-full h-full bg-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Kamil Bachanek</p>
                        <p className="text-xs text-muted-foreground truncate">kamil@microdose.studio</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
