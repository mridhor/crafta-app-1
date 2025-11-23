"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface UndoToastProps {
    message: string;
    onUndo: () => void;
    onDismiss: () => void;
    duration?: number;
}

export function UndoToast({ message, onUndo, onDismiss, duration = 5000 }: UndoToastProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    setIsVisible(false);
                    onDismiss();
                    return 0;
                }
                return prev - (100 / (duration / 100));
            });
        }, 100);

        return () => clearInterval(timer);
    }, [duration, onDismiss]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg shadow-lg p-4 flex items-center gap-4 min-w-[320px] border border-gray-800 dark:border-gray-200">
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
                        onClick={onUndo}
                    >
                        <RotateCcw className="w-3 h-3 mr-1.5" />
                        Undo
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 rounded-full"
                        onClick={() => {
                            setIsVisible(false);
                            onDismiss();
                        }}
                    >
                        <X className="w-3 h-3" />
                    </Button>
                </div>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full overflow-hidden mb-1">
                <div
                    className="h-full bg-blue-500 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
