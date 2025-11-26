"use client";

import {
    Database,
    GitBranch,
    Activity,
    Clock,
    Globe,
    Shield,
    FileText,
    Lock,
    Users,
    Code,
    CreditCard,
    Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsSidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const items = [
    { id: "crio-mapping", label: "CRIO Mapping", icon: Database },
    { id: "routing-rules", label: "Routing Rules", icon: GitBranch },
    { id: "lifecycle-rules", label: "Lifecycle Rules", icon: Activity },
    { id: "sla-configuration", label: "SLA Configuration", icon: Clock },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "access-control", label: "Access Control", icon: Shield },
    { id: "audit-log", label: "Audit Log", icon: FileText },
    { id: "governance", label: "Governance Standards", icon: Lock },
    { id: "partner", label: "Partner Workspace", icon: Users },
    { id: "environment", label: "Environment & API Keys", icon: Code },
    { id: "billing", label: "Billing & Subscription", icon: CreditCard },
    { id: "branding", label: "Branding", icon: Palette },
];

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
    return (
        <nav className="flex flex-col space-y-1 w-64 pr-8">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors text-left",
                        activeTab === item.id
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                </button>
            ))}
        </nav>
    );
}
