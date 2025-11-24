"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    Mail,
    Phone,
    Calendar,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    FileText,
    Bot,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineEvent = {
    id: string;
    type: 'email' | 'call' | 'meeting' | 'note' | 'stage_change' | 'task' | 'ai_insight';
    title: string;
    description?: string;
    date: string; // Relative time string for now
    author: string; // "Me", "System", "John Doe"
    metadata?: any; // For specialized rendering
    sentiment?: 'positive' | 'neutral' | 'negative';
};

interface EntityTimelineProps {
    events: TimelineEvent[];
    onExplain?: (eventId: string) => void;
}

export function EntityTimeline({ events, onExplain }: EntityTimelineProps) {
    const getIcon = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'email': return <Mail className="w-4 h-4" />;
            case 'call': return <Phone className="w-4 h-4" />;
            case 'meeting': return <Calendar className="w-4 h-4" />;
            case 'note': return <FileText className="w-4 h-4" />;
            case 'stage_change': return <CheckCircle2 className="w-4 h-4" />;
            case 'task': return <CheckCircle2 className="w-4 h-4" />;
            case 'ai_insight': return <Bot className="w-4 h-4" />;
            default: return <MessageSquare className="w-4 h-4" />;
        }
    };

    const getColor = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'stage_change': return "text-green-600 bg-green-100 border-green-200";
            case 'ai_insight': return "text-purple-600 bg-purple-100 border-purple-200";
            case 'task': return "text-blue-600 bg-blue-100 border-blue-200";
            default: return "text-muted-foreground bg-secondary border-border";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 font-semibold">
                <Calendar className="w-4 h-4" />
                Activity Timeline
            </div>

            <div className="space-y-4 relative pl-4 border-l border-border ml-2">
                {events.map((event) => (
                    <Card key={event.id} className={cn("p-4 ml-4 relative transition-all hover:shadow-md", event.type === 'ai_insight' && "bg-purple-50/50 border-purple-100")}>
                        <div className={cn(
                            "absolute -left-[25px] top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-background z-10",
                            getColor(event.type).split(" ")[0].replace("text-", "border-")
                        )}>
                            <div className={cn("w-2 h-2 rounded-full", getColor(event.type).split(" ")[0].replace("text-", "bg-"))} />
                        </div>

                        <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-2">
                                {getIcon(event.type)}
                                <span className={cn("font-medium text-sm", event.type === 'stage_change' && "text-green-700")}>
                                    {event.title}
                                </span>
                            </div>
                            <span className="text-xs text-muted-foreground">{event.date}</span>
                        </div>

                        {event.description && (
                            <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                                {event.description}
                            </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-muted-foreground font-medium">
                                by {event.author}
                            </div>
                            {event.type !== 'stage_change' && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-[10px] text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2"
                                    onClick={() => onExplain?.(event.id)}
                                >
                                    <Bot className="w-3 h-3 mr-1.5" />
                                    Explain this
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
