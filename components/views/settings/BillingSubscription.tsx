import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CreditCard, Check } from "lucide-react";

export function BillingSubscription() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        Billing & Subscription
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your plan, usage, and payment methods.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Plan */}
                <Card className="p-6 col-span-2">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold">Growth Plan</h3>
                            <p className="text-sm text-muted-foreground">$499 / month</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Active</span>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-sm">
                            <span>Seats Used</span>
                            <span className="font-bold">12 / 20</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[60%]" />
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>API Calls</span>
                            <span className="font-bold">45k / 100k</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 w-[45%]" />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline">Change Plan</Button>
                        <Button variant="ghost" className="text-red-600 hover:bg-red-50">Cancel Subscription</Button>
                    </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-6">
                    <h3 className="font-bold text-sm mb-4">Payment Method</h3>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-6 bg-gray-800 rounded text-white flex items-center justify-center text-[8px] font-bold">VISA</div>
                        <div className="text-sm">
                            <p className="font-medium">•••• 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 12/28</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">Update Card</Button>

                    <h3 className="font-bold text-sm mt-6 mb-2">Invoice History</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Oct 1, 2025</span>
                            <a href="#" className="text-blue-600 hover:underline">Download</a>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Sep 1, 2025</span>
                            <a href="#" className="text-blue-600 hover:underline">Download</a>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
