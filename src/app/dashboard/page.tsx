"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FormField {
  id: number;
  type: string;
  label: string;
  required: boolean;
  options: string[];
}

interface Form {
  id: string;
  name: string;
  title: string;
  logo: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}

interface FormResponse {
  id: string;
  formId: string;
  data: {
    [key: string]: string | string[];
  };
  createdAt: string;
}

export default function Dashboard() {
  const id = "66d53582e7c2354e60f9db4f";
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [form, setForm] = useState<Form[]>([]);

  useEffect(() => {
    if (id) {
      fetchResponses();
      fetchForm();
    }
  }, [id]);

  async function fetchResponses() {
    const response = await fetch(`/api/save-data-form`);
    if (response.ok) {
      const data = await response.json();
      setResponses(data);
    }
  }

  async function fetchForm() {
    const response = await fetch(`/api/form/${id}`);
    if (response.ok) {
      const data = await response.json();
      setForm(data);
    }
  }

  if (form.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Respostas para: {form[0]?.title}</h1>
      <Link href={`/forms/${id}`} className="text-blue-500 hover:underline mb-4 inline-block">
        ← Voltar para o formulário
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Data</th>
              {form[0]?.fields.map((field) => (
                <th key={field.id} className="px-4 py-2 border-b">
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((response) => (
              <tr key={response.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  {new Date(response.createdAt).toLocaleString()}
                </td>
                {form[0]?.fields.map((field) => (
                  <td key={`${response.id}-${field.id}`} className="px-4 py-2 border-b">
                    {Array.isArray(response.data[field.id])
                      ? (response.data[field.id] as string[]).join(', ')
                      : response.data[field.id] as string}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}