"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DealsTable } from "@/components/entities/DealsTable";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Plus, Filter } from "lucide-react";

export default function EntitiesPage() {
    const [view, setView] = useState<"deals" | "companies" | "contacts">("deals");
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Entities</h1>
                    <p className="text-muted-foreground">Manage your deals, companies, and contacts.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add {view === "deals" ? "Deal" : view === "companies" ? "Company" : "Contact"}
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                    <button
                        onClick={() => setView("deals")}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === "deals" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Deals
                    </button>
                    <button
                        onClick={() => setView("companies")}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === "companies" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Companies
                    </button>
                    <button
                        onClick={() => setView("contacts")}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === "contacts" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Contacts
                    </button>
                </div>

                <div className="flex-1 max-w-sm relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search entities..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                </Button>
            </div>

            {view === "deals" && <DealsTable search={search} />}
            {/* Placeholders for other tables */}
            {view === "companies" && <div className="p-8 text-center text-muted-foreground">Companies Table Coming Soon</div>}
            {view === "contacts" && <div className="p-8 text-center text-muted-foreground">Contacts Table Coming Soon</div>}
        </div>
    );
}
