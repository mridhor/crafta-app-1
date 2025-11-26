"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, AlertTriangle, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export function PipelineHealth() {
    const { data: health, isLoading } = useQuery({
        queryKey: ["pipeline-health"],
        queryFn: async () => {
            const res = await fetch("/api/pipeline/health");
            return res.json();
        }
    });

    if (isLoading) {
        return <div className="p-4 text-center text-muted-foreground">Loading health...</div>;
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pipeline Velocity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-2xl font-bold">+{health?.velocityChange}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Stalled Deals</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <span className="text-2xl font-bold">{health?.stalledDealsCount}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Total Value: {formatCurrency(health?.stalledDealsValue)}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Owner Consistency</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {Array.isArray(health?.ownerConsistency) && health.ownerConsistency.map((owner: any) => (
                            <div key={owner.userId} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                        <AvatarFallback>{owner.userName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{owner.userName}</span>
                                </div>
                                <span className={`text-sm font-bold ${owner.score >= 90 ? "text-green-500" : owner.score >= 70 ? "text-yellow-500" : "text-red-500"}`}>
                                    {owner.score}%
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
