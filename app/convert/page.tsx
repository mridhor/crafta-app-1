"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Filter, AlertTriangle, CheckCircle, XCircle, ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const intakeItems = [
    {
        id: 1,
        source: "Web Form",
        submittedAt: "10 mins ago",
        status: "Warning",
        issues: "Missing Phone",
        confidence: "85%",
        owner: "Unassigned",
    },
    {
        id: 2,
        source: "Email Parser",
        submittedAt: "1 hour ago",
        status: "Failed",
        issues: "Invalid Domain",
        confidence: "40%",
        owner: "-",
    },
    {
        id: 3,
        source: "LinkedIn",
        submittedAt: "2 hours ago",
        status: "Ready",
        issues: "None",
        confidence: "98%",
        owner: "John Doe",
    },
    {
        id: 4,
        source: "API Upload",
        submittedAt: "Yesterday",
        status: "Warning",
        issues: "Duplicate?",
        confidence: "70%",
        owner: "Jane Smith",
    },
];

export default function ConvertPage() {
    return (
        <PageLayout
            sidebar={
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Queues
                        </h3>
                        <nav className="space-y-1">
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md flex justify-between">
                                <span>Quarantine</span>
                                <span className="bg-red-100 dark:bg-red-900/50 px-1.5 rounded text-xs">12</span>
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex justify-between">
                                <span>Warnings</span>
                                <span className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded text-xs">5</span>
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                Approved
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                Rejected
                            </button>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                            Filters
                            <Filter className="w-3 h-3" />
                        </h3>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Source</label>
                                <select className="w-full text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2 py-1.5">
                                    <option>All Sources</option>
                                    <option>Web Form</option>
                                    <option>Email</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <RefreshCw className="w-6 h-6 text-blue-600" />
                            Convert Intake Hub
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Review and validate incoming data before it enters CRM.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Mapping Validator
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            CRIO Validator
                        </button>
                    </div>
                </div>

                {/* Main Table */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-950/50 border-b border-gray-200 dark:border-gray-800 text-gray-500 font-medium">
                            <tr>
                                <th className="px-4 py-3">Source</th>
                                <th className="px-4 py-3">Submitted</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Issues</th>
                                <th className="px-4 py-3">Confidence</th>
                                <th className="px-4 py-3">Suggested Owner</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {intakeItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{item.source}</td>
                                    <td className="px-4 py-3 text-gray-500">{item.submittedAt}</td>
                                    <td className="px-4 py-3">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
                                            item.status === "Ready" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                item.status === "Warning" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        )}>
                                            {item.status === "Ready" && <CheckCircle className="w-3 h-3" />}
                                            {item.status === "Warning" && <AlertTriangle className="w-3 h-3" />}
                                            {item.status === "Failed" && <XCircle className="w-3 h-3" />}
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{item.issues}</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{item.confidence}</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{item.owner}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-xs">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageLayout>
    );
}
