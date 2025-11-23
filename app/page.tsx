"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { RhythmCard, RhythmCardProps } from "@/components/rhythm/RhythmCard";
import { Filter, ChevronDown, Plus } from "lucide-react";

const mockCards: RhythmCardProps[] = [
  {
    id: "1",
    title: "Follow-up overdue by 1 day",
    entityName: "Acme Corp",
    entityContext: "John Doe",
    value: "$50k",
    stage: "Proposal",
    urgency: "high",
    decayTime: "4 hours",
    driftDays: 3,
    aiRecommendation: "Send follow-up referencing last meeting on Tuesday.",
  },
  {
    id: "2",
    title: "Contract review pending",
    entityName: "Globex Inc",
    entityContext: "Jane Smith",
    value: "$120k",
    stage: "Negotiation",
    urgency: "medium",
    driftDays: 1,
    aiRecommendation: "Check legal team status.",
  },
  {
    id: "3",
    title: "New lead assigned",
    entityName: "Stark Industries",
    entityContext: "Tony Stark",
    urgency: "low",
    aiRecommendation: "Schedule initial discovery call.",
  },
  {
    id: "4",
    title: "Quarterly Business Review",
    entityName: "Wayne Enterprises",
    entityContext: "Bruce Wayne",
    value: "$200k",
    stage: "Renewal",
    urgency: "medium",
    decayTime: "2 days",
    aiRecommendation: "Prepare QBR deck based on usage data.",
  },
];

export default function Home() {
  return (
    <PageLayout
      sidebar={
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Views
            </h3>
            <div className="space-y-1">
              <button className="w-full text-left px-2 py-1.5 text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md">
                Today's Rhythm
              </button>
              <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                Urgent Items
              </button>
              <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                My Pipeline
              </button>
              <button className="w-full text-left px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                Team Items
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center justify-between">
              Filters
              <Filter className="w-3 h-3" />
            </h3>
            <div className="space-y-3">
              {/* Mock Filters */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Owner</label>
                <div className="flex items-center justify-between px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-sm">
                  <span>Me</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Pipeline</label>
                <div className="flex items-center justify-between px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-sm">
                  <span>All Pipelines</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Rhythm Stack</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You have {mockCards.length} items requiring attention today.
            </p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        <div className="space-y-4">
          {mockCards.map((card) => (
            <RhythmCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}