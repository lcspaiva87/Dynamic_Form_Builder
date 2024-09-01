"use client"
import { useState } from 'react';
import FormPreview from './FormPreview';

const FormBuilder = () => {
  const [formFields, setFormFields] = useState<{ id: number; type: string; label: string; required: boolean; options: string[]; }[]>([]);
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formLogo, setFormLogo] = useState('');
  const [savedForms, setSavedForms] = useState([]);

  const addField = (type: string) => {
    const newField = {
      id: Date.now(),
      type,
      label: '',
      required: false,
      options: type === 'select' ? ['Option 1'] : [],
    };
    setFormFields([...formFields, newField]);
  };

  const updateField = (id: number, updates: { label?: string; required?: boolean; }) => {
    setFormFields(formFields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: number) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  const addOption = (fieldId: number) => {
    setFormFields(formFields.map(field =>
      field.id === fieldId
        ? { ...field, options: [...field.options, `Option ${field.options.length + 1}`] }
        : field
    ));
  };

  const updateOption = (fieldId: number, index: number, value: string) => {
    setFormFields(formFields.map(field =>
      field.id === fieldId
        ? {
          ...field,
          options: field.options.map((option, i) => i === index ? value : option)
        }
        : field
    ));
  };

  const removeOption = (fieldId: number, index: number) => {
    setFormFields(formFields.map(field =>
      field.id === fieldId
        ? { ...field, options: field.options.filter((_, i) => i !== index) }
        : field
    ));
  };

  const saveForm = async () => {
    try {
      const response = await fetch('/api/save-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formName,
          title: formTitle,
          logo: formLogo,
          fields: formFields
        }),
      });
      if (response.ok) {
        alert('Form saved successfully!');

      } else {
        throw new Error('Failed to save form');
      }
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form. Please try again.');
    }
  };
  const handleLogoUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormLogo(reader.result as string || '');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Form Builder</h2>
        <input
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Form Name"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Form Title (displayed to users)"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="mb-4">
          <label className="block mb-2">Form Logo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <button onClick={() => addField('text')} className="bg-blue-500 text-white p-2 mr-2 rounded">Add Text Input</button>
          <button onClick={() => addField('number')} className="bg-blue-500 text-white p-2 mr-2 rounded">Add Number Input</button>
          <button onClick={() => addField('email')} className="bg-blue-500 text-white p-2 mr-2 rounded">Add Email Input</button>
          <button onClick={() => addField('select')} className="bg-blue-500 text-white p-2 mr-2 rounded">Add Select</button>
          <button onClick={() => addField('textarea')} className="bg-blue-500 text-white p-2 mr-2 rounded">Add Textarea</button>
          <button onClick={() => addField('radio')} className="bg-blue-500 text-white p-2 mr-2 rounded">Add Checkbox</button>

        </div>
        {formFields.map(field => (
          <div key={field.id} className="mb-4 p-4 border rounded">
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              placeholder="Field Label"
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="flex items-center mb-2">
              <input
                type="radio"
                checked={field.required}
                onChange={(e) => updateField(field.id, { required: e.target.checked })}
                className="mr-2"
              />
              <label>Required</label>
            </div>
            {(field.type === 'select' || field.type === 'radio') && (
              <div>
                <h4 className="font-bold mb-2">Options:</h4>
                {field.options.map((option, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(field.id, index, e.target.value)}
                      className="flex-grow p-2 mr-2 border rounded"
                    />
                    <button onClick={() => removeOption(field.id, index)} className="bg-red-500 text-white p-2 rounded">Remove</button>
                  </div>
                ))}
                <button onClick={() => addOption(field.id)} className="bg-green-500 text-white p-2 rounded">Add Option</button>
              </div>
            )}
            <button onClick={() => removeField(field.id)} className="bg-red-500 text-white p-2 mt-2 rounded">Remove Field</button>
          </div>
        ))}
        <button onClick={saveForm} className="bg-green-500 text-white p-2 rounded">Save Form</button>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <FormPreview fields={formFields} title={formTitle} logo={formLogo} />
      </div>
    </div>
  );
};

export default FormBuilder;