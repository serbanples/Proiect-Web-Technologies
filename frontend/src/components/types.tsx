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