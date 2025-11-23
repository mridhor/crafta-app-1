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
            <Sidebar />
            <main className="flex-1 min-w-0 bg-white dark:bg-gray-950">
                {children}
            </main>
            <RightPanel />
        </div>
    );
}
