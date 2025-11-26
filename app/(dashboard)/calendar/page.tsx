"use client";

import { CalendarView } from "@/components/calendar/CalendarView";
import { Button } from "@/components/ui/Button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground">Manage your schedule and meetings.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                        <Button variant="ghost" size="sm" className="h-7 px-2">Day</Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 bg-background shadow-sm">Week</Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2">Month</Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline">Today</Button>
                        <Button variant="outline" size="icon">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Event
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-0 border rounded-lg overflow-hidden">
                <CalendarView />
            </div>
        </div>
    );
}
