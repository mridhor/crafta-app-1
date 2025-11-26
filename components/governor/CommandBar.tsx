import React, { useState, useEffect, useRef } from 'react';
import { Command, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CommandBar() {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus on slash
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/' && !isFocused) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFocused]);

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border z-50">
            <div className={cn(
                "max-w-3xl mx-auto flex items-center gap-3 p-3 rounded-lg border bg-card transition-all shadow-sm",
                isFocused ? "border-primary ring-1 ring-primary shadow-md" : "border-border"
            )}>
                <div className="p-1.5 rounded bg-secondary text-muted-foreground">
                    <Terminal className="w-4 h-4" />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Type / to execute commands..."
                    className="flex-1 bg-transparent border-none outline-none text-sm font-mono placeholder:text-muted-foreground/50"
                />

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-1.5 py-0.5 rounded bg-secondary border border-border">/log</span>
                    <span className="px-1.5 py-0.5 rounded bg-secondary border border-border">/status</span>
                    <span className="px-1.5 py-0.5 rounded bg-secondary border border-border">/retry</span>
                </div>
            </div>
        </div>
    );
}
