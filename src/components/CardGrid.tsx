import React from 'react';
import { YGOCard } from '../types/ygo';

interface CardGridProps {
  cards: YGOCard[];
  onCardClick: (card: YGOCard) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {cards.map(card => (
        <div
          key={card.id}
          className="cursor-pointer transform transition-transform hover:scale-105"
          onClick={() => onCardClick(card)}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={card.card_images[0].image_url_small}
              alt={card.name}
              className="w-full h-auto"
              loading="lazy"
            />
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">{card.name}</h3>
              <p className="text-xs text-gray-500">{card.type}</p>
              {card.atk !== undefined && card.def !== undefined && (
                <p className="text-xs text-gray-500">
                  ATK: {card.atk} / DEF: {card.def}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 
