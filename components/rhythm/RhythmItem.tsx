"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";
import { Check, Clock, AlertTriangle, ArrowRight, Mail, Phone, Calendar } from "lucide-react";
import { useState } from "react";

interface RhythmItemProps {
    item: any;
    onComplete: (id: string) => void;
}

export function RhythmItem({ item, onComplete }: RhythmItemProps) {
    const [isCompleting, setIsCompleting] = useState(false);

    const handleComplete = async () => {
        setIsCompleting(true);
        await onComplete(item.id);
        setIsCompleting(false);
    };

    const getActionIcon = (type: string) => {
        switch (type) {
            case "email": return <Mail className="w-4 h-4" />;
            case "call": return <Phone className="w-4 h-4" />;
            case "meeting": return <Calendar className="w-4 h-4" />;
            default: return <ArrowRight className="w-4 h-4" />;
        }
    };

    return (
        <Card className="group hover:border-primary/50 transition-colors">
            <CardContent className="p-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px] uppercase">
                            {item.action_type}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(item.due_date)}
                        </span>
                        {item.priority_score > 80 && (
                            <Badge variant="destructive" className="text-[10px] uppercase">
                                High Priority
                            </Badge>
                        )}
                    </div>

                    <h3 className="font-medium text-base mb-1">{item.title}</h3>

                    {item.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {item.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {item.deal && (
                            <div className="flex items-center gap-1">
                                <span className="font-medium text-foreground">{item.deal.name}</span>
                                <span>•</span>
                                <span>{formatCurrency(item.deal.value)}</span>
                            </div>
                        )}
                        {item.contact && (
                            <div className="flex items-center gap-1">
                                <Avatar className="w-4 h-4">
                                    <AvatarFallback className="text-[8px]">{item.contact.first_name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{item.contact.first_name} {item.contact.last_name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        size="sm"
                        className="w-full"
                        onClick={handleComplete}
                        disabled={isCompleting}
                    >
                        {isCompleting ? "..." : <Check className="w-4 h-4 mr-2" />}
                        Complete
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                        Snooze
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
