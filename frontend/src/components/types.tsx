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
  low = "Low",
  medium = "Medium",
  high = "High",
  critical = "Critical"
}

export type Task = {
  description: string;
  title: string;
  ticketNumber: string;
  assignee: string;
  project: string;
  priorityLevel: PriorityLevel;
  status: 'To Do' | 'In Progress' | 'Dev QA' | 'Done';
};