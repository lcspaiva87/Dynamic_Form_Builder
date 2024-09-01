import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode } from "react";

const FormPreview = ({ fields, title, logo }: any) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Form Preview</h2>
      {logo && (
        <div className="mb-4">
          <img src={logo} alt="Form Logo" className="max-w-xs mx-auto" />
        </div>
      )}
      {title && (
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      )}
      <form className="space-y-4">
        {fields.map((field: { type: any; id: Key | null | undefined; label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; required: boolean | undefined; options: any[]; }) => {
          switch (field.type) {
            case 'text':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <Input type="text" className="w-full p-2 border rounded" required={field.required} />
                </div>
              );
            case 'number':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <Input type="number" className="w-full p-2 border rounded" required={field.required} />
                </div>
              );
            case 'email':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <Input type="email" className="w-full p-2 border rounded" required={field.required} />
                </div>
              );
            case 'select':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <select className="w-full p-2 border rounded" required={field.required}>
                    {field.options.map((option: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              );
            case 'textarea':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <Textarea required={field.required} />
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
                        name={field.id ?? ''}
                        value={option}
                        className="mr-2"
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