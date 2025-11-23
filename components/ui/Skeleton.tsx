import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-muted/50',
                className
            )}
        />
    );
}

// Specific skeleton components for common use cases
export function CardSkeleton({ count = 1 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                </div>
            ))}
        </>
    );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
    return (
        <div className="space-y-2">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={`header-${i}`} className="h-8" />
                ))}
            </div>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={`row-${rowIndex}`}
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
                >
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-12" />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function HeatmapSkeleton({ rows = 4, cols = 4 }: { rows?: number; cols?: number }) {
    return (
        <div className="space-y-2">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid gap-4 grid-cols-6">
                    <Skeleton className="h-12 col-span-2" />
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-12" />
                    ))}
                </div>
            ))}
        </div>
    );
}
