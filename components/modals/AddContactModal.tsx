"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2 } from "lucide-react";

interface AddContactModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddContactModal({ open, onOpenChange }: AddContactModalProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/contacts", {
                method: "POST",
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email
                }),
            });
            if (!res.ok) throw new Error("Failed to create contact");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            onOpenChange(false);
            setFirstName("");
            setLastName("");
            setEmail("");
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogClose onClick={() => onOpenChange(false)} />
                <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                            <Input
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                            <Input
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending || !firstName || !email}>
                        {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Add Contact
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
