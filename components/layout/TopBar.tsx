import Link from "next/link";
import { Search, Bell, User, Briefcase, LayoutDashboard, Calendar, BarChart3, Users, Inbox, Sparkles, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Rhythm", href: "/", icon: LayoutDashboard },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Pipeline", href: "/pipeline", icon: BarChart3 },
    { name: "Entities", href: "/entities", icon: Users },
    { name: "Convert", href: "/convert", icon: Inbox },
    { name: "Canvas", href: "/canvas", icon: Sparkles },
];

export function TopBar() {
    return (
        <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between px-4 sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <div className="font-bold text-xl tracking-tight">Crafta</div>
                <nav className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-800 transition-colors"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-9 w-64 pl-9 pr-4 rounded-md bg-gray-100 dark:bg-gray-900 border-none text-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <Bell className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                        WS
                    </div>
                    <span className="text-sm font-medium">Workspace</span>
                </div>

                <Link href="/settings" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <Settings className="w-5 h-5" />
                </Link>

                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                </div>
            </div>
        </header>
    );
}
