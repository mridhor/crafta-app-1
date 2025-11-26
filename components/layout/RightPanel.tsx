"use client";

import { Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function RightPanel() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={cn(
            "border-l border-border bg-background flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto transition-all duration-300 hidden xl:flex",
            isCollapsed ? "w-12" : "w-80 p-4 space-y-4"
        )}>
            <div className={cn("flex items-center justify-between text-primary font-medium text-sm mb-2", isCollapsed && "flex-col gap-4 mt-4")}>
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>AI Context</span>
                    </div>
                )}
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
            </div>

            {!isCollapsed && (
                <>
                    <Card className="bg-primary/5 border-primary/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-primary">Insight</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">
                                Reviewing your rhythm stack...
                            </p>
                        </CardContent>
                    </Card>

                    <div className="h-32 rounded-xl bg-muted/50 animate-pulse" />
                    <div className="h-32 rounded-xl bg-muted/50 animate-pulse" />
                </>
            )}
        </aside>
    );
}
