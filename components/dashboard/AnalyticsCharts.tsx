"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Edit2, Maximize2, MoreVertical } from "lucide-react";

const burndownData = [
    { name: '1', actual: 120, ideal: 120 },
    { name: '2', actual: 118, ideal: 110 },
    { name: '3', actual: 110, ideal: 100 },
    { name: '4', actual: 108, ideal: 90 },
    { name: '5', actual: 100, ideal: 80 },
    { name: '6', actual: 95, ideal: 70 },
    { name: '7', actual: 80, ideal: 60 },
    { name: '8', actual: 75, ideal: 50 },
    { name: '9', actual: 60, ideal: 40 },
    { name: '10', actual: 55, ideal: 30 },
    { name: '11', actual: 40, ideal: 20 },
    { name: '12', actual: 20, ideal: 10 },
];

const commentsData = [
    { name: 'Mon', comments: 10 },
    { name: 'Tue', comments: 15 },
    { name: 'Wed', comments: 8 },
    { name: 'Thu', comments: 25 },
    { name: 'Fri', comments: 20 },
    { name: 'Sat', comments: 12 },
    { name: 'Sun', comments: 18 },
];

const commitsData = [
    { name: 'Mon', commits: 5 },
    { name: 'Tue', commits: 8 },
    { name: 'Wed', commits: 12 },
    { name: 'Thu', commits: 7 },
    { name: 'Fri', commits: 15 },
    { name: 'Sat', commits: 3 },
    { name: 'Sun', commits: 2 },
];

export function BurndownChart() {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Burndown chart (estimate points)</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><Edit2 className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><Maximize2 className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><MoreVertical className="h-3 w-3" /></Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={burndownData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="name" hide />
                            <YAxis hide domain={[0, 130]} />
                            <Tooltip />
                            <Line type="stepAfter" dataKey="ideal" stroke="#fb923c" strokeWidth={2} dot={false} />
                            <Line type="stepAfter" dataKey="actual" stroke="#6366f1" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

export function MiniChart({ data, dataKey, color }: { data: any[], dataKey: string, color: string }) {
    return (
        <div className="h-[50px] w-[100px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 2, fill: color }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export function BarChartMini({ data, dataKey, color }: { data: any[], dataKey: string, color: string }) {
    return (
        <div className="h-[50px] w-[100px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <Bar dataKey={dataKey} fill={color} radius={[2, 2, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
