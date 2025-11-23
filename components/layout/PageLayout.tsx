import { Sidebar } from "./Sidebar";
import { RightPanel } from "./RightPanel";

interface PageLayoutProps {
    sidebar?: React.ReactNode;
    children: React.ReactNode;
    rightPanel?: React.ReactNode;
}

export function PageLayout({ sidebar, children, rightPanel }: PageLayoutProps) {
    return (
        <div className="flex min-h-[calc(100vh-3.5rem)]">
            {sidebar ? (
                <aside className="w-64 bg-background border-r border-border h-screen flex flex-col sticky top-0">
                    {sidebar}
                </aside>
            ) : (
                <Sidebar />
            )}
            <main className="flex-1 min-w-0 bg-white dark:bg-gray-950">
                {children}
            </main>
            {rightPanel && (
                <aside className="w-80 bg-background border-l border-border h-screen sticky top-0 overflow-y-auto">
                    {rightPanel}
                </aside>
            )}
        </div>
    );
}
