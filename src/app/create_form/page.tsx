import { Header } from "@/components/header";
import DynamicFormBuilder from "./_components";

export default function CreateFormPage() {
  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6">Criar formulario</h1>
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Nome do formulario</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded mb-4"
              placeholder="Digite o nome do formulario"
            />
            </div>
            <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Descricao do formulario</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded mb-4"
              placeholder="Digite a descricao do formulario"
            />
            </div>
            <DynamicFormBuilder />
        </main>
    </div>
    </div>
  );
}