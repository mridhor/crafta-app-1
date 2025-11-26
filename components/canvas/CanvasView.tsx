"use client";

import { useQuery } from "@tanstack/react-query";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Node,
    Edge
} from "reactflow";
import "reactflow/dist/style.css";
import { useEffect } from "react";

export function CanvasView() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { data: graphData, isLoading } = useQuery({
        queryKey: ["canvas-graph"],
        queryFn: async () => {
            const res = await fetch("/api/canvas");
            return res.json();
        }
    });

    useEffect(() => {
        if (graphData && Array.isArray(graphData.nodes) && Array.isArray(graphData.edges)) {
            setNodes(graphData.nodes.map((node: any) => ({
                ...node,
                // Custom styling based on type
                style: {
                    background: node.type === 'company' ? '#fff' : node.type === 'deal' ? '#f0f9ff' : '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '10px',
                    width: 150,
                    fontSize: '12px',
                    textAlign: 'center'
                }
            })));
            setEdges(graphData.edges);
        }
    }, [graphData, setNodes, setEdges]);

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading graph...</div>;
    }

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
}
