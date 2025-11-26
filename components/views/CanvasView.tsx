"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import {
    Network,
    ZoomIn,
    ZoomOut,
    Move,
    Layers,
    Share2,
    MoreHorizontal,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Revenue Graph (Fallback)
const initialNodes = [
    { id: 1, label: "Acme Corp", type: "company", x: 400, y: 300 },
    { id: 2, label: "Alice Johnson", type: "contact", x: 250, y: 200 },
    { id: 3, label: "Deal: Q3 Expansion", type: "deal", x: 550, y: 200 },
    { id: 4, label: "Bob Smith", type: "contact", x: 250, y: 400 },
    { id: 5, label: "Email: Pricing", type: "action", x: 100, y: 150 },
];

const initialEdges = [
    { from: 2, to: 1, label: "Works at" },
    { from: 4, to: 1, label: "Works at" },
    { from: 3, to: 1, label: "Opportunity for" },
    { from: 5, to: 2, label: "Sent to" },
];

export function CanvasView() {
    const [nodes, setNodes] = useState<any[]>(initialNodes);
    const [edges, setEdges] = useState<any[]>(initialEdges);
    const [loading, setLoading] = useState(false);

    // Fetch graph data from Supabase
    useEffect(() => {
        const fetchGraph = async () => {
            setLoading(true);
            // In Phase 1, we might not have full graph data populated yet, so we'll try to fetch or fallback
            const { data: graphNodes, error: nodeError } = await supabase.from('revenue_graph_nodes').select('*');
            const { data: graphEdges, error: edgeError } = await supabase.from('revenue_graph_edges').select('*');

            if (graphNodes && graphNodes.length > 0) {
                setNodes(graphNodes.map((n: any) => ({
                    id: n.id,
                    label: n.properties?.name || "Unknown Node",
                    type: n.type,
                    x: Math.random() * 800, // Random position for now
                    y: Math.random() * 600
                })));
            }

            if (graphEdges && graphEdges.length > 0) {
                setEdges(graphEdges.map((e: any) => ({
                    from: e.from_node_id,
                    to: e.to_node_id,
                    label: e.type
                })));
            }
            setLoading(false);
        };

        fetchGraph();
    }, []);

    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Graph Layers</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span>Companies</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span>Contacts</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span>Deals</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Emails & Calls</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Analysis</h3>
                <Button variant="outline" className="w-full justify-start text-sm mb-2">
                    <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                    Find Buying Centers
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                    <Network className="w-4 h-4 mr-2 text-muted-foreground" />
                    Map Influence Paths
                </Button>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="h-full flex flex-col relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
                {/* Toolbar */}
                <div className="absolute top-4 left-4 z-10 flex gap-2 bg-background/80 backdrop-blur border border-border p-1.5 rounded-md shadow-sm">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><ZoomIn className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><ZoomOut className="w-4 h-4" /></Button>
                    <div className="w-px h-4 bg-border my-auto" />
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Move className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Layers className="w-4 h-4" /></Button>
                </div>

                <div className="absolute top-4 right-4 z-10">
                    <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur">
                        <Share2 className="w-4 h-4 mr-2" />
                        Export Graph
                    </Button>
                </div>

                {/* Canvas Area (Mock Visualization) */}
                <div className="flex-1 relative">
                    <svg className="w-full h-full pointer-events-none absolute top-0 left-0">
                        {edges.map((edge, i) => {
                            const fromNode = nodes.find(n => n.id === edge.from) || { x: 0, y: 0 };
                            const toNode = nodes.find(n => n.id === edge.to) || { x: 0, y: 0 };
                            return (
                                <line
                                    key={i}
                                    x1={fromNode.x}
                                    y1={fromNode.y}
                                    x2={toNode.x}
                                    y2={toNode.y}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-border"
                                />
                            );
                        })}
                    </svg>

                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            className={cn(
                                "absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-all bg-background flex items-center gap-2 min-w-[150px]",
                                node.type === 'company' ? "border-primary/20" :
                                    node.type === 'contact' ? "border-border" :
                                        node.type === 'deal' ? "border-green-200 dark:border-green-800" :
                                            "border-gray-200 dark:border-gray-800"
                            )}
                            style={{ left: node.x, top: node.y }}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded flex items-center justify-center text-white",
                                node.type === 'company' ? "bg-primary" :
                                    node.type === 'contact' ? "bg-secondary text-foreground border border-border" :
                                        node.type === 'deal' ? "bg-green-500" :
                                            "bg-gray-500"
                            )}>
                                {node.type === 'company' && <Network className="w-4 h-4" />}
                                {node.type === 'contact' && <span className="text-xs font-bold">C</span>}
                                {node.type === 'deal' && <span className="text-xs font-bold">$</span>}
                                {node.type === 'action' && <span className="text-xs font-bold">A</span>}
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-bold truncate">{node.label}</div>
                                <div className="text-[10px] text-muted-foreground uppercase">{node.type}</div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-20">
                            <div className="flex flex-col items-center gap-2">
                                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                                <p className="text-sm font-medium text-muted-foreground">Loading Intelligence Graph...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
