import React, { useState } from 'react';
import { SearchParams } from '../types/ygo';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="fname" className="block text-sm font-medium text-gray-700">Card Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={searchParams.fname || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search cards..."
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Card Type</label>
          <select
            id="type"
            name="type"
            value={searchParams.type || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="Effect Monster">Effect Monster</option>
            <option value="Fusion Monster">Fusion Monster</option>
            <option value="Synchro Monster">Synchro Monster</option>
            <option value="XYZ Monster">XYZ Monster</option>
            <option value="Link Monster">Link Monster</option>
            <option value="Spell Card">Spell Card</option>
            <option value="Trap Card">Trap Card</option>
          </select>
        </div>

        <div>
          <label htmlFor="attribute" className="block text-sm font-medium text-gray-700">Attribute</label>
          <select
            id="attribute"
            name="attribute"
            value={searchParams.attribute || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Attributes</option>
            <option value="DARK">DARK</option>
            <option value="LIGHT">LIGHT</option>
            <option value="EARTH">EARTH</option>
            <option value="WATER">WATER</option>
            <option value="FIRE">FIRE</option>
            <option value="WIND">WIND</option>
            <option value="DIVINE">DIVINE</option>
          </select>
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level/Rank</label>
          <input
            type="number"
            id="level"
            name="level"
            min="1"
            max="12"
            value={searchParams.level || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="atk" className="block text-sm font-medium text-gray-700">ATK</label>
          <input
            type="number"
            id="atk"
            name="atk"
            value={searchParams.atk || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="def" className="block text-sm font-medium text-gray-700">DEF</label>
          <input
            type="number"
            id="def"
            name="def"
            value={searchParams.def || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search Cards
        </button>
      </div>
    </form>
  );
}; 
