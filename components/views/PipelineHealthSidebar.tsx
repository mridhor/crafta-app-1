import { TrendingUp, AlertTriangle, User, ArrowRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function PipelineHealthSidebar() {
    return (
        <div className="h-full flex flex-col bg-slate-50/50 border-r border-slate-100">
            {/* Pipeline Health Section */}
            <div className="p-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Pipeline Health</h3>
                <div className="space-y-4">
                    {/* Velocity Trend */}
                    <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">Velocity Up</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed pl-11">
                            Deals moving <span className="text-emerald-600 font-medium">15% faster</span> than last quarter.
                        </p>
                    </div>

                    {/* Risk Groups */}
                    <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                <AlertTriangle className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">Stalled Deals</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed pl-11 mb-2">
                            4 deals in Negotiation for {'>'} 14 days.
                        </p>
                        <div className="pl-11">
                            <Button variant="link" className="h-auto p-0 text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                                View Deals <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Owner Consistency */}
            <div className="p-5 border-t border-slate-100/50">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Owner Consistency</h3>
                <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-100">
                                JD
                            </div>
                            <span className="font-medium text-slate-700">John Doe</span>
                        </div>
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-xs">98%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center text-xs font-bold text-violet-600 border border-violet-100">
                                SA
                            </div>
                            <span className="font-medium text-slate-700">Sarah A.</span>
                        </div>
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-xs">95%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-xs font-bold text-amber-600 border border-amber-100">
                                MK
                            </div>
                            <span className="font-medium text-slate-700">Mike K.</span>
                        </div>
                        <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded text-xs">82%</span>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="p-5 border-t border-slate-100/50 flex-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Filters</h3>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm p-3 hover:bg-white hover:shadow-sm rounded-lg cursor-pointer transition-all border border-transparent hover:border-slate-100 group">
                        <span className="text-slate-600 font-medium group-hover:text-slate-900">Owner</span>
                        <span className="text-slate-400 text-xs bg-slate-100 px-2 py-0.5 rounded group-hover:bg-slate-200">All</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-3 hover:bg-white hover:shadow-sm rounded-lg cursor-pointer transition-all border border-transparent hover:border-slate-100 group">
                        <span className="text-slate-600 font-medium group-hover:text-slate-900">Region</span>
                        <span className="text-slate-400 text-xs bg-slate-100 px-2 py-0.5 rounded group-hover:bg-slate-200">North America</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-3 hover:bg-white hover:shadow-sm rounded-lg cursor-pointer transition-all border border-transparent hover:border-slate-100 group">
                        <span className="text-slate-600 font-medium group-hover:text-slate-900">Product</span>
                        <span className="text-slate-400 text-xs bg-slate-100 px-2 py-0.5 rounded group-hover:bg-slate-200">Enterprise</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
