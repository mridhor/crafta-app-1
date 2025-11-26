"use client";

import { CanvasView } from "@/components/canvas/CanvasView";
import { Button } from "@/components/ui/Button";
import { Filter, Share2 } from "lucide-react";

export default function CanvasPage() {
    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Intelligence Canvas</h1>
                    <p className="text-muted-foreground">Visualize relationships between your entities.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <Filter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-0 border rounded-lg overflow-hidden bg-background">
                <CanvasView />
            </div>
        </div>
    );
}
