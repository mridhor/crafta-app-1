"use client";

import { useState } from "react";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { WorkspaceSettings } from "@/components/settings/WorkspaceSettings";
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { CrioMapping } from "@/components/settings/CrioMapping";
import { RoutingRules } from "@/components/settings/RoutingRules";
import { LifecycleRules } from "@/components/settings/LifecycleRules";
import { SlaConfiguration } from "@/components/settings/SlaConfiguration";
import { AccessControl } from "@/components/settings/AccessControl";
import { AuditLog } from "@/components/settings/AuditLog";
import { GovernanceSettings } from "@/components/settings/GovernanceSettings";
import { PartnerSettings } from "@/components/settings/PartnerSettings";
import { EnvironmentSettings } from "@/components/settings/EnvironmentSettings";
import { BrandingSettings } from "@/components/settings/BrandingSettings";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("crio-mapping");

    const renderContent = () => {
        switch (activeTab) {
            case "crio-mapping": return <CrioMapping />;
            case "routing-rules": return <RoutingRules />;
            case "lifecycle-rules": return <LifecycleRules />;
            case "sla-configuration": return <SlaConfiguration />;
            case "integrations": return <IntegrationsSettings />;
            case "access-control": return <AccessControl />;
            case "audit-log": return <AuditLog />;
            case "governance": return <GovernanceSettings />;
            case "partner": return <PartnerSettings />;
            case "environment": return <EnvironmentSettings />;
            case "billing": return <BillingSettings />;
            case "branding": return <BrandingSettings />;
            default: return <CrioMapping />;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2 mb-6">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                </div>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
