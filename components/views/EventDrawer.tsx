import { Button } from "@/components/ui/Button";
import { X, Calendar, Clock, MapPin, Users, FileText, Paperclip, Sparkles, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EventDrawerProps {
    event: any;
    onClose: () => void;
}

export function EventDrawer({ event, onClose }: EventDrawerProps) {
    const [activeTab, setActiveTab] = useState("overview");

    if (!event) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-96 bg-background border-l border-border shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {event.aiSuggested && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            AI Suggested
                        </span>
                    )}
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <div className="p-6 pb-2">
                <h2 className="text-xl font-bold mb-1">{event.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Today, {event.time}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{event.duration}</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-6 border-b border-border">
                <div className="flex gap-4">
                    {["overview", "notes", "attachments", "ai-actions"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-3 text-sm font-medium transition-colors relative",
                                activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase">Participants</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                                    AJ
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Alice Johnson</p>
                                    <p className="text-xs text-muted-foreground">Acme Corp</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
                                    ME
                                </div>
                                <div>
                                    <p className="text-sm font-medium">You</p>
                                    <p className="text-xs text-muted-foreground">Organizer</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase">Location</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span>Zoom Meeting</span>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:underline ml-6 block">
                                https://zoom.us/j/123456789
                            </a>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase">Related Entity</h3>
                            <div className="p-3 border border-border rounded-md flex items-center justify-between hover:bg-muted/50 cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-orange-100 text-orange-700 rounded flex items-center justify-center">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Acme Corp Expansion</p>
                                        <p className="text-xs text-muted-foreground">$125,000 • Proposal</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "notes" && (
                    <div className="space-y-4">
                        <div className="bg-muted/30 p-4 rounded-md border border-border/50 min-h-[200px]">
                            <p className="text-sm text-muted-foreground italic">
                                Start typing or use AI to generate agenda...
                            </p>
                        </div>
                        <Button variant="outline" className="w-full">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Meeting Agenda
                        </Button>
                    </div>
                )}

                {activeTab === "attachments" && (
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer">
                            <Paperclip className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">Drop files here</p>
                            <p className="text-xs text-muted-foreground">or click to upload</p>
                        </div>
                    </div>
                )}

                {activeTab === "ai-actions" && (
                    <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-900">
                            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Meeting Prep
                            </h4>
                            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                                Alice mentioned "pricing concerns" in the last email. Be prepared to discuss the Q3 discount tiers.
                            </p>
                            <div className="flex gap-2">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    View Discount Tiers
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase">Suggested Actions</h4>
                            <Button variant="outline" className="w-full justify-start h-auto py-3">
                                <Send className="w-4 h-4 mr-3" />
                                <div className="text-left">
                                    <p className="text-sm font-medium">Send Pre-read Email</p>
                                    <p className="text-xs text-muted-foreground">Draft ready with Q3 proposal attached</p>
                                </div>
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-auto py-3">
                                <MessageSquare className="w-4 h-4 mr-3" />
                                <div className="text-left">
                                    <p className="text-sm font-medium">Open Strategy Canvas</p>
                                    <p className="text-xs text-muted-foreground">Review negotiation tactics</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
