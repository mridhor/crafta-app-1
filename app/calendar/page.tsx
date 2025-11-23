"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
const resources = ["Me", "John Doe", "Jane Smith"];

const events = [
    {
        id: 1,
        title: "Follow-up Call",
        resource: "Me",
        startHour: 9,
        duration: 1,
        type: "call",
    },
    {
        id: 2,
        title: "Demo with Acme",
        resource: "Me",
        startHour: 14,
        duration: 2,
        type: "meeting",
    },
    {
        id: 3,
        title: "Contract Review",
        resource: "John Doe",
        startHour: 10,
        duration: 1.5,
        type: "task",
    },
    {
        id: 4,
        title: "Team Sync",
        resource: "Jane Smith",
        startHour: 11,
        duration: 1,
        type: "meeting",
    },
];

export default function CalendarPage() {
    return (
        <PageLayout
            sidebar={
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Calendar Views
                        </h3>
                        <div className="space-y-1">
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md">
                                Day View
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                Week View
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                Month View
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                            Filters
                            <Filter className="w-3 h-3" />
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span>My Calendar</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span>Team Calendar</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="h-full flex flex-col">
                {/* Calendar Header */}
                <div className="border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between bg-white dark:bg-gray-950">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-gray-500" />
                            November 24, 2025
                        </h1>
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md p-0.5">
                            <button className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded shadow-sm transition-all">
                                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded shadow-sm transition-all">
                                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Workload Balancing: </span>
                        <button className="bg-gray-200 dark:bg-gray-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                        </button>
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="flex-1 overflow-auto bg-white dark:bg-gray-950 relative">
                    <div className="flex min-w-[800px]">
                        {/* Time Column */}
                        <div className="w-20 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 sticky left-0 z-10">
                            <div className="h-10 border-b border-gray-200 dark:border-gray-800" /> {/* Header spacer */}
                            {hours.map((hour) => (
                                <div key={hour} className="h-20 border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 text-right pr-2 pt-2">
                                    {hour}:00
                                </div>
                            ))}
                        </div>

                        {/* Resources Columns */}
                        <div className="flex-1 flex">
                            {resources.map((resource) => (
                                <div key={resource} className="flex-1 min-w-[200px] border-r border-gray-200 dark:border-gray-800 relative">
                                    {/* Column Header */}
                                    <div className="h-10 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center font-medium text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-950/50 sticky top-0 z-10">
                                        {resource}
                                    </div>

                                    {/* Grid Lines */}
                                    {hours.map((hour) => (
                                        <div key={hour} className="h-20 border-b border-gray-100 dark:border-gray-800/50" />
                                    ))}

                                    {/* Events */}
                                    {events
                                        .filter((e) => e.resource === resource)
                                        .map((event) => (
                                            <div
                                                key={event.id}
                                                className={cn(
                                                    "absolute left-1 right-1 rounded-md p-2 text-xs border shadow-sm cursor-pointer hover:brightness-95 transition-all",
                                                    event.type === "call" ? "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/50 dark:border-blue-800 dark:text-blue-100" :
                                                        event.type === "meeting" ? "bg-purple-100 border-purple-200 text-purple-800 dark:bg-purple-900/50 dark:border-purple-800 dark:text-purple-100" :
                                                            "bg-gray-100 border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                                )}
                                                style={{
                                                    top: `${(event.startHour - 8) * 80 + 40}px`, // 40px offset for header
                                                    height: `${event.duration * 80}px`,
                                                }}
                                            >
                                                <div className="font-semibold truncate">{event.title}</div>
                                                <div className="opacity-75">{event.duration}h</div>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
