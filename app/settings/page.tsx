"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Settings, Database, GitBranch, Clock, Shield, Activity, Users, CreditCard, Code, Globe, Lock } from "lucide-react";

const tabs = [
    { id: "crio", label: "CRIO Mapping", icon: Database },
    { id: "routing", label: "Routing Rules", icon: GitBranch },
    { id: "lifecycle", label: "Lifecycle Rules", icon: Activity },
    { id: "sla", label: "SLA Configuration", icon: Clock },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "access", label: "Access Control", icon: Shield },
    { id: "audit", label: "Audit Log", icon: FileText },
    { id: "governance", label: "Governance Standards", icon: Lock },
    { id: "partner", label: "Partner Workspace", icon: Users },
    { id: "api", label: "Environment & API Keys", icon: Code },
    { id: "billing", label: "Billing & Subscription", icon: CreditCard },
];

import { FileText } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("crio");

    return (
        <PageLayout
            sidebar={
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Settings
                        </h3>
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "w-full text-left px-2 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-colors",
                                        activeTab === tab.id
                                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    )}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            }
        >
            <div className="p-8 max-w-4xl">
                <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        {tabs.find(t => t.id === activeTab)?.icon && (
                            <span className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-md">
                                {(() => {
                                    const Icon = tabs.find(t => t.id === activeTab)?.icon;
                                    return Icon ? <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" /> : null;
                                })()}
                            </span>
                        )}
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage your workspace configuration and preferences.
                    </p>
                </div>

                {/* Content Area Placeholder */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 min-h-[400px]">
                    {activeTab === "crio" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">CRIO Schema Mapping</h3>
                                <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                                    Validate Mapping
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="border border-gray-200 dark:border-gray-800 rounded-md p-4 bg-gray-50 dark:bg-gray-950/50">
                                    <h4 className="font-medium mb-4 text-sm text-gray-500 uppercase">CRIO Fields</h4>
                                    <div className="space-y-2">
                                        <div className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-sm">deal_value</div>
                                        <div className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-sm">close_date</div>
                                        <div className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-sm">stage_name</div>
                                    </div>
                                </div>
                                <div className="border border-gray-200 dark:border-gray-800 rounded-md p-4 bg-gray-50 dark:bg-gray-950/50">
                                    <h4 className="font-medium mb-4 text-sm text-gray-500 uppercase">CRM Fields (HubSpot)</h4>
                                    <div className="space-y-2">
                                        <div className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-sm border-dashed border-blue-300">amount</div>
                                        <div className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-sm border-dashed border-blue-300">closedate</div>
                                        <div className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-sm border-dashed border-blue-300">dealstage</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "integrations" && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center text-white font-bold">HS</div>
                                    <div>
                                        <div className="font-medium">HubSpot</div>
                                        <div className="text-sm text-gray-500">Connected • Last sync 5m ago</div>
                                    </div>
                                </div>
                                <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                                    Configure
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg opacity-60">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white font-bold">SF</div>
                                    <div>
                                        <div className="font-medium">Salesforce</div>
                                        <div className="text-sm text-gray-500">Not Connected</div>
                                    </div>
                                </div>
                                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                                    Connect
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Default placeholder for other tabs */}
                    {activeTab !== "crio" && activeTab !== "integrations" && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <Settings className="w-12 h-12 mb-4 opacity-20" />
                            <p>Configuration for {tabs.find(t => t.id === activeTab)?.label} goes here.</p>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
