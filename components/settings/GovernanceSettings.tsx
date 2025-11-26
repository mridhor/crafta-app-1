import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Shield, AlertTriangle, CheckCircle, Trash2, Plus, Loader2 } from "lucide-react";

export function GovernanceSettings() {
    const { data: rules, isLoading } = useQuery({
        queryKey: ["governance-rules"],
        queryFn: async () => {
            const res = await fetch("/api/settings/governance");
            return res.json();
        }
    });

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;
    }

    const getIcon = (type: string) => {
        switch (type) {
            case "enrichment": return <Shield className="w-4 h-4 text-red-500" />;
            case "validation": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
            case "duplicate_check": return <CheckCircle className="w-4 h-4 text-blue-500" />;
            default: return <Shield className="w-4 h-4" />;
        }
    };

    const getColor = (level: string) => {
        switch (level) {
            case "strict_block": return "border-l-red-500";
            case "quarantine": return "border-l-orange-500";
            case "merge_suggestion": return "border-l-blue-500";
            default: return "border-l-gray-500";
        }
    };

    const getBadgeColor = (level: string) => {
        switch (level) {
            case "strict_block": return "bg-red-100 text-red-800";
            case "quarantine": return "bg-orange-100 text-orange-800";
            case "merge_suggestion": return "bg-blue-100 text-blue-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-500" />
                        Governance Standards
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Define non-negotiable rules for data hygiene and safety.
                    </p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Rule
                </Button>
            </div>

            <div className="space-y-4">
                {rules?.map((rule: any) => (
                    <Card key={rule.id} className={`border-l-4 ${getColor(rule.action)}`}>
                        <CardContent className="p-4 flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    {getIcon(rule.rule_json.rule_type)}
                                    <span className="font-medium">{rule.name}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {rule.rule_json.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge variant="secondary" className={`${getBadgeColor(rule.action)} uppercase text-[10px]`}>
                                    {rule.action.replace("_", " ")}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
