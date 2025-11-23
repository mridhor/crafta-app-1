import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function RightPanel() {
    return (
        <aside className="w-80 border-l border-border bg-background flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 space-y-4 hidden xl:block">
            <div className="flex items-center gap-2 text-primary font-medium text-sm mb-2">
                <Sparkles className="w-4 h-4" />
                <span>AI Context</span>
            </div>

            <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Insight</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                        Reviewing your rhythm stack...
                    </p>
                </CardContent>
            </Card>

            <div className="h-32 rounded-xl bg-muted/50 animate-pulse" />
            <div className="h-32 rounded-xl bg-muted/50 animate-pulse" />
        </aside>
    );
}
