import { TaskStatusEnum } from "../services/serviceTypes";

export type FormField = {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'textarea';
    placeholder?: string;
    required?: boolean;
  };

export type ButtonType = {
    name: string;
    label: string;
    type: 'submit' | 'button';
    onClick?: (event: React.MouseEvent) => void;
};

export enum Status {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  DevQA = 'Dev QA',
  Done = 'Done'
}

export type Project = {
  id: number;
  name: string;
  description: string;
  status: Status;
  dueDate: string;
}

export enum PriorityLevel {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical"
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export type Task = {
  id: string,
  name: string;
  displayId: string;
  description: string;
  assignedTo: {
    id: string;
    name: string;
    email: string;
  };
  project: {
    id: string;
    name: string;
    prefferedColor: string;
  };
  priority: PriorityLevel;
  percentageCompleted: number;
  createdAt: string;
  createdBy: string;
  dueDate: string;
  status: TaskStatusEnum;
};
