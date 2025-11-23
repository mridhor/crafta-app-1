"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Database, GitBranch, Activity, Clock, Globe, Shield, FileText, Lock, Users, Code, CreditCard, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

// Import Settings Components
import { CrioMapping } from "./settings/CrioMapping";
import { RoutingRules } from "./settings/RoutingRules";
import { LifecycleRules } from "./settings/LifecycleRules";
import { SlaConfiguration } from "./settings/SlaConfiguration";
import { Integrations } from "./settings/Integrations";
import { AccessControl } from "./settings/AccessControl";
import { AuditLog } from "./settings/AuditLog";
import { GovernanceStandards } from "./settings/GovernanceStandards";
import { PartnerWorkspace } from "./settings/PartnerWorkspace";
import { EnvironmentKeys } from "./settings/EnvironmentKeys";
import { BillingSubscription } from "./settings/BillingSubscription";
import { Branding } from "./settings/Branding";

export function SettingsView() {
    const [activeTab, setActiveTab] = useState("crio");

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
        { id: "environment", label: "Environment & API Keys", icon: Code },
        { id: "billing", label: "Billing & Subscription", icon: CreditCard },
        { id: "branding", label: "Branding", icon: Palette },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "crio": return <CrioMapping />;
            case "routing": return <RoutingRules />;
            case "lifecycle": return <LifecycleRules />;
            case "sla": return <SlaConfiguration />;
            case "integrations": return <Integrations />;
            case "access": return <AccessControl />;
            case "audit": return <AuditLog />;
            case "governance": return <GovernanceStandards />;
            case "partner": return <PartnerWorkspace />;
            case "environment": return <EnvironmentKeys />;
            case "billing": return <BillingSubscription />;
            case "branding": return <Branding />;
            default: return <CrioMapping />;
        }
    };

    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Settings</h3>
                <nav className="space-y-1">
                    {tabs.map((tab) => (
                        <Button
                            key={tab.id}
                            variant="ghost"
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full justify-start text-sm gap-3",
                                activeTab === tab.id
                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-blue-600 dark:text-blue-400" : "")} />
                            {tab.label}
                        </Button>
                    ))}
                </nav>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="p-8 max-w-5xl mx-auto">
                {renderContent()}
            </div>
        </AppLayout>
    );
}
