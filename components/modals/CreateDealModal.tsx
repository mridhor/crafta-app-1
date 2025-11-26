"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2 } from "lucide-react";

interface CreateDealModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateDealModal({ open, onOpenChange }: CreateDealModalProps) {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/deals", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    value: parseFloat(value),
                    stage: "lead",
                    probability: 10,
                    risk_level: "low"
                }),
            });
            if (!res.ok) throw new Error("Failed to create deal");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["deals"] });
            onOpenChange(false);
            setName("");
            setValue("");
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogClose onClick={() => onOpenChange(false)} />
                <DialogHeader>
                    <DialogTitle>Create New Deal</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">Deal Name</label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Acme Corp Expansion"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="value" className="text-sm font-medium">Value ($)</label>
                        <Input
                            id="value"
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="e.g. 50000"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending || !name || !value}>
                        {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Create Deal
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
