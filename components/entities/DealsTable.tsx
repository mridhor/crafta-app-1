"use client";

import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface DealsTableProps {
    search: string;
}

export function DealsTable({ search }: DealsTableProps) {
    const { data: deals, isLoading } = useQuery({
        queryKey: ["deals", search],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            const res = await fetch(`/api/deals?${params}`);
            return res.json();
        }
    });

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading deals...</div>;
    }

    if (!Array.isArray(deals)) {
        return <div className="p-8 text-center text-red-500">Error loading deals.</div>;
    }

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Deal Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Last Interaction</TableHead>
                        <TableHead>Risk</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deals?.map((deal: any) => (
                        <TableRow key={deal.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-medium">
                                <Link href={`/entities/deals/${deal.id}`} className="hover:underline">
                                    {deal.name}
                                </Link>
                                {deal.risk_level === "high" && (
                                    <AlertTriangle className="w-4 h-4 text-destructive inline-block ml-2" />
                                )}
                            </TableCell>
                            <TableCell>{deal.company?.name || "-"}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="capitalize">
                                    {deal.stage.replace("_", " ")}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatCurrency(deal.value)}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage src={deal.owner?.avatar_url} />
                                        <AvatarFallback>{deal.owner?.full_name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{deal.owner?.full_name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{formatTimeAgo(deal.updated_at)}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={deal.risk_level === "high" ? "destructive" : deal.risk_level === "medium" ? "secondary" : "default"}
                                    className="uppercase text-[10px]"
                                >
                                    {deal.risk_level}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
