"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounce search would be ideal here, but for MVP direct query is fine
    const { data: results, isLoading } = useQuery({
        queryKey: ["global-search", query],
        queryFn: async () => {
            if (!query) return null;
            // In a real app, this would hit a dedicated search endpoint
            // For MVP, we'll mock hitting the entities endpoints
            const [deals, companies, contacts] = await Promise.all([
                fetch(`/api/deals?search=${query}`).then(r => r.json()),
                fetch(`/api/companies?search=${query}`).then(r => r.json()),
                fetch(`/api/contacts?search=${query}`).then(r => r.json())
            ]);
            return { deals, companies, contacts };
        },
        enabled: query.length > 2
    });

    const handleSelect = (path: string) => {
        setIsOpen(false);
        setQuery("");
        router.push(path);
    };

    return (
        <div className="relative w-64 hidden md:block" ref={wrapperRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 bg-secondary/50"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
            />

            {isOpen && query.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-lg p-2 z-50 max-h-[400px] overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-4 text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Searching...
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {results?.deals && results.deals.length > 0 && (
                                <div>
                                    <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5 uppercase">Deals</div>
                                    {results.deals.map((deal: any) => (
                                        <div
                                            key={deal.id}
                                            className="px-2 py-1.5 hover:bg-muted rounded text-sm cursor-pointer"
                                            onClick={() => handleSelect(`/entities/deals/${deal.id}`)}
                                        >
                                            <div className="font-medium">{deal.name}</div>
                                            <div className="text-xs text-muted-foreground">{deal.company?.name}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results?.companies && results.companies.length > 0 && (
                                <div>
                                    <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5 uppercase">Companies</div>
                                    {results.companies.map((company: any) => (
                                        <div
                                            key={company.id}
                                            className="px-2 py-1.5 hover:bg-muted rounded text-sm cursor-pointer"
                                            onClick={() => handleSelect(`/entities?view=companies&id=${company.id}`)}
                                        >
                                            <div className="font-medium">{company.name}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {(!results?.deals?.length && !results?.companies?.length && !results?.contacts?.length) && (
                                <div className="p-2 text-sm text-muted-foreground text-center">
                                    No results found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
