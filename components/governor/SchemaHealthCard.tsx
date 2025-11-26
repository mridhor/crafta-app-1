import React from 'react';
import { Card } from '@/components/ui/Card';
import { Check, X, AlertCircle } from 'lucide-react';

interface SchemaField {
    name: string;
    status: 'mapped' | 'missing' | 'type_mismatch';
    confidence?: number;
}

interface SchemaHealthCardProps {
    sourceName: string;
    fields: SchemaField[];
}

export function SchemaHealthCard({ sourceName, fields }: SchemaHealthCardProps) {
    const mappedCount = fields.filter(f => f.status === 'mapped').length;
    const healthScore = Math.round((mappedCount / fields.length) * 100);

    return (
        <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{sourceName} Schema</h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Match Score:</span>
                    <span className={`text-lg font-bold ${healthScore > 90 ? 'text-green-600' : 'text-amber-600'}`}>
                        {healthScore}%
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                {fields.map((field, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-secondary/30 text-sm">
                        <span className="font-mono text-foreground">{field.name}</span>

                        <div className="flex items-center gap-2">
                            {field.status === 'mapped' && (
                                <>
                                    <span className="text-xs text-green-600 font-medium">Mapped ({field.confidence}%)</span>
                                    <Check className="w-4 h-4 text-green-600" />
                                </>
                            )}
                            {field.status === 'missing' && (
                                <>
                                    <span className="text-xs text-red-600 font-medium">Missing</span>
                                    <X className="w-4 h-4 text-red-600" />
                                </>
                            )}
                            {field.status === 'type_mismatch' && (
                                <>
                                    <span className="text-xs text-amber-600 font-medium">Type Mismatch</span>
                                    <AlertCircle className="w-4 h-4 text-amber-600" />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
