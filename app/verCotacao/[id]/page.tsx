"use client";

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { initDB } from '@/lib/db'; // ou o caminho correto

export default function Formulario() {
    const [dados, setDados] = useState<{
      valor: string | number | readonly string[] | undefined; cod: string; descricao: string; marca: string; refFornecedor: string; unidade: string; quantidade: number; id: number; 
    }[]>([]);

      const [fornecedor, setFornecedor] = useState("")

      const listarcotacoes = async () => {
        const db = await initDB();
        const all = await db.getAll('cotacao');
        return all.map(entry => ({ key: entry.key, dados: entry.dados }));
      };

      const formatarValor = (valor: string) => {
        // Remove tudo que não for dígito
        const apenasNumeros = valor.replace(/\D/g, "");
      
        // Formata para "99,99"
        const comVirgula = (Number(apenasNumeros) / 100).toFixed(2).replace('.', ',');
      
        return comVirgula;
      };

      const atualizarValorPorCodigo = (cod: string, novoValor: any) => {
        const valorFormatado = formatarValor(novoValor);
        const novosDados = dados.map(item =>
          item.cod === cod ? { ...item, valor: valorFormatado } : item
        );
        setDados(novosDados);
        console.log(novosDados)
      };

      const [valores, setValores] = useState<{ key: any; dados: any }[]>([])
    
      useEffect(() => {
        const fetchData = async () => {
          const orcamentos = await listarcotacoes();
          const resultado = orcamentos.filter(item => item.dados.orcamento === id);
          setValores(resultado);

          console.log(resultado)
        };
        fetchData();
      }, []);
      
      const criarCotacao = async () => {
        const db = await initDB();

        const cotacao = {
          orcamento: id,
          fornecedor: fornecedor,
          itens: dados,
          observacao: observacao,
        };

        await db.put('cotacao', { key: Math.floor((Date.now() * Math.random()) % 10000), dados: cotacao });
        await router.push('/')
      }

    const params = useParams();
    const id = params.id;

    const router = useRouter();

  const [observacao, setObservacao] = useState("");

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white h-screen">
      <h2 className="text-2xl font-bold mb-6 text-black">Nova Cotação</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ORÇAMENTO DE COMPRA:</label>
            <input
              type="text"
              name="nome"
              value={id}
              onChange={() => console.log('s')}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />

            {
                valores.map((item) => (
                        <><label className="block text-sm font-medium text-gray-700 mb-1">FORNECEDOR:</label><input
                        type="text"
                        name="nome"
                        value={item.dados.fornecedor}
                        //   onChange={(e) => setFornecedor( e.target.value )}
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required />
                        
                        <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-semibold text-black">Lista de Produtos</h1>
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto bg-white shadow rounded">
                        <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                            <th className="py-3 px-4 border-b text-black">COD</th>
                            <th className="py-3 px-4 border-b text-black">Descrição</th>
                            <th className="py-3 px-4 border-b text-black">Marca</th>
                            <th className="py-3 px-4 border-b text-black">REF Fornecedor</th>
                            <th className="py-3 px-4 border-b text-black">Unidade</th>
                            <th className="py-3 px-4 border-b text-black">Qtd</th>
                            <th className="py-3 px-4 border-b text-black">Valor Unitario</th>
                            <th className="py-3 px-4 border-b text-black">Valor Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.dados.itens.map((item: { id: Key | null | undefined; cod: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; descricao: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; marca: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; refFornecedor: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; unidade: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; quantidade: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; valor: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b text-black">{item.cod}</td>
                                <td className="py-3 px-4 border-b text-black">{item.descricao}</td>
                                <td className="py-3 px-4 border-b text-black">{item.marca}</td>
                                <td className="py-3 px-4 border-b text-black">{item.refFornecedor}</td>
                                <td className="py-3 px-4 border-b text-black">{item.unidade}</td>
                                <td className="py-3 px-4 border-b text-black">{item.quantidade}</td>
                                <td className="py-3 px-4 border-b text-black">{item.valor}</td>
                                <td className="py-3 px-4 border-b text-black">
                                    {typeof item.valor === 'string'
                                        ? (Number(item.valor.replace(',', '.')) * Number(item.quantidade ?? 0)).toFixed(2)
                                        : String(item.valor)}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        <p className="text-black text-right my-3">
                            Valor Total: {
                            item.dados.itens
                                .reduce((acc: number, item: {
                                    quantidade: string; valor: any 
                                    }) => {
                                let valorStr = '';

                                if (typeof item.valor === 'string') {
                                    valorStr = (Number(item.valor.replace(',', '.')) * Number(item.quantidade)).toString();
                                } else if (typeof item.valor === 'number' || typeof item.valor === 'bigint') {
                                    valorStr = String(item.valor);
                                } else {
                                    valorStr = '0';
                                }

                                return acc + Number(valorStr);
                                }, 0)
                                .toFixed(2) // ✅ arredonda com 2 casas decimais
                            }

                        </p>
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mt-2">Observação</label>
                    <input
                        type="text"
                        value={observacao}
                        // onChange={(e) => setObservacao(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mt-1"
                        placeholder="Observação"
                    /></>

                        
                ))
            }


          </div>
        </div>
    </div>
  );
}
