'use client';

import { useState } from 'react';
import { X, Save, BookOpen } from 'lucide-react';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookFormData {
  title: string;
  author: string;
  description: string;
  genreId: string;
  isbn: string;
  publicationYear: string;
  totalCopies: string;
  coverUrl: string;
}

export const AddBookModal = ({ isOpen, onClose }: AddBookModalProps) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: '',
    genreId: '',
    isbn: '',
    publicationYear: '',
    totalCopies: '1',
    coverUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aqui você implementaria a chamada para a API
      console.log('Dados do livro:', formData);

      // Simulação de delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset do formulário após sucesso
      setFormData({
        title: '',
        author: '',
        description: '',
        genreId: '',
        isbn: '',
        publicationYear: '',
        totalCopies: '1',
        coverUrl: '',
      });

      onClose();
      alert('Livro cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      alert('Erro ao cadastrar livro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const genres = [
    { id: '1', name: 'Romance' },
    { id: '2', name: 'Tecnologia' },
    { id: '3', name: 'Fantasia' },
    { id: '4', name: 'Distopia' },
    { id: '5', name: 'Autoajuda' },
    { id: '6', name: 'Fábula' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-stone-900 text-white rounded-2xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">Adicionar Novo Livro</h2>
                <p className="text-stone-500 text-sm">Preencha as informações do livro</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-stone-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  Título *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                  placeholder="Digite o título do livro"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  Autor *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                  placeholder="Nome do autor"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  Gênero *
                </label>
                <select
                  name="genreId"
                  value={formData.genreId}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                >
                  <option value="">Selecione um gênero</option>
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  ISBN
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                  placeholder="978-85-1234-5678"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  Ano de Publicação
                </label>
                <input
                  type="number"
                  name="publicationYear"
                  value={formData.publicationYear}
                  onChange={handleInputChange}
                  min="1000"
                  max={new Date().getFullYear()}
                  className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  Número de Exemplares *
                </label>
                <input
                  type="number"
                  name="totalCopies"
                  value={formData.totalCopies}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                  placeholder="1"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  URL da Capa
                </label>
                <input
                  type="url"
                  name="coverUrl"
                  value={formData.coverUrl}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                  placeholder="https://exemplo.com/capa.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm resize-none"
                  placeholder="Descrição do livro..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-stone-600 hover:text-stone-900 font-bold transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Salvando...' : 'Adicionar Livro'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};