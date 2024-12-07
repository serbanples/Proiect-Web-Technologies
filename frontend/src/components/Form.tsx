import React, { useState } from 'react';
import { ButtonType, FormField } from './types';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

type GenericFormProps = {
  title: string;
  fields: FormField[];
  buttons: ButtonType[];
  onSubmit: (formData: Record<string, string | number>) => void;
};

const GenericForm: React.FC<GenericFormProps> = ({ title, fields, buttons, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string | number>>(
    fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as Record<string, string | number>)
  );

  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>(
    fields.reduce((acc, field) => {
      if (field.type === 'password') {
        acc[field.name] = false;
      }
      return acc;
    }, {} as Record<string, boolean>)
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

  const togglePasswordVisibility = (name: string) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
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
          <span style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
          {field.type === 'password' ? (
            <>
            <input
              id={field.name}
              name={field.name}
              type={passwordVisibility[field.name] ? 'text' : 'password'}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] as string}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: '.5rem',
                border: 'none',
                outline: 'none',
              }}            
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(field.name)}
              style={{
                background: 'none',
                border: 'none',
                padding: '.5rem',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {passwordVisibility[field.name] ? <Icon icon={eyeOff} /> : <Icon icon={eye} /> }
            </button>
            </>
          ) : (
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
          )}
          </span>
        </div>
      ))}

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
