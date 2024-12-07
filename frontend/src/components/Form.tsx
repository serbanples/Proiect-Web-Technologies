import React, { useState } from 'react';
import { ButtonType, FormField } from './types';

type GenericFormProps = {
  title: string;
  fields: FormField[];
  buttons: ButtonType[];
  onSubmit: (formData: Record<string, string | number>) => void;
};

const GenericForm: React.FC<GenericFormProps> = ({title, fields, buttons, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string | number>>(
    fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as Record<string, string | number>)
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: '1rem' }}>
          <label htmlFor={field.name} style={{ display: 'block', marginBottom: '.5rem' }}>
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name] as string}
            onChange={handleChange}
            style={{ width: '100%', padding: '.5rem' }}
          />
        </div>
      ))}
      {/* <button type="submit" style={{ padding: '.5rem 1rem' }}>
        Submit
      </button>
      <button type="button" style={{ padding: '.5rem 1rem' }}>
        Nav
      </button> */}
      {buttons.map((button: ButtonType) => (
        <button
          key={button.name}
          type={button.type}
          onClick={button.onClick}
          style={{ padding: '.5rem 1rem' }}
          >{button.label}</button>
      ))}
    </form>
  );
};

export default GenericForm;
