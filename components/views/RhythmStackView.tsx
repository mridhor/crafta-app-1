"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { UndoToast } from "@/components/ui/UndoToast";
import { supabase } from "@/lib/supabase";
import {
    Filter,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Phone,
    Mail,
    MessageSquare,
    ArrowRight,
    Sparkles,
    Calendar as CalendarIcon,
    User,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Rhythm Stack (Fallback)
const mockTasks = [
    {
        id: 1,
        title: "Review Q3 Proposal with Acme Corp",
        entity: "Acme Corp",
        contact: "Alice Johnson",
        value: "$125,000",
        stage: "Proposal",
        urgency: "high",
        decay: "2 days left",
        aiContext: "Alice opened the proposal 3 times yesterday. Competitor 'TechGiant' mentioned in email.",
        suggestedAction: "Call to address pricing concerns",
        type: "call",
        owner: "me"
    },
    {
        id: 2,
        title: "Follow up on Demo Request",
        entity: "Stark Industries",
        contact: "Tony Stark",
        value: "$50,000",
        stage: "Discovery",
        urgency: "medium",
        decay: "4 hours left",
        aiContext: "Lead score increased by 15 points after webinar attendance.",
        suggestedAction: "Send personalized email",
        type: "email",
        owner: "me"
    },
    {
        id: 3,
        title: "Contract Negotiation Stalled",
        entity: "Wayne Enterprises",
        contact: "Bruce Wayne",
        value: "$300,000",
        stage: "Negotiation",
        urgency: "critical",
        decay: "OVERDUE",
        aiContext: "No activity for 7 days. Risk of slipping to next quarter.",
        suggestedAction: "Escalate to VP",
        type: "escalate",
        owner: "team"
    },
    {
        id: 4,
        title: "Quarterly Business Review",
        entity: "Cyberdyne Systems",
        contact: "Sarah Connor",
        value: "$80,000",
        stage: "Renewal",
        urgency: "low",
        decay: "5 days left",
        aiContext: "Usage dropped 10% last month. Churn risk detected.",
        suggestedAction: "Schedule health check",
        type: "meeting",
        owner: "me"
    }
];

export function RhythmStackView() {
    const [activeView, setActiveView] = useState("today"); // today, urgent, my-items, team-items
    const [tasks, setTasks] = useState<any[]>(mockTasks);
    const [loading, setLoading] = useState(false);
    const [showUndo, setShowUndo] = useState(false);
    const [lastDeletedTask, setLastDeletedTask] = useState<any>(null);

    // Fetch tasks from Supabase 'actions' table
    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            // In Phase 1 Schema, 'actions' table holds the tasks
            const { data, error } = await supabase
                .from('actions')
                .select(`
          *,
          deal:deals(name, value, stage, company:companies(name))
        `)
                .eq('status', 'pending');

            if (data && data.length > 0) {
                // Transform Supabase data to UI model
                const mappedTasks = data.map((action: any) => ({
                    id: action.id,
                    title: action.action_type || "Untitled Action",
                    entity: action.deal?.company?.name || "Unknown Entity",
                    contact: "Unknown Contact", // Would need join with contacts
                    value: action.deal?.value ? `$${action.deal.value}` : "-",
                    stage: action.deal?.stage || "-",
                    urgency: action.params?.urgency || "medium",
                    decay: "Just now", // Placeholder logic
                    aiContext: action.params?.ai_context || "No AI context available.",
                    suggestedAction: action.action_type,
                    type: action.action_type?.toLowerCase().includes('call') ? 'call' : 'email',
                    owner: "me" // Placeholder
                }));
                setTasks(mappedTasks);
            }
            setLoading(false);
        };

        fetchTasks();
    }, [activeView]);

    // Filter Logic
    const filteredTasks = tasks.filter(task => {
        if (activeView === "urgent") return task.urgency === "high" || task.urgency === "critical";
        if (activeView === "my-items") return task.owner === "me";
        if (activeView === "team-items") return task.owner === "team";
        return true; // "today" shows all for now
    });

    const handleDone = async (taskId: number) => {
        const taskToDelete = tasks.find(t => t.id === taskId);
        setLastDeletedTask(taskToDelete);
        setTasks(tasks.filter(t => t.id !== taskId));
        setShowUndo(true);

        // Optimistic update
        // await supabase.from('actions').update({ status: 'completed' }).eq('id', taskId);
    };

    const handleUndo = async () => {
        if (lastDeletedTask) {
            setTasks(prev => [...prev, lastDeletedTask].sort((a, b) => a.id - b.id));
            setShowUndo(false);
            setLastDeletedTask(null);

            // Revert in Supabase
            // await supabase.from('actions').update({ status: 'pending' }).eq('id', lastDeletedTask.id);
        }
    };

    const sidebar = (
        <div className="p-4 space-y-8">
            {/* Saved Views */}
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Saved Views</h3>
                <nav className="space-y-1">
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeView === "today" && "bg-secondary font-medium")}
                        onClick={() => setActiveView("today")}
                    >
                        <CalendarIcon className="w-4 h-4 mr-3 text-blue-500" />
                        Today{"'"} Focus
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeView === "urgent" && "bg-secondary font-medium")}
                        onClick={() => setActiveView("urgent")}
                    >
                        <AlertTriangle className="w-4 h-4 mr-3 text-orange-500" />
                        Urgent & At Risk
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeView === "my-items" && "bg-secondary font-medium")}
                        onClick={() => setActiveView("my-items")}
                    >
                        <User className="w-4 h-4 mr-3 text-green-500" />
                        My Items
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeView === "team-items" && "bg-secondary font-medium")}
                        onClick={() => setActiveView("team-items")}
                    >
                        <Users className="w-4 h-4 mr-3 text-purple-500" />
                        Team Items
                    </Button>
                </nav>
            </div>

            {/* Filters */}
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Filters</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span>Pipeline</span>
                        <span className="text-muted-foreground">All</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span>Value</span>
                        <span className="text-muted-foreground">Any</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span>Source</span>
                        <span className="text-muted-foreground">All</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const rightPanel = (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    AI Context
                </h3>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-6">
                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase">Why this matters</h4>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                        You have <span className="font-bold text-orange-600">3 urgent items</span> decaying today. Clearing these protects approximately <span className="font-bold">$425k</span> in pipeline value.
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase">Pattern Detection</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-900">
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                            <strong>Deal Velocity Alert:</strong> Deals in {"Proposal"} stage are stalling 20% longer than last month. Consider scheduling follow-ups earlier.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar} rightPanel={rightPanel}>
            <div className="p-6 max-w-3xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Rhythm Stack</h1>
                        <p className="text-muted-foreground">Your prioritized daily workflow.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Custom View
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {loading && tasks.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">Loading tasks...</div>
                    ) : filteredTasks.map((task) => (
                        <Card key={task.id} className="p-0 overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-transparent hover:border-l-blue-500 group">
                            <div className="p-5 flex gap-4">
                                {/* Urgency Indicator */}
                                <div className="mt-1">
                                    {task.urgency === 'critical' && <div className="w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-100 dark:ring-red-900/30" />}
                                    {task.urgency === 'high' && <div className="w-3 h-3 rounded-full bg-orange-500 ring-4 ring-orange-100 dark:ring-orange-900/30" />}
                                    {task.urgency === 'medium' && <div className="w-3 h-3 rounded-full bg-yellow-500" />}
                                    {task.urgency === 'low' && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                                </div>

                                <div className="flex-1 space-y-3">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-lg leading-none mb-1">{task.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="font-medium text-foreground">{task.entity}</span>
                                                <span>•</span>
                                                <span>{task.contact}</span>
                                                <span>•</span>
                                                <span className="px-1.5 py-0.5 bg-secondary rounded text-xs font-medium">{task.value}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-medium">
                                            <span className={cn(
                                                "flex items-center gap-1 px-2 py-1 rounded-full",
                                                task.decay === "OVERDUE" ? "bg-red-100 text-red-700" : "bg-orange-50 text-orange-700"
                                            )}>
                                                <Clock className="w-3 h-3" />
                                                {task.decay}
                                            </span>
                                        </div>
                                    </div>

                                    {/* AI Context Box */}
                                    <div className="bg-muted/30 p-3 rounded-md border border-border/50">
                                        <div className="flex gap-2 items-start">
                                            <Sparkles className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-muted-foreground leading-snug">
                                                {task.aiContext}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-1">
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                                                {task.type === 'call' && <Phone className="w-3.5 h-3.5 mr-2" />}
                                                {task.type === 'email' && <Mail className="w-3.5 h-3.5 mr-2" />}
                                                {task.type === 'meeting' && <CalendarIcon className="w-3.5 h-3.5 mr-2" />}
                                                {task.type === 'escalate' && <AlertTriangle className="w-3.5 h-3.5 mr-2" />}
                                                {task.suggestedAction}
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">
                                                <MessageSquare className="w-3.5 h-3.5 mr-2" />
                                                Canvas
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:border-green-900 dark:hover:bg-green-900/30"
                                                onClick={() => handleDone(task.id)}
                                            >
                                                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                                Done
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {filteredTasks.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-medium">All caught up!</h3>
                            <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                                You{"'ve"} cleared your {activeView.replace("-", " ")} list. Great work!
                            </p>
                            <Button variant="outline" className="mt-6" onClick={() => setActiveView("today")}>
                                View All Tasks
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {showUndo && (
                <UndoToast
                    message="Task marked as complete"
                    onUndo={handleUndo}
                    onDismiss={() => setShowUndo(false)}
                />
            )}
        </AppLayout>
    );
}
