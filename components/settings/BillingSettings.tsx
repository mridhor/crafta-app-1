"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function BillingSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Billing</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your subscription and billing details.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-xl">Growth Plan</CardTitle>
                            <CardDescription>$499 / month</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">ACTIVE</Badge>
                    </CardHeader>
                    <CardContent className="space-y-6 mt-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Seats Used</span>
                                <span className="font-medium">12 / 20</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[60%]" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">API Calls</span>
                                <span className="font-medium">45k / 100k</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[45%]" />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button variant="outline">Change Plan</Button>
                            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">Cancel Subscription</Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-slate-900 text-white px-2 py-1 rounded text-xs font-bold">VISA</div>
                                <div className="text-sm">
                                    <div className="font-medium">•••• 4242</div>
                                    <div className="text-muted-foreground">Expires 12/28</div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">Update Card</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Invoice History</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Oct 1, 2025</span>
                                <Button variant="link" className="h-auto p-0 text-blue-600">Download</Button>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Sep 1, 2025</span>
                                <Button variant="link" className="h-auto p-0 text-blue-600">Download</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
