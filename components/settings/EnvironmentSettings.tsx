import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Code, Copy, Eye, Loader2 } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";

export function EnvironmentSettings() {
    const { data: apiKeys, isLoading } = useQuery({
        queryKey: ["api-keys"],
        queryFn: async () => {
            const res = await fetch("/api/settings/api-keys");
            return res.json();
        }
    });

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Environment & API Keys
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Manage API keys and webhook endpoints.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Generate New Key
                </Button>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-sm font-medium mb-3">Active API Keys</h4>
                    {apiKeys?.length === 0 ? (
                        <div className="text-sm text-muted-foreground border border-dashed rounded-lg p-4 text-center">No API keys found.</div>
                    ) : (
                        <div className="space-y-3">
                            {apiKeys?.map((key: any) => (
                                <Card key={key.id}>
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full border border-current text-muted-foreground" />
                                                <span className="font-medium text-sm">{key.key_name || "Unnamed Key"}</span>
                                            </div>
                                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active</Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-muted/50 rounded-md px-3 py-2 font-mono text-xs text-muted-foreground flex items-center justify-between">
                                                <span>{key.key_secret ? `${key.key_secret.substring(0, 12)}...${key.key_secret.substring(key.key_secret.length - 4)}` : "sk_live_..."}</span>
                                                <div className="flex items-center gap-2">
                                                    <Eye className="w-3 h-3 cursor-pointer hover:text-foreground" />
                                                    <Copy className="w-3 h-3 cursor-pointer hover:text-foreground" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] text-muted-foreground">
                                            Created {formatTimeAgo(key.created_at)}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h4 className="text-sm font-medium mb-3">Webhook Endpoints</h4>
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-sm">Inbound Form Handler</span>
                                <Button variant="outline" size="sm" className="h-7 text-xs">Test</Button>
                            </div>
                            <div className="bg-muted/50 rounded-md px-3 py-2 font-mono text-xs text-muted-foreground flex items-center justify-between">
                                <span>https://api.crafta.com/v1/hooks/form-inbound</span>
                                <Copy className="w-3 h-3 cursor-pointer hover:text-foreground" />
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 hover:bg-blue-50">form.submit</Badge>
                                <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 hover:bg-blue-50">lead.create</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
