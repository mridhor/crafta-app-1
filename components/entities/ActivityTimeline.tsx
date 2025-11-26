"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { formatTimeAgo } from "@/lib/utils";
import { Mail, Phone, Calendar, FileText, ArrowRight, Sparkles } from "lucide-react";

interface Activity {
    id: string;
    activity_type: string;
    title: string;
    description?: string;
    created_at: string;
    user?: {
        full_name: string;
        avatar_url?: string;
    };
}

interface ActivityTimelineProps {
    dealId: string;
    activities?: Activity[];
}

export function ActivityTimeline({ dealId, activities }: ActivityTimelineProps) {
    if (!activities || activities.length === 0) {
        return <div className="text-sm text-muted-foreground py-4">No activities yet.</div>;
    }

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "email": return <Mail className="w-4 h-4" />;
            case "call": return <Phone className="w-4 h-4" />;
            case "meeting": return <Calendar className="w-4 h-4" />;
            case "note": return <FileText className="w-4 h-4" />;
            case "stage_change": return <ArrowRight className="w-4 h-4" />;
            case "ai_insight": return <Sparkles className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {activities.map((activity) => (
                <div key={activity.id} className="relative flex items-start group is-active">
                    <div className="absolute left-0 top-1 ml-5 -translate-x-1/2 rounded-full border border-border bg-background p-1.5">
                        {getActivityIcon(activity.activity_type)}
                    </div>
                    <div className="ml-12 w-full">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{activity.title}</span>
                            <span className="text-xs text-muted-foreground">{formatTimeAgo(activity.created_at)}</span>
                        </div>
                        {activity.description && (
                            <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md mb-2">
                                {activity.description}
                            </p>
                        )}
                        <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                                <AvatarImage src={activity.user?.avatar_url} />
                                <AvatarFallback className="text-[10px]">{activity.user?.full_name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{activity.user?.full_name || "System"}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
