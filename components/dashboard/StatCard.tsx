import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowUpRight, ArrowDownRight, MoreVertical, Edit2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: {
        value: string;
        isPositive: boolean;
        label: string;
    };
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export function StatCard({ title, value, trend, icon, children, className }: StatCardProps) {
    return (
        <Card className={cn("relative", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                    {icon && <div className="text-muted-foreground">{icon}</div>}
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {title}
                    </CardTitle>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                        <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                        <Maximize2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                        <MoreVertical className="h-3 w-3" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <div className="flex items-center text-xs mt-1">
                        <span
                            className={cn(
                                "flex items-center font-medium",
                                trend.isPositive ? "text-green-500" : "text-red-500"
                            )}
                        >
                            {trend.isPositive ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {trend.value}
                        </span>
                        <span className="text-muted-foreground ml-1">({trend.label})</span>
                    </div>
                )}
                {children}
            </CardContent>
        </Card>
    );
}
