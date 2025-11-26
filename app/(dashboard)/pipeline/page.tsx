"use client";

import { PipelineHeatmap } from "@/components/pipeline/PipelineHeatmap";
import { PipelineHealth } from "@/components/pipeline/PipelineHealth";
import { Button } from "@/components/ui/Button";
import { Filter, Plus } from "lucide-react";

export default function PipelinePage() {
    return (
        <div className="flex h-full gap-6">
            <div className="flex-1 flex flex-col min-w-0 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Pipeline Overview</h1>
                        <p className="text-muted-foreground">Visualize deal velocity and risk across stages.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <Filter className="w-4 h-4" />
                        </Button>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Deal
                        </Button>
                    </div>
                </div>

                <PipelineHeatmap />
            </div>

            <div className="w-80 shrink-0">
                <PipelineHealth />
            </div>
        </div>
    );
}
