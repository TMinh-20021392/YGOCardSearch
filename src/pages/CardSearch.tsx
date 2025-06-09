import React, { useState } from 'react';
import { SearchForm } from '../components/SearchForm';
import { CardGrid } from '../components/CardGrid';
import { CardDetail } from '../components/CardDetail';
import { searchCards } from '../services/ygoService';
import { YGOCard, SearchParams } from '../types/ygo';

export const CardSearch: React.FC = () => {
  const [cards, setCards] = useState<YGOCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<YGOCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchCards(params);
      setCards(response.data);
    } catch (err) {
      setError('Failed to fetch cards. Please try again.');
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Yu-Gi-Oh! Card Search</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <SearchForm onSearch={handleSearch} />

          {error && (
            <div className="mt-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <CardGrid cards={cards} onCardClick={setSelectedCard} />
          )}
        </div>
      </main>

      <CardDetail card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}; 
