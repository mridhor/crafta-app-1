"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatTimeAgo } from "@/lib/utils";
import { Check, X, Mail, Globe, MessageSquare, AlertCircle } from "lucide-react";
import { useState } from "react";

interface IntakeItemProps {
    item: any;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

export function IntakeItem({ item, onApprove, onReject }: IntakeItemProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAction = async (action: "approve" | "reject") => {
        setIsProcessing(true);
        if (action === "approve") await onApprove(item.id);
        else await onReject(item.id);
        setIsProcessing(false);
    };

    const getSourceIcon = (source: string) => {
        switch (source) {
            case "email": return <Mail className="w-4 h-4" />;
            case "web_form": return <Globe className="w-4 h-4" />;
            case "chat": return <MessageSquare className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    return (
        <Card className="group hover:border-primary/50 transition-colors">
            <CardContent className="p-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px] uppercase flex items-center gap-1">
                            {getSourceIcon(item.source)}
                            {item.source.replace("_", " ")}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            {formatTimeAgo(item.created_at)}
                        </span>
                        {item.confidence_score > 80 && (
                            <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                High Confidence
                            </Badge>
                        )}
                    </div>

                    <h3 className="font-medium text-base mb-1">{item.payload?.subject || "New Inquiry"}</h3>

                    <div className="text-sm text-muted-foreground mb-3">
                        <p className="line-clamp-2">{item.payload?.body || item.payload?.message || "No content"}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground bg-muted/30 p-2 rounded-md">
                        <div>
                            <span className="font-medium">From:</span> {item.payload?.from_email || item.payload?.email || "Unknown"}
                        </div>
                        {item.payload?.company && (
                            <div>
                                <span className="font-medium">Company:</span> {item.payload.company}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleAction("approve")}
                        disabled={isProcessing}
                    >
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        className="w-full"
                        onClick={() => handleAction("reject")}
                        disabled={isProcessing}
                    >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
