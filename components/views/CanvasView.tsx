import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MessageSquare, Send, MoreHorizontal, Pin, Clock, Plus, Layout, Type, Image as ImageIcon } from "lucide-react";

export function CanvasView() {
    const sidebar = (
        <div className="p-4 space-y-6">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4">
                <Plus className="w-4 h-4 mr-2" /> New Session
            </Button>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Pins</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground p-2 hover:bg-muted rounded cursor-pointer">
                        <Pin className="w-3 h-3 text-orange-500" /> Q4 Strategy
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground p-2 hover:bg-muted rounded cursor-pointer">
                        <Pin className="w-3 h-3 text-orange-500" /> Competitor Analysis
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Chats</h3>
                <div className="space-y-1">
                    <div className="p-2 hover:bg-muted rounded-md cursor-pointer group">
                        <div className="text-sm font-medium truncate">Why are demos stalling?</div>
                        <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
                            <Clock className="w-3 h-3" /> 2h ago
                        </div>
                    </div>
                    <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium truncate">Draft follow-up for Acme</div>
                        <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
                            <Clock className="w-3 h-3" /> 1d ago
                        </div>
                    </div>
                    <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium truncate">QBR Preparation</div>
                        <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
                            <Clock className="w-3 h-3" /> 3d ago
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="flex flex-col h-full relative bg-slate-50 dark:bg-slate-950/50">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
                    <div className="flex items-center gap-2">
                        <h1 className="font-bold text-lg">Untitled Session</h1>
                        <span className="text-xs text-muted-foreground">Edited just now</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm"><Layout className="w-4 h-4 mr-2" /> Templates</Button>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 overflow-hidden relative p-8">
                    {/* Placeholder for Dynamic Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-2xl w-full">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 mx-auto">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Intelligence Canvas</h2>
                        <p className="text-muted-foreground mb-8">
                            Ask questions, drag entities, or start a strategy session.
                        </p>

                        {/* Input Area */}
                        <div className="w-full relative shadow-lg rounded-full">
                            <input
                                type="text"
                                placeholder="Ask anything..."
                                className="w-full h-14 pl-6 pr-14 rounded-full border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                            />
                            <Button size="icon" className="absolute right-2 top-2 rounded-full bg-blue-600 hover:bg-blue-700 w-10 h-10">
                                <Send className="w-4 h-4 text-white" />
                            </Button>
                        </div>

                        {/* Suggestions */}
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            <Button variant="outline" className="rounded-full text-xs h-8 bg-background">Analyze Q4 Pipeline</Button>
                            <Button variant="outline" className="rounded-full text-xs h-8 bg-background">Why is deal X stalled?</Button>
                            <Button variant="outline" className="rounded-full text-xs h-8 bg-background">Draft email to John</Button>
                        </div>
                    </div>

                    {/* Draggable Element Mockups */}
                    <Card className="absolute top-20 left-20 w-64 p-4 shadow-md cursor-move border-l-4 border-l-blue-500 bg-background rotate-1">
                        <h4 className="font-bold text-sm mb-2">Pipeline Analysis</h4>
                        <p className="text-xs text-muted-foreground">
                            Win rate dropped by 5% in the last month. Primary cause: Stalled negotiations.
                        </p>
                    </Card>

                    <Card className="absolute bottom-40 right-40 w-56 p-4 shadow-md cursor-move border-l-4 border-l-green-500 bg-background -rotate-2">
                        <h4 className="font-bold text-sm mb-2">Action Item</h4>
                        <p className="text-xs text-muted-foreground">
                            Schedule review with Sales Team for Friday.
                        </p>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
