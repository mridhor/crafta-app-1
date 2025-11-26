import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, ShieldAlert, ShieldCheck, Search } from 'lucide-react';

interface LogicLogItemProps {
    timestamp: string;
    ruleId: string;
    entity: string;
    decision: 'APPROVED' | 'BLOCKED' | 'QUARANTINED' | 'SHADOW_MODE' | 'ENRICHED' | 'FLAGGED';
    rationale: string;
    onClick?: () => void;
}

export function LogicLogItem({ timestamp, ruleId, entity, decision, rationale, onClick }: LogicLogItemProps) {
    const decisionStyles = {
        APPROVED: { color: 'text-green-700', bg: 'bg-green-50', icon: ShieldCheck },
        BLOCKED: { color: 'text-red-700', bg: 'bg-red-50', icon: ShieldAlert },
        QUARANTINED: { color: 'text-orange-700', bg: 'bg-orange-50', icon: Shield },
        SHADOW_MODE: { color: 'text-gray-600', bg: 'bg-gray-100', icon: Search },
        ENRICHED: { color: 'text-primary', bg: 'bg-primary/10', icon: Shield },
        FLAGGED: { color: 'text-amber-700', bg: 'bg-amber-50', icon: ShieldAlert },
    };

    const style = decisionStyles[decision] || decisionStyles.SHADOW_MODE;
    const Icon = style.icon;

    return (
        <div
            onClick={onClick}
            className="flex items-start gap-3 p-3 border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors text-sm font-mono"
        >
            <div className="shrink-0 text-xs text-muted-foreground w-20 pt-1">
                {new Date(timestamp).toLocaleTimeString([], { hour12: false })}
            </div>

            <div className={cn("shrink-0 w-6 h-6 rounded flex items-center justify-center", style.bg, style.color)}>
                <Icon className="w-3.5 h-3.5" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-foreground">{decision}</span>
                    <span className="px-1.5 py-0.5 rounded bg-secondary text-xs text-muted-foreground">{ruleId}</span>
                </div>
                <div className="text-foreground font-semibold truncate mb-0.5">{entity}</div>
                <div className="text-muted-foreground text-xs leading-relaxed truncate">
                    {rationale}
                </div>
            </div>
        </div>
    );
}
