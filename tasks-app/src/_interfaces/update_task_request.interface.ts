export interface UpdateTaskRequest {
    status: number;
    id: string;
    title: string;
    dueDate: string;
    description: string;
    completedAt: string;
    userId: string;

}