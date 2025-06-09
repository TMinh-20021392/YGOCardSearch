import React from 'react';
import { YGOCard } from '../types/ygo';

interface CardDetailProps {
  card: YGOCard | null;
  onClose: () => void;
}

export const CardDetail: React.FC<CardDetailProps> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">{card.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={card.card_images[0].image_url}
                alt={card.name}
                className="w-full rounded-lg"
              />
            </div>

            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{card.type}</dd>
                </div>

                {card.attribute && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Attribute</dt>
                    <dd className="mt-1 text-sm text-gray-900">{card.attribute}</dd>
                  </div>
                )}

                {card.level && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Level/Rank</dt>
                    <dd className="mt-1 text-sm text-gray-900">{card.level}</dd>
                  </div>
                )}

                {card.atk !== undefined && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">ATK</dt>
                    <dd className="mt-1 text-sm text-gray-900">{card.atk}</dd>
                  </div>
                )}

                {card.def !== undefined && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">DEF</dt>
                    <dd className="mt-1 text-sm text-gray-900">{card.def}</dd>
                  </div>
                )}

                <div>
                  <dt className="text-sm font-medium text-gray-500">Race</dt>
                  <dd className="mt-1 text-sm text-gray-900">{card.race}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{card.desc}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Card Market Prices</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="space-y-1">
                      <li>Cardmarket: ${card.card_prices[0].cardmarket_price}</li>
                      <li>TCGPlayer: ${card.card_prices[0].tcgplayer_price}</li>
                      <li>eBay: ${card.card_prices[0].ebay_price}</li>
                      <li>Amazon: ${card.card_prices[0].amazon_price}</li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
