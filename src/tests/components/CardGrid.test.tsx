import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardGrid } from '../../src/components/CardGrid';
import { YGOCard } from '../../src/types/ygo';

describe('CardGrid', () => {
  const mockCards: YGOCard[] = [
    {
      id: 1,
      name: 'Blue-Eyes White Dragon',
      type: 'Normal Monster',
      desc: 'This legendary dragon is a powerful engine of destruction.',
      atk: 3000,
      def: 2500,
      level: 8,
      race: 'Dragon',
      attribute: 'LIGHT',
      card_images: [{
        id: 1,
        image_url: 'https://example.com/image1.jpg',
        image_url_small: 'https://example.com/image1_small.jpg'
      }],
      card_prices: [{
        cardmarket_price: '1.50',
        tcgplayer_price: '2.00',
        ebay_price: '1.75',
        amazon_price: '2.25'
      }]
    },
    {
      id: 2,
      name: 'Dark Magician',
      type: 'Normal Monster',
      desc: 'The ultimate wizard in terms of attack and defense.',
      atk: 2500,
      def: 2100,
      level: 7,
      race: 'Spellcaster',
      attribute: 'DARK',
      card_images: [{
        id: 2,
        image_url: 'https://example.com/image2.jpg',
        image_url_small: 'https://example.com/image2_small.jpg'
      }],
      card_prices: [{
        cardmarket_price: '1.25',
        tcgplayer_price: '1.50',
        ebay_price: '1.30',
        amazon_price: '1.75'
      }]
    }
  ];

  const mockOnCardClick = jest.fn();

  beforeEach(() => {
    mockOnCardClick.mockClear();
  });

  it('renders all cards', () => {
    render(<CardGrid cards={mockCards} onCardClick={mockOnCardClick} />);

    expect(screen.getByText('Blue-Eyes White Dragon')).toBeInTheDocument();
    expect(screen.getByText('Dark Magician')).toBeInTheDocument();
    expect(screen.getByText('ATK: 3000 / DEF: 2500')).toBeInTheDocument();
    expect(screen.getByText('ATK: 2500 / DEF: 2100')).toBeInTheDocument();
  });

  it('renders card images with correct src and alt attributes', () => {
    render(<CardGrid cards={mockCards} onCardClick={mockOnCardClick} />);

    const blueEyesImage = screen.getByAltText('Blue-Eyes White Dragon');
    const darkMagicianImage = screen.getByAltText('Dark Magician');

    expect(blueEyesImage).toHaveAttribute('src', 'https://example.com/image1_small.jpg');
    expect(darkMagicianImage).toHaveAttribute('src', 'https://example.com/image2_small.jpg');
  });

  it('calls onCardClick when a card is clicked', async () => {
    const user = userEvent.setup();
    render(<CardGrid cards={mockCards} onCardClick={mockOnCardClick} />);

    await user.click(screen.getByText('Blue-Eyes White Dragon'));

    expect(mockOnCardClick).toHaveBeenCalledWith(mockCards[0]);
  });

  it('renders empty grid when no cards provided', () => {
    const { container } = render(<CardGrid cards={[]} onCardClick={mockOnCardClick} />);
    
    expect(container.firstChild?.childNodes).toHaveLength(0);
  });

  it('handles cards without ATK/DEF values', () => {
    const spellCard: YGOCard = {
      id: 3,
      name: 'Mystical Space Typhoon',
      type: 'Spell Card',
      desc: 'Target 1 Spell/Trap on the field; destroy it.',
      race: 'Spell',
      card_images: [{
        id: 3,
        image_url: 'https://example.com/spell.jpg',
        image_url_small: 'https://example.com/spell_small.jpg'
      }],
      card_prices: [{
        cardmarket_price: '0.50',
        tcgplayer_price: '0.75',
        ebay_price: '0.60',
        amazon_price: '0.80'
      }]
    };

    render(<CardGrid cards={[spellCard]} onCardClick={mockOnCardClick} />);

    expect(screen.getByText('Mystical Space Typhoon')).toBeInTheDocument();
    expect(screen.getByText('Spell Card')).toBeInTheDocument();
    expect(screen.queryByText(/ATK:/)).not.toBeInTheDocument();
  });
});
