"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Plus, Users, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Events
const events = [
    { id: 1, title: "Demo with Acme Corp", time: "09:00 AM", duration: "1h", type: "meeting", status: "confirmed" },
    { id: 2, title: "Follow-up: Stark Ind", time: "11:00 AM", duration: "30m", type: "call", status: "confirmed" },
    { id: 3, title: "Team Sync", time: "02:00 PM", duration: "1h", type: "internal", status: "confirmed" },
    { id: 4, title: "Focus Time", time: "03:30 PM", duration: "1h", type: "focus", status: "suggested" }, // AI Suggested
    { id: 5, title: "Conflict: Double Booked", time: "02:00 PM", duration: "30m", type: "meeting", status: "conflict" }, // Conflict
];

export function CalendarView() {
    const [viewMode, setViewMode] = useState("day"); // day, week, month
    const [workloadBalancing, setWorkloadBalancing] = useState(false);

    const sidebar = (
        <div className="p-4 space-y-6">
            <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm font-medium">
                    <CalendarIcon className="w-4 h-4 mr-2" /> My Calendar
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" /> Team Calendar
                </Button>
            </div>

            <div className="pt-4 border-t border-border">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Filters</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        <span>Meetings</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        <span>Tasks</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        <span>Reminders</span>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Workload Balancing</span>
                    <div
                        className={cn("w-10 h-5 rounded-full relative cursor-pointer transition-colors", workloadBalancing ? "bg-blue-600" : "bg-gray-300")}
                        onClick={() => setWorkloadBalancing(!workloadBalancing)}
                    >
                        <div className={cn("absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform", workloadBalancing ? "translate-x-5" : "translate-x-0")} />
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    Automatically distribute tasks to prevent burnout.
                </p>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-background sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold tracking-tight">October 24, 2025</h1>
                        <div className="flex items-center gap-1 bg-secondary rounded-md p-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs font-medium">Today</Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="w-4 h-4" /></Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex bg-secondary rounded-md p-1 mr-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn("h-7 text-xs", viewMode === "day" && "bg-background shadow-sm")}
                                onClick={() => setViewMode("day")}
                            >Day</Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn("h-7 text-xs", viewMode === "week" && "bg-background shadow-sm")}
                                onClick={() => setViewMode("week")}
                            >Week</Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn("h-7 text-xs", viewMode === "month" && "bg-background shadow-sm")}
                                onClick={() => setViewMode("month")}
                            >Month</Button>
                        </div>
                        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" /> New Event</Button>
                    </div>
                </div>

                {/* Calendar Grid (Day View Mock) */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="relative space-y-4 max-w-4xl mx-auto">
                        {/* Time Marker */}
                        <div className="absolute left-16 top-32 w-full border-t border-red-500 z-10 pointer-events-none">
                            <span className="absolute -left-16 -top-2.5 text-xs font-bold text-red-500 bg-background px-1">10:42 AM</span>
                            <div className="absolute -left-1 w-2 h-2 rounded-full bg-red-500 -top-1" />
                        </div>

                        {events.map((event, index) => (
                            <div key={event.id} className="flex gap-4 group">
                                <div className="w-16 text-right text-sm text-muted-foreground pt-2">{event.time}</div>
                                <Card className={cn(
                                    "flex-1 p-3 border-l-4 transition-all hover:shadow-md cursor-pointer relative overflow-hidden",
                                    event.status === "conflict" ? "bg-red-50 border-red-500 border border-l-4 dark:bg-red-900/20 dark:border-red-500" :
                                        event.status === "suggested" ? "bg-blue-50/50 border-blue-400 border-dashed border-l-4 dark:bg-blue-900/10 dark:border-blue-400" :
                                            event.type === "meeting" ? "border-l-blue-500" :
                                                event.type === "call" ? "border-l-green-500" :
                                                    "border-l-gray-400"
                                )}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className={cn("font-semibold text-sm", event.status === "conflict" ? "text-red-700 dark:text-red-300" : "")}>
                                                {event.status === "suggested" && <Sparkles className="w-3 h-3 inline mr-1 text-blue-500" />}
                                                {event.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">{event.duration} • {event.type}</p>
                                        </div>
                                        {event.status === "conflict" && (
                                            <div className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                                                <AlertCircle className="w-3 h-3" /> Conflict
                                            </div>
                                        )}
                                        {event.status === "suggested" && (
                                            <div className="flex gap-2">
                                                <Button size="sm" className="h-6 text-[10px] bg-blue-600 text-white">Accept</Button>
                                                <Button size="sm" variant="ghost" className="h-6 text-[10px]">Dismiss</Button>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
