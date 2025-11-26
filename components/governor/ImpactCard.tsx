import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Zap } from 'lucide-react';

interface ImpactCardProps {
    title: string;
    description: string;
    impactValue: string;
    actionLabel: string;
    onAction: () => void;
}

export function ImpactCard({ title, description, impactValue, actionLabel, onAction }: ImpactCardProps) {
    return (
        <Card className="p-5 border border-border hover:border-primary/50 transition-colors group">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Zap className="w-5 h-5" />
                </div>
                <div className="text-right">
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Potential Impact</div>
                    <div className="text-lg font-bold text-foreground">{impactValue}</div>
                </div>
            </div>

            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {description}
            </p>

            <Button
                onClick={onAction}
                className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-all"
                variant="outline"
            >
                {actionLabel}
                <ArrowRight className="w-4 h-4" />
            </Button>
        </Card>
    );
}
