"use client"
import { Form } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FormsList() {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    async function fetchForms() {
      const response = await fetch('/api/form');
      if (response.ok) {
        const data = await response.json();
        setForms(data);
      }
    }
    fetchForms();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Formulários Cadastrados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.map((form: Form) => (
          <Link href={`/form/${form.id}`} key={form.id} className="block p-4 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{form.title}</h2>
            <p className="text-gray-600">{form.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}