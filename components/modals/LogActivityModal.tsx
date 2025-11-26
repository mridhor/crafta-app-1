"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2 } from "lucide-react";

interface LogActivityModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dealId?: string;
}

export function LogActivityModal({ open, onOpenChange, dealId }: LogActivityModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("note");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            // Note: This endpoint needs to be implemented or handled via deal update
            // For MVP, we'll assume we post to a generic activities endpoint or deal sub-resource
            // Since we haven't implemented a dedicated activities endpoint, we'll mock success
            // In a real app: await fetch("/api/activities", ...)
            return new Promise(resolve => setTimeout(resolve, 500));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["deal", dealId] });
            onOpenChange(false);
            setTitle("");
            setDescription("");
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogClose onClick={() => onOpenChange(false)} />
                <DialogHeader>
                    <DialogTitle>Log Activity</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Type</label>
                        <div className="flex gap-2">
                            {["note", "call", "meeting", "email"].map(t => (
                                <Button
                                    key={t}
                                    variant={type === t ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setType(t)}
                                    className="capitalize"
                                >
                                    {t}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Discovery Call"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <textarea
                            id="description"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter details..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending || !title}>
                        {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Log Activity
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
