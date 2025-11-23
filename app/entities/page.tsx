"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Clock, Mail, Phone, CheckCircle2, AlertCircle, FileText, Paperclip, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineEvents = [
    {
        id: 1,
        type: "email",
        title: "Email sent to John Doe",
        content: "Re: Proposal for Q4",
        time: "2 hours ago",
        user: "Me",
    },
    {
        id: 2,
        type: "call",
        title: "Call logged with Jane Smith",
        content: "Discussed pricing tiers. Client is concerned about implementation time.",
        time: "Yesterday",
        user: "Me",
    },
    {
        id: 3,
        type: "stage",
        title: "Stage changed to Negotiation",
        content: "Moved from Proposal",
        time: "2 days ago",
        user: "System",
    },
    {
        id: 4,
        type: "drift",
        title: "Stage Drift Alert",
        content: "Deal has been in Negotiation for 5 days (avg: 3 days)",
        time: "3 days ago",
        user: "System",
        isAlert: true,
    },
];

export default function EntityPage() {
    return (
        <PageLayout
            sidebar={
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Entity Navigation
                        </h3>
                        <nav className="space-y-1">
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md">
                                Timeline
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                Required Actions
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                Notes
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                Attachments
                            </button>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Related Records
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs">AC</div>
                                <div>
                                    <div className="font-medium">Acme Corp</div>
                                    <div className="text-xs text-gray-500">Company</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xs">JD</div>
                                <div>
                                    <div className="font-medium">John Doe</div>
                                    <div className="text-xs text-gray-500">Contact</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            rightPanel={
                <div className="space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">AI Summary</h4>
                        <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                            Deal is progressing but showing signs of drift in Negotiation stage. Key blocker appears to be legal review.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Suggested Next Steps
                        </h4>
                        <div className="space-y-2">
                            <button className="w-full text-left p-2 text-sm border border-gray-200 dark:border-gray-800 rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-start gap-2">
                                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-gray-100">Email Legal Team</div>
                                    <div className="text-xs text-gray-500">Ask for status update</div>
                                </div>
                            </button>
                            <button className="w-full text-left p-2 text-sm border border-gray-200 dark:border-gray-800 rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-start gap-2">
                                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-gray-100">Call John Doe</div>
                                    <div className="text-xs text-gray-500">Confirm timeline</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="h-full flex flex-col">
                {/* Header */}
                <div className="border-b border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-950">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Acme Corp Expansion</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">Deal • $50,000</span>
                                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">Negotiation</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Edit
                            </button>
                            <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                                Move Stage
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-green-500 w-1/5 h-full" />
                        <div className="bg-green-500 w-1/5 h-full border-l border-white dark:border-gray-950" />
                        <div className="bg-green-500 w-1/5 h-full border-l border-white dark:border-gray-950" />
                        <div className="bg-blue-500 w-1/5 h-full border-l border-white dark:border-gray-950" />
                        <div className="bg-gray-200 dark:bg-gray-700 w-1/5 h-full border-l border-white dark:border-gray-950" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Lead</span>
                        <span>Discovery</span>
                        <span>Proposal</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">Negotiation</span>
                        <span>Closed</span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-950/50">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Activity Timeline</h3>
                    <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
                        {timelineEvents.map((event) => (
                            <div key={event.id} className="relative pl-10">
                                <div className={cn(
                                    "absolute left-2 -translate-x-1/2 top-1 w-4 h-4 rounded-full border-2 bg-white dark:bg-gray-950 flex items-center justify-center",
                                    event.isAlert ? "border-red-500" : "border-blue-500"
                                )}>
                                    {event.isAlert && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                                </div>

                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            {event.type === 'email' && <Mail className="w-4 h-4 text-gray-400" />}
                                            {event.type === 'call' && <Phone className="w-4 h-4 text-gray-400" />}
                                            {event.type === 'stage' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                            {event.type === 'drift' && <AlertCircle className="w-4 h-4 text-red-500" />}
                                            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{event.title}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{event.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.content}</p>
                                    <div className="mt-2 text-xs text-gray-400">
                                        by {event.user}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
