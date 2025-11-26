"use client";

import { useQuery } from "@tanstack/react-query";
import { formatTimeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export function CalendarView() {
    const { data: events, isLoading } = useQuery({
        queryKey: ["calendar-events"],
        queryFn: async () => {
            const res = await fetch("/api/calendar");
            return res.json();
        }
    });

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading calendar...</div>;
    }

    if (!Array.isArray(events)) {
        return <div className="p-8 text-center text-red-500">Error loading calendar events.</div>;
    }

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const hours = Array.from({ length: 9 }, (_, i) => i + 9); // 9 AM to 5 PM

    return (
        <div className="flex h-full flex-col bg-background">
            {/* Header */}
            <div className="grid grid-cols-6 border-b border-border">
                <div className="p-4 border-r border-border bg-muted/30"></div>
                {days.map((day) => (
                    <div key={day} className="p-4 text-center font-medium border-r border-border last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-6 min-h-[600px]">
                    {/* Time Column */}
                    <div className="border-r border-border bg-muted/30">
                        {hours.map((hour) => (
                            <div key={hour} className="h-20 border-b border-border p-2 text-xs text-muted-foreground text-right relative">
                                <span className="-top-2.5 right-2 absolute">{hour}:00</span>
                            </div>
                        ))}
                    </div>

                    {/* Days Columns */}
                    {days.map((day) => (
                        <div key={day} className="border-r border-border last:border-r-0 relative">
                            {hours.map((hour) => (
                                <div key={hour} className="h-20 border-b border-border"></div>
                            ))}

                            {/* Render Events (Mock positioning for now) */}
                            {events?.filter((e: any) => {
                                const date = new Date(e.start_time);
                                // Simple mock check for day (needs real date logic)
                                return true;
                            }).slice(0, 2).map((event: any, i: number) => (
                                <div
                                    key={event.id}
                                    className="absolute left-1 right-1 rounded-md bg-primary/10 border-l-4 border-primary p-2 text-xs hover:bg-primary/20 cursor-pointer transition-colors"
                                    style={{
                                        top: `${(new Date(event.start_time).getHours() - 9) * 80 + 10 + (i * 30)}px`,
                                        height: "60px"
                                    }}
                                >
                                    <div className="font-semibold truncate">{event.title}</div>
                                    <div className="text-muted-foreground truncate">{event.deal?.name}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
