"use client"
import CryptoJS from 'crypto-js';
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

// Função para descriptografar dados
function decryptData(data: string, secretKey: string): string {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export default function Dashboard() {
  const id = "66d51d179e9d9324744971f0";
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [form, setForm] = useState<Form[]>([]);
  const secretKey = 'sua-chave-secreta';

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
      const decryptedData = data.map((response: FormResponse) => {
        const decryptedResponseData = Object.fromEntries(
          Object.entries(response.data).map(([key, value]) => [
            key,
            Array.isArray(value)
              ? value.map((v) => decryptData(v, secretKey))
              : decryptData(value, secretKey),
          ])
        );
        return { ...response, data: decryptedResponseData };
      });
      setResponses(decryptedData);
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