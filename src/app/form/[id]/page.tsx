"use client"
import FormPreview from '@/app/FormPreview';
import { useEffect, useState } from 'react';


export default function FormPage({ params: { id } }: any) {


  const [form, setForm] = useState(null);

  useEffect(() => {
    if (id) {
      fetchForm();
    }
  }, [id]);

  async function fetchForm() {
    const response = await fetch(`/api/form/${id}`);
    if (response.ok) {
      const data = await response.json();
      setForm(data);
    }
  }

  if (!form) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{form[0].title}</h1>
      <FormPreview
        fields={form[0].fields}
        title={form[0].title}
        logo={form[0].logo}
      />
    </div>
  );
}