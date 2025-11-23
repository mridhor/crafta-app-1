"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Send, Plus, MoreHorizontal, MessageSquare, Mic } from "lucide-react";

export default function CanvasPage() {
    return (
        <PageLayout
            sidebar={
                <div className="flex flex-col h-full">
                    <div className="mb-4">
                        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus className="w-4 h-4" />
                            New Session
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto -mx-2 px-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Recent Chats
                        </h3>
                        <div className="space-y-1">
                            <button className="w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md group">
                                <div className="font-medium truncate">Why are demos stalling?</div>
                                <div className="text-xs text-gray-500 truncate">Analysis of Q4 pipeline...</div>
                            </button>
                            <button className="w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md group">
                                <div className="font-medium truncate">Draft follow-up for Acme</div>
                                <div className="text-xs text-gray-500 truncate">Using the new template...</div>
                            </button>
                            <button className="w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md group">
                                <div className="font-medium truncate">QBR Preparation</div>
                                <div className="text-xs text-gray-500 truncate">Gathering usage stats...</div>
                            </button>
                        </div>
                    </div>
                </div>
            }
            rightPanel={
                <div className="space-y-6">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                        <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">Canvas Insights</h4>
                        <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
                            Based on your whiteboard, I recommend focusing on the {"Negotiation"} stage drift. 3 deals are at risk.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Related Context
                        </h4>
                        <div className="space-y-2">
                            <div className="p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm">
                                <div className="font-medium">Acme Corp Deal</div>
                                <div className="text-xs text-gray-500">Mentioned in chat</div>
                            </div>
                            <div className="p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm">
                                <div className="font-medium">Q4 Goals</div>
                                <div className="text-xs text-gray-500">Reference doc</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900/50">
                {/* Canvas Toolbar */}
                <div className="h-12 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100">Untitled Session</h1>
                        <span className="text-xs text-gray-400">Edited just now</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Main Canvas Area (Placeholder) */}
                <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
                    <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(0,1fr))] grid-rows-[repeat(40,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
                        {/* Dot grid pattern simulation */}
                        {Array.from({ length: 1600 }).map((_, i) => (
                            <div key={i} className="w-0.5 h-0.5 bg-black rounded-full" />
                        ))}
                    </div>

                    <div className="max-w-2xl w-full text-center space-y-6">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            What would you like to explore?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                            Ask questions about your pipeline, drag entities here to analyze, or start a strategy session.
                        </p>

                        <div className="relative max-w-lg mx-auto">
                            <input
                                type="text"
                                placeholder="Ask anything..."
                                className="w-full h-12 pl-4 pr-12 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-950"
                            />
                            <div className="absolute right-2 top-2 flex items-center gap-1">
                                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                    <Mic className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Analyze Q4 Pipeline
                            </button>
                            <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Why is deal X stalled?
                            </button>
                            <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Draft email to John
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
