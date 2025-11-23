import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface RightPanelProps {
    className?: string;
    isOpen?: boolean;
    children?: React.ReactNode;
}

export function RightPanel({ className, isOpen = true, children }: RightPanelProps) {
    if (!isOpen) return null;

    return (
        <aside
            className={cn(
                "w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto",
                className
            )}
        >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium text-sm">AI Context</span>
                </div>
                {/* Toggle button could go here */}
            </div>
            <div className="p-4 space-y-4">
                {children || (
                    <>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Insight</h4>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                                Reviewing your rhythm stack...
                            </p>
                        </div>

                        {/* Placeholders */}
                        <div className="space-y-2">
                            <div className="h-20 bg-gray-100 dark:bg-gray-900 rounded-lg" />
                            <div className="h-20 bg-gray-100 dark:bg-gray-900 rounded-lg" />
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}
