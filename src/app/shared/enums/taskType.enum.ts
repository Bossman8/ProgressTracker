export enum TaskType {
    task = 'task',
    userStory = 'userStory',
    feature = 'feature',
    epic = 'epic'
}

export const TaskTypeLabelMapping = {
    [TaskType.task]: 'Task',
    [TaskType.userStory]: 'User Story',
    [TaskType.feature]: 'Feature',
    [TaskType.epic]: 'Epic',
}