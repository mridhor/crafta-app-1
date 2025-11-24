"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    MoreHorizontal,
    Edit,
    Link as LinkIcon,
    Tag,
    Building2,
    Calendar
} from "lucide-react";
import { useView } from "@/components/providers/ViewContext";
import { EntityTimeline, TimelineEvent } from "./EntityTimeline";
import { AIContextPanel } from "./AIContextPanel";

// Mock Data for Contact
const mockContact = {
    id: 201,
    name: "John Doe",
    role: "Chief Technology Officer",
    company: "Acme Corp",
    email: "john.doe@acme.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    lifecycleStage: "Champion",
    tags: ["Warm", "Decision Maker", "Tech Savvy"],
    lastInteraction: "2 hours ago"
};

const mockEvents: TimelineEvent[] = [
    {
        id: "1",
        type: "email",
        title: "Email sent: Q4 Roadmap Review",
        description: "Sent the updated roadmap as requested. Highlighted the API integration features.",
        date: "2 hours ago",
        author: "Me"
    },
    {
        id: "2",
        type: "call",
        title: "Call with John Doe",
        description: "Discussed technical requirements for the new security module. John is concerned about latency.",
        date: "Yesterday",
        author: "Me"
    },
    {
        id: "3",
        type: "ai_insight",
        title: "Buying Signal Detected",
        description: "John mentioned 'budget allocation' in the last call, increasing probability of Q4 close.",
        date: "Yesterday",
        author: "System"
    },
    {
        id: "4",
        type: "meeting",
        title: "Meeting: Technical Deep Dive",
        description: "Zoom meeting with engineering team.",
        date: "3 days ago",
        author: "Me"
    }
];

export function ContactDetails() {
    const { setActiveView } = useView();
    const [contact, setContact] = useState(mockContact);

    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground mb-4 pl-0 hover:bg-transparent hover:text-foreground"
                    onClick={() => setActiveView("entities")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Entities
                </Button>

                {/* Contact Profile Card */}
                <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                        {contact.name.substring(0, 2).toUpperCase()}
                    </div>
                    <h2 className="font-bold text-lg">{contact.name}</h2>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                    <div className="flex items-center justify-center gap-2 mt-1 text-sm text-blue-600 font-medium">
                        <Building2 className="w-3 h-3" />
                        {contact.company}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    <Button variant="outline" size="sm" className="h-9">
                        <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-9">
                        <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-9">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span className="truncate text-foreground">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="w-4 h-4 shrink-0" />
                        <span className="text-foreground">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="text-foreground">{contact.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Linkedin className="w-4 h-4 shrink-0" />
                        <a href="#" className="text-blue-600 hover:underline">LinkedIn Profile</a>
                    </div>
                </div>

                <div className="h-px bg-border my-6" />

                {/* Tags */}
                <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {contact.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground border border-border">
                                {tag}
                            </span>
                        ))}
                        <button className="px-2 py-1 rounded-md border border-dashed border-muted-foreground/50 text-xs text-muted-foreground hover:bg-secondary/50">
                            + Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="p-6 max-w-6xl mx-auto grid grid-cols-3 gap-6">
                {/* Center Column: Timeline & Activity */}
                <div className="col-span-2 space-y-6">
                    {/* Associations / Related */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 hover:bg-muted/30 cursor-pointer transition-colors">
                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Active Deal</div>
                            <div className="font-medium">Acme Expansion</div>
                            <div className="text-sm text-green-600 mt-1">$50,000 • Negotiation</div>
                        </Card>
                        <Card className="p-4 hover:bg-muted/30 cursor-pointer transition-colors">
                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Last Meeting</div>
                            <div className="font-medium">Technical Deep Dive</div>
                            <div className="text-sm text-muted-foreground mt-1">3 days ago</div>
                        </Card>
                    </div>

                    <EntityTimeline
                        events={mockEvents}
                        onExplain={(id) => console.log("Explain event", id)}
                    />
                </div>

                {/* Right Column: AI Context */}
                <div className="space-y-6">
                    <AIContextPanel
                        entityType="contact"
                        insights={{
                            summary: "John is a strong champion. High engagement in the last 2 weeks. Concerns about latency need addressing to unlock the deal.",
                            riskLevel: "Low",
                            nextSteps: [
                                "Send latency benchmark report",
                                "Schedule follow-up with Engineering Lead",
                                "Draft proposal for security module"
                            ]
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
