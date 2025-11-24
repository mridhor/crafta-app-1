import { TrendingUp, AlertTriangle, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function PipelineHealthSidebar() {
    return (
        <div className="h-full flex flex-col">
            {/* Pipeline Health Section */}
            <div className="p-4 border-b border-border">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Pipeline Health</h3>
                <div className="space-y-4">
                    {/* Velocity Trend */}
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md dark:bg-green-900/20 dark:border-green-900">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900 dark:text-green-100">Velocity Up</span>
                        </div>
                        <p className="text-xs text-green-700 dark:text-green-300">
                            Deals moving 15% faster than last quarter.
                        </p>
                    </div>

                    {/* Risk Groups */}
                    <div className="p-3 bg-orange-50 border border-orange-100 rounded-md dark:bg-orange-900/20 dark:border-orange-900">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium text-orange-900 dark:text-orange-100">Stalled Deals</span>
                        </div>
                        <p className="text-xs text-orange-700 dark:text-orange-300">
                            4 deals in Negotiation for {'>'} 14 days.
                        </p>
                        <Button variant="link" className="h-auto p-0 text-xs text-orange-800 mt-2 hover:text-orange-900">
                            View Deals <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Owner Consistency */}
            <div className="p-4 border-b border-border">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Owner Consistency</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
                                JD
                            </div>
                            <span>John Doe</span>
                        </div>
                        <span className="text-green-600 font-medium">98%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-700">
                                SA
                            </div>
                            <span>Sarah A.</span>
                        </div>
                        <span className="text-green-600 font-medium">95%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-xs font-medium text-yellow-700">
                                MK
                            </div>
                            <span>Mike K.</span>
                        </div>
                        <span className="text-orange-500 font-medium">82%</span>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="p-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Filters</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm p-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
                        <span>Owner</span>
                        <span className="text-muted-foreground">All</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
                        <span>Region</span>
                        <span className="text-muted-foreground">North America</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
                        <span>Product</span>
                        <span className="text-muted-foreground">Enterprise</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
