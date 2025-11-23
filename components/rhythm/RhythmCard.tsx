import { cn } from "@/lib/utils";
import { Clock, AlertCircle, Mail, Phone, ArrowRight, MoreHorizontal } from "lucide-react";

export interface RhythmCardProps {
    id: string;
    title: string;
    entityName: string;
    entityContext: string;
    value?: string;
    stage?: string;
    urgency: "high" | "medium" | "low";
    decayTime?: string;
    driftDays?: number;
    aiRecommendation?: string;
    onAction?: (action: string) => void;
}

export function RhythmCard({
    title,
    entityName,
    entityContext,
    value,
    stage,
    urgency,
    decayTime,
    driftDays,
    aiRecommendation,
}: RhythmCardProps) {
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {/* Urgency Indicator */}
            <div
                className={cn(
                    "absolute left-0 top-0 bottom-0 w-1",
                    urgency === "high" ? "bg-red-500" : urgency === "medium" ? "bg-yellow-500" : "bg-blue-500"
                )}
            />

            <div className="flex justify-between items-start mb-2 pl-2">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        {urgency === "high" && <AlertCircle className="w-4 h-4 text-red-500" />}
                        {title}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {entityName} • {entityContext}
                    </div>
                </div>
                <div className="text-right">
                    {value && <div className="font-medium text-gray-900 dark:text-gray-100">{value}</div>}
                    {stage && <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full mt-1 inline-block">{stage}</div>}
                </div>
            </div>

            {/* Temporal Signals */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3 pl-2">
                {decayTime && (
                    <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <Clock className="w-3 h-3" />
                        <span>Decay in {decayTime}</span>
                    </div>
                )}
                {driftDays && driftDays > 0 && (
                    <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                        <span>Stage drift +{driftDays} days</span>
                    </div>
                )}
            </div>

            {/* AI Recommendation */}
            {aiRecommendation && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md mb-3 ml-2 border border-blue-100 dark:border-blue-800">
                    <div className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">AI Recommendation</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">{aiRecommendation}</div>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pl-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                    Email
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    Call
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                    Move
                </button>
                <div className="flex-1" />
                <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
