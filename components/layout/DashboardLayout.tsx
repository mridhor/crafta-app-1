import { TopBar } from "./TopBar";
import { RightPanel } from "./RightPanel";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background flex-col">
            <TopBar />
            <div className="flex flex-1">
                <main className="flex-1 p-6">
                    {children}
                </main>
                <RightPanel />
            </div>
        </div>
    );
}
