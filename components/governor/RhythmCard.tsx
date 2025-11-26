import React from 'react';
import { Card } from '@/components/ui/Card';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RhythmCardProps {
    title: string;
    metric: string;
    status: 'healthy' | 'warning' | 'breach';
    trend?: 'up' | 'down' | 'stable';
    count?: number;
}

export function RhythmCard({ title, metric, status, trend, count }: RhythmCardProps) {
    const statusColors = {
        healthy: 'bg-green-50 border-green-200 text-green-700',
        warning: 'bg-amber-50 border-amber-200 text-amber-700',
        breach: 'bg-red-50 border-red-200 text-red-700',
    };

    const iconColors = {
        healthy: 'text-green-600',
        warning: 'text-amber-600',
        breach: 'text-red-600',
    };

    return (
        <Card className={cn("p-4 border-l-4 transition-all hover:shadow-md", statusColors[status])}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-sm uppercase tracking-wider opacity-80">{title}</h3>
                {status === 'healthy' && <CheckCircle2 className={cn("w-5 h-5", iconColors[status])} />}
                {status === 'warning' && <Clock className={cn("w-5 h-5", iconColors[status])} />}
                {status === 'breach' && <AlertTriangle className={cn("w-5 h-5", iconColors[status])} />}
            </div>

            <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{metric}</span>
                {count !== undefined && (
                    <span className="text-sm font-medium opacity-80 mb-1">
                        ({count} items)
                    </span>
                )}
            </div>

            <div className="mt-2 text-xs font-medium opacity-75">
                {status === 'healthy' && "Within SLA Targets"}
                {status === 'warning' && "Trending towards breach"}
                {status === 'breach' && "Action Required Immediately"}
            </div>
        </Card>
    );
}
