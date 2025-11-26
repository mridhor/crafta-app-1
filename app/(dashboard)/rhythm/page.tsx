"use client";

import { RhythmStack } from "@/components/rhythm/RhythmStack";
import { Button } from "@/components/ui/Button";
import { Plus, Settings2 } from "lucide-react";

export default function RhythmPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Rhythm Stack</h1>
                    <p className="text-muted-foreground">Your prioritized actions for today.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <Settings2 className="w-4 h-4" />
                    </Button>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Action
                    </Button>
                </div>
            </div>

            <RhythmStack />
        </div>
    );
}
