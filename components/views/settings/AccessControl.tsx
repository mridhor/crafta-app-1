import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, UserPlus, Lock } from "lucide-react";

export function AccessControl() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        Access Control
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Role-based access to protect governance functions.
                    </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <UserPlus className="w-4 h-4 mr-2" /> Add User
                </Button>
            </div>

            <div className="space-y-6">
                {/* Roles */}
                <div>
                    <h3 className="text-sm font-bold mb-3">Defined Roles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm">Owner</h4>
                                <Lock className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">Full system access, billing, and destructive actions.</p>
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white" />
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm">Admin</h4>
                                <Lock className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">Can configure rules, integrations, and users.</p>
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white" />
                                <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white" />
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm">Rep</h4>
                                <Lock className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">View assigned items, execute actions, read-only settings.</p>
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-white" />
                                <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white" />
                                <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">+5</div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Users Table */}
                <div>
                    <h3 className="text-sm font-bold mb-3">Users</h3>
                    <Card className="overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium">
                                <tr>
                                    <th className="px-4 py-3">User</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="px-4 py-3 font-medium">Muhammad Ridho</td>
                                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">Owner</span></td>
                                    <td className="px-4 py-3 text-green-600">Active</td>
                                    <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" className="h-6">Edit</Button></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Jane Doe</td>
                                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">Admin</span></td>
                                    <td className="px-4 py-3 text-green-600">Active</td>
                                    <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" className="h-6">Edit</Button></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">John Smith</td>
                                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-bold">Rep</span></td>
                                    <td className="px-4 py-3 text-green-600">Active</td>
                                    <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" className="h-6">Edit</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </div>
    );
}
