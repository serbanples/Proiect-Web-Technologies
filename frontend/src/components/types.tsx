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
  QA = 'QA',
  Done = 'Done'
}

export type Project = {
  id: number;
  name: string;
  description: string;
  status: Status;
  dueDate: string;
}