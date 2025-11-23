import { TopBar } from "./TopBar";

interface PageLayoutProps {
    sidebar?: React.ReactNode;
    children: React.ReactNode;
    rightPanel?: React.ReactNode;
}

export function PageLayout({ sidebar, children, rightPanel }: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopBar />
            <div className="flex min-h-[calc(100vh-4rem)]">
                {sidebar && (
                    <aside className="w-64 border-r border-border bg-background overflow-y-auto">
                        {sidebar}
                    </aside>
                )}
                <main className="flex-1 min-w-0 bg-white dark:bg-gray-950">
                    {children}
                </main>
                {rightPanel && (
                    <aside className="w-80 border-l border-border bg-background overflow-y-auto">
                        {rightPanel}
                    </aside>
                )}
            </div>
        </div>
    );
}
