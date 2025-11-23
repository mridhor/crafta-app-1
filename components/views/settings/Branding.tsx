import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Palette, Upload, Layout } from "lucide-react";

export function Branding() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Palette className="w-5 h-5 text-pink-600" />
                        Branding
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Customize the look and feel for your workspace.
                    </p>
                </div>
                <Button>
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo & Colors */}
                <Card className="p-6 space-y-6">
                    <div>
                        <h3 className="font-bold text-sm mb-3">Workspace Logo</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border border-dashed border-muted-foreground/50">
                                <span className="text-xs text-muted-foreground">Logo</span>
                            </div>
                            <Button variant="outline" size="sm">
                                <Upload className="w-4 h-4 mr-2" /> Upload
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm mb-3">Brand Color</h3>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 cursor-pointer ring-2 ring-offset-2 ring-blue-600" />
                            <div className="w-8 h-8 rounded-full bg-purple-600 cursor-pointer" />
                            <div className="w-8 h-8 rounded-full bg-green-600 cursor-pointer" />
                            <div className="w-8 h-8 rounded-full bg-orange-600 cursor-pointer" />
                            <div className="w-8 h-8 rounded-full bg-black cursor-pointer" />
                        </div>
                    </div>
                </Card>

                {/* Preview */}
                <Card className="p-6 bg-muted/30">
                    <h3 className="font-bold text-sm mb-3">Email Preview</h3>
                    <div className="bg-white dark:bg-card p-4 rounded shadow-sm border border-border">
                        <div className="w-8 h-8 bg-blue-600 rounded mb-4" />
                        <h4 className="font-bold text-lg mb-2">Weekly Rhythm Digest</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Here is your prioritized action list for the week. You have 3 urgent items decaying.
                        </p>
                        <Button size="sm" className="bg-blue-600 text-white">Open Rhythm</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
