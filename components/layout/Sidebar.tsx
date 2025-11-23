import { cn } from "@/lib/utils";

interface SidebarProps {
    className?: string;
    children?: React.ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
    return (
        <aside
            className={cn(
                "w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto",
                className
            )}
        >
            <div className="p-4">
                {children || (
                    <div className="text-sm text-gray-500">
                        <p className="mb-4 font-medium text-gray-900 dark:text-gray-100">Filters</p>
                        {/* Placeholder for default filters if none provided */}
                        <div className="space-y-2">
                            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
