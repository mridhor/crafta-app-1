"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Palette, Upload } from "lucide-react";

export function BrandingSettings() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <Palette className="w-5 h-5 text-pink-500" />
                        Branding
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Customize the look and feel for your workspace.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Save Changes
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-full">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-medium">Workspace Logo</label>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-lg border border-dashed flex items-center justify-center bg-muted/30 text-xs text-muted-foreground">
                                    Logo
                                </div>
                                <Button variant="outline" size="sm">
                                    <Upload className="w-3 h-3 mr-2" />
                                    Upload
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium">Brand Color</label>
                            <div className="flex items-center gap-3">
                                <button className="w-8 h-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600" />
                                <button className="w-8 h-8 rounded-full bg-purple-600 hover:ring-2 hover:ring-offset-2 hover:ring-purple-600 transition-all" />
                                <button className="w-8 h-8 rounded-full bg-green-600 hover:ring-2 hover:ring-offset-2 hover:ring-green-600 transition-all" />
                                <button className="w-8 h-8 rounded-full bg-orange-600 hover:ring-2 hover:ring-offset-2 hover:ring-orange-600 transition-all" />
                                <button className="w-8 h-8 rounded-full bg-black hover:ring-2 hover:ring-offset-2 hover:ring-gray-900 transition-all" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-full bg-slate-50/50">
                    <CardContent className="p-6">
                        <label className="text-sm font-medium mb-3 block">Email Preview</label>
                        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
                            <div className="w-8 h-8 rounded bg-blue-600" />

                            <div className="space-y-2">
                                <h4 className="font-bold text-lg">Weekly Rhythm Digest</h4>
                                <p className="text-sm text-muted-foreground">
                                    Here is your prioritized action list for the week. You have 3 urgent items decaying.
                                </p>
                            </div>

                            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                                Open Rhythm
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
