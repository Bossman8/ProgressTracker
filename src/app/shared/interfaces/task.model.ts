import { TaskType } from "../enums";

export interface Task {
    id?: string;
    title: string;
    description: string;
    type: TaskType;
    blocked: boolean;
  }