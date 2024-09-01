import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useState } from 'react';

type Field = {
  type: string;
  id: Key | null | undefined;
  label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined;
  required: boolean | undefined;
  options: any[];
};

type FormPreviewProps = {
  fields: Field[];
  title: string;
  logo: string;
  name: string;
};

const FormPreview = ({ fields, title, logo, name }: FormPreviewProps) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  console.log('title', title);
  const handleInputChange = (fieldId: Key | null | undefined, value: string) => {
    setFormData({ ...formData, [String(fieldId)]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados do formulário
    console.log('Form data:', formData);
    alert('Formulário enviado com sucesso!');
  };

  return (
    <div className="border p-4 rounded">
      {name && (
        <h1 className="text-2xl font-bold mb-4 text-center">{name}</h1>
      )}
      {logo && (
        <div className="mb-4">
          <img src={logo} alt="Form Logo" className="max-w-xs mx-auto" />
        </div>
      )}
      {title && (
        <h1 className="text-sm font-bold mb-4 text-center">{title}</h1>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields?.map((field: { type: any; id: Key | null | undefined; label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; required: boolean | undefined; options: any[]; }) => {
          switch (field.type) {
            case 'text':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    required={field.required}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                </div>
              );
            case 'number':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    required={field.required}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                </div>
              );
            case 'email':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    required={field.required}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                </div>
              );
            case 'select':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <select
                    className="w-full p-2 border rounded"
                    required={field.required}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  >
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              );
            case 'radio':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`${field.id}-${index}`}
                        value={option}
                        className="mr-2"
                        onChange={(e) => {
                          const currentValues = formData[field.id as string] || [];
                          const newValues = e.target.checked
                            ? [...currentValues, option]
                            : currentValues.filter((v: any) => v !== option);
                          handleInputChange(field.id, newValues);
                        }}
                      />
                      <label htmlFor={`${field.id}-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
              );
            default:
              return null;
          }
        })}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default FormPreview;