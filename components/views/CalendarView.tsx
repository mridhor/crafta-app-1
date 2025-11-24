"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { EventDrawer } from "@/components/views/EventDrawer";
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Clock,
    MoreHorizontal,
    Plus,
    AlertCircle,
    Sparkles,
    LayoutGrid,
    List,
    Columns
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Calendar (Fallback)
const initialEvents = [
    { id: 1, title: "Demo with Acme Corp", time: "09:00 AM", duration: "1h", type: "meeting", conflict: false },
    { id: 2, title: "Internal Sync", time: "11:00 AM", duration: "30m", type: "internal", conflict: true },
    { id: 3, title: "Follow-up Call: Stark Ind", time: "02:00 PM", duration: "45m", type: "call", conflict: false },
    { id: 4, title: "Focus Time: Proposal Prep", time: "03:00 PM", duration: "2h", type: "focus", conflict: false, aiSuggested: true },
];

export function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<any[]>(initialEvents);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [viewMode, setViewMode] = useState("day"); // day, week, month

    // Fetch actions from Supabase and map to events
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const { data: actions, error } = await supabase
                .from('actions')
                .select(`
          *,
          deal:deals(company:companies(name))
        `)
                .not('scheduled_at', 'is', null);

            if (actions && actions.length > 0) {
                const mappedEvents = actions.map((action: any) => ({
                    id: action.id,
                    title: action.action_type === 'meeting'
                        ? `Meeting with ${action.deal?.company?.name || 'Client'}`
                        : action.action_type || "Untitled Event",
                    time: new Date(action.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    duration: "1h", // Placeholder
                    type: action.action_type?.toLowerCase() || "other",
                    conflict: false, // Need logic to detect overlaps
                    aiSuggested: action.params?.ai_suggested || false
                }));
                setEvents(mappedEvents);
            }
            setLoading(false);
        };

        fetchEvents();
    }, [currentDate]);

    const timeSlots = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
        "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
        "04:00 PM", "05:00 PM"
    ];

    const sidebar = (
        <div className="p-4 space-y-6">
            <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">October 2025</h3>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronLeft className="w-3 h-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight className="w-3 h-3" /></Button>
                    </div>
                </div>
                {/* Mini Calendar Grid Placeholder */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                    {/* ... days ... */}
                    <div className="p-1">1</div><div className="p-1">2</div><div className="p-1">3</div><div className="p-1">4</div><div className="p-1">5</div><div className="p-1">6</div><div className="p-1">7</div>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Views</h3>
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", viewMode === "day" && "bg-secondary font-medium")}
                        onClick={() => setViewMode("day")}
                    >
                        <Columns className="w-4 h-4 mr-3" />
                        Day View
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", viewMode === "week" && "bg-secondary font-medium")}
                        onClick={() => setViewMode("week")}
                    >
                        <LayoutGrid className="w-4 h-4 mr-3" />
                        Week View
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", viewMode === "month" && "bg-secondary font-medium")}
                        onClick={() => setViewMode("month")}
                    >
                        <CalendarIcon className="w-4 h-4 mr-3" />
                        Month View
                    </Button>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Calendars</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span>My Calendar</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span>Team Events</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span>Tasks</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="flex flex-col h-full relative">
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-background z-10">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold tracking-tight">
                            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h1>
                        <div className="flex items-center border border-border rounded-md">
                            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
                            <Button variant="ghost" className="h-8 px-3 text-sm font-normal">Today</Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            Workload View
                        </Button>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            New Event
                        </Button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="relative space-y-6">
                        {/* Current Time Indicator (Mock) */}
                        <div className="absolute left-16 top-[320px] w-[calc(100%-4rem)] border-t-2 border-red-500 z-10 flex items-center">
                            <div className="absolute -left-2 w-4 h-4 bg-red-500 rounded-full" />
                        </div>

                        {timeSlots.map((time) => (
                            <div key={time} className="flex group min-h-[80px]">
                                <div className="w-16 text-xs text-muted-foreground font-medium pt-2 text-right pr-4">
                                    {time}
                                </div>
                                <div className="flex-1 border-t border-border group-first:border-t-0 relative">
                                    {/* Render Events for this time slot */}
                                    {events.filter(e => e.time === time).map(event => (
                                        <div
                                            key={event.id}
                                            onClick={() => setSelectedEvent(event)}
                                            className={cn(
                                                "absolute top-2 left-2 right-4 p-3 rounded-md border text-sm shadow-sm cursor-pointer hover:shadow-md transition-all group/event",
                                                event.type === 'meeting' ? "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100" :
                                                    event.type === 'internal' ? "bg-gray-50 border-gray-200 text-gray-900 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100" :
                                                        event.type === 'focus' ? "bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-100" :
                                                            "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100",
                                                event.conflict && "ring-2 ring-red-500 border-red-500 bg-red-50 dark:bg-red-900/10",
                                                event.aiSuggested && "border-dashed border-2"
                                            )}
                                            style={{ height: '70px' }} // Mock height
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="font-semibold truncate">{event.title}</span>
                                                {event.conflict && <AlertCircle className="w-4 h-4 text-red-600" />}
                                                {event.aiSuggested && <Sparkles className="w-3 h-3 text-blue-500" />}
                                            </div>
                                            <div className="text-xs opacity-80 mt-1 flex gap-2">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.duration}</span>
                                            </div>

                                            {/* Hover Tooltip/Actions */}
                                            <div className="absolute top-full left-0 mt-2 w-64 bg-popover text-popover-foreground p-3 rounded-md shadow-lg border border-border z-50 hidden group-hover/event:block animate-in fade-in zoom-in-95 duration-100">
                                                <p className="font-semibold text-sm mb-1">{event.title}</p>
                                                <p className="text-xs text-muted-foreground mb-2">
                                                    {event.time} • {event.duration}
                                                </p>
                                                <p className="text-xs">Click to view details and AI insights.</p>
                                            </div>

                                            {event.aiSuggested && (
                                                <div className="absolute bottom-2 right-2 flex gap-1">
                                                    <Button size="icon" className="h-5 w-5 bg-green-600 hover:bg-green-700 text-white rounded-full">
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Event Drawer */}
                {selectedEvent && (
                    <EventDrawer
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                    />
                )}
            </div>
        </AppLayout>
    );
}
