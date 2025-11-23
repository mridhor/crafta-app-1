import { MoreVertical, Calendar, MessageSquare, Paperclip, Flag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Task {
    id: string;
    title: string;
    project: string;
    priority: "Low" | "Normal" | "Urgent";
    dueDate: string;
    comments: number;
    attachments?: number;
    members: number;
    date: string;
}

const tasks: Record<string, Task[]> = {
    backlog: [
        {
            id: "MDS-39",
            title: "New microdose website",
            project: "New Homepage",
            priority: "Urgent",
            dueDate: "July 29, '24",
            comments: 13,
            members: 1,
            date: "May 30, 2024"
        },
        {
            id: "MDS-56",
            title: "Input Styleguide",
            project: "Contact",
            priority: "Normal",
            dueDate: "June 2, '24",
            comments: 0,
            members: 2,
            date: "May 24, 2024"
        }
    ],
    inProgress: [
        {
            id: "MDS-2",
            title: "Sales deck",
            project: "Marketing",
            priority: "Low",
            dueDate: "Sep 19, '24",
            comments: 7,
            attachments: 3,
            members: 3,
            date: "May 31, 2024"
        }
    ],
    validation: [
        {
            id: "MDS-1",
            title: "Case studies",
            project: "Fin Tech work",
            priority: "Urgent",
            dueDate: "Sep 21, '24",
            comments: 1,
            members: 2,
            date: "Apr 22, 2024"
        },
        {
            id: "MDS-12",
            title: "Demo reel",
            project: "Animation 2nd",
            priority: "Normal",
            dueDate: "Aug 2, '24",
            comments: 2,
            members: 3,
            date: "Apr 27, 2024"
        }
    ],
    done: [
        {
            id: "MDS-43",
            title: "Spline animated logo",
            project: "Logo",
            priority: "Low",
            dueDate: "July 13, '24",
            comments: 13,
            attachments: 6,
            members: 1,
            date: "July 29, 2024"
        }
    ]
};

function TaskCard({ task }: { task: Task }) {
    return (
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-card">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Paperclip className="w-3 h-3" />
                    <span>{task.id}</span>
                </div>
                <div className={cn(
                    "text-xs font-medium px-1.5 py-0.5 rounded flex items-center gap-1",
                    task.priority === "Urgent" && "text-red-600 bg-red-50 dark:bg-red-950/30",
                    task.priority === "Normal" && "text-orange-600 bg-orange-50 dark:bg-orange-950/30",
                    task.priority === "Low" && "text-green-600 bg-green-50 dark:bg-green-950/30",
                )}>
                    <Flag className="w-3 h-3 fill-current" />
                    {task.priority}
                </div>
            </div>

            <h4 className="font-semibold text-sm mb-1">{task.title}</h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400" /> {/* Mock project color */}
                {task.project}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 bg-muted/50 p-1.5 rounded w-fit">
                <Calendar className="w-3 h-3" />
                Due to: <span className="text-foreground font-medium">{task.dueDate}</span>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                <div className="flex -space-x-2">
                    {[...Array(task.members)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center text-[10px] font-medium text-gray-600">
                            {/* Placeholder avatar */}
                        </div>
                    ))}
                    {task.attachments && (
                        <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-background flex items-center justify-center text-[10px] font-medium text-gray-500">
                            +{task.attachments}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {task.comments > 0 && (
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {task.comments}
                        </div>
                    )}
                    <span>{task.date}</span>
                </div>
            </div>
        </Card>
    );
}

export function TaskBoard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
            <div className="space-y-4 min-w-[280px]">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">Backlog</span>
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">24</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="w-4 h-4" /></Button>
                </div>
                {tasks.backlog.map(task => <TaskCard key={task.id} task={task} />)}
            </div>

            <div className="space-y-4 min-w-[280px]">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-orange-600">In progress</span>
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">4</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="w-4 h-4" /></Button>
                </div>
                {tasks.inProgress.map(task => <TaskCard key={task.id} task={task} />)}
            </div>

            <div className="space-y-4 min-w-[280px]">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-purple-600">Validation</span>
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">7</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="w-4 h-4" /></Button>
                </div>
                {tasks.validation.map(task => <TaskCard key={task.id} task={task} />)}
            </div>

            <div className="space-y-4 min-w-[280px]">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-green-600">Done</span>
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">13</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="w-4 h-4" /></Button>
                </div>
                {tasks.done.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
        </div>
    );
}
