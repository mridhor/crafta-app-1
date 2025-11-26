import { create } from 'zustand';

interface Workspace {
    id: string;
    name: string;
    slug: string;
    settings: Record<string, unknown>;
}

interface User {
    id: string;
    workspaceId: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    role: 'admin' | 'member' | 'viewer';
}

interface PipelineFilters {
    ownerId?: string;
    region?: string;
    productId?: string;
}

interface AppState {
    // Workspace
    currentWorkspace: Workspace | null;
    setWorkspace: (workspace: Workspace) => void;

    // User
    currentUser: User | null;
    setUser: (user: User) => void;

    // UI State
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;

    // Selected entities
    selectedDealId: string | null;
    selectDeal: (id: string) => void;

    // Filters (persisted)
    pipelineFilters: PipelineFilters;
    setPipelineFilters: (filters: PipelineFilters) => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Workspace
    currentWorkspace: null,
    setWorkspace: (workspace) => set({ currentWorkspace: workspace }),

    // User
    currentUser: null,
    setUser: (user) => set({ currentUser: user }),

    // UI State
    sidebarCollapsed: false,
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    // Selected entities
    selectedDealId: null,
    selectDeal: (id) => set({ selectedDealId: id }),

    // Filters
    pipelineFilters: {},
    setPipelineFilters: (filters) => set({ pipelineFilters: filters }),
}));
