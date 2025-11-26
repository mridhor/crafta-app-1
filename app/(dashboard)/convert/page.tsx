"use client";

import { IntakeQueue } from "@/components/convert/IntakeQueue";
import { Button } from "@/components/ui/Button";
import { Plus, Settings2 } from "lucide-react";

export default function ConvertPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Convert Intake Hub</h1>
                    <p className="text-muted-foreground">Validate and process incoming leads and requests.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <Settings2 className="w-4 h-4" />
                    </Button>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Manual Entry
                    </Button>
                </div>
            </div>

            <IntakeQueue />
        </div>
    );
}
