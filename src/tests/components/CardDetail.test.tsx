import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardDetail } from '../../src/components/CardDetail';
import { YGOCard } from '../../src/types/ygo';

describe('CardDetail', () => {
  const mockCard: YGOCard = {
    id: 1,
    name: 'Blue-Eyes White Dragon',
    type: 'Normal Monster',
    desc: 'This legendary dragon is a powerful engine of destruction.\nVirtually invincible, very few have faced this awesome creature and lived to tell the tale.',
    atk: 3000,
    def: 2500,
    level: 8,
    race: 'Dragon',
    attribute: 'LIGHT',
    card_images: [{
      id: 1,
      image_url: 'https://example.com/image.jpg',
      image_url_small: 'https://example.com/image_small.jpg'
    }],
    card_prices: [{
      cardmarket_price: '1.50',
      tcgplayer_price: '2.00',
      ebay_price: '1.75',
      amazon_price: '2.25'
    }]
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders nothing when card is null', () => {
    const { container } = render(<CardDetail card={null} onClose={mockOnClose} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders card details when card is provided', () => {
    render(<CardDetail card={mockCard} onClose={mockOnClose} />);

    expect(screen.getByText('Blue-Eyes White Dragon')).toBeInTheDocument();
    expect(screen.getByText('Normal Monster')).toBeInTheDocument();
    expect(screen.getByText('LIGHT')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('3000')).toBeInTheDocument();
    expect(screen.getByText('2500')).toBeInTheDocument();
    expect(screen.getByText('Dragon')).toBeInTheDocument();
    expect(screen.getByText(/This legendary dragon is a powerful engine of destruction/)).toBeInTheDocument();
  });

  it('renders price information', () => {
    render(<CardDetail card={mockCard} onClose={mockOnClose} />);

    expect(screen.getByText('Cardmarket: $1.50')).toBeInTheDocument();
    expect(screen.getByText('TCGPlayer: $2.00')).toBeInTheDocument();
    expect(screen.getByText('eBay: $1.75')).toBeInTheDocument();
    expect(screen.getByText('Amazon: $2.25')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<CardDetail card={mockCard} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders card image with correct src', () => {
    render(<CardDetail card={mockCard} onClose={mockOnClose} />);

    const image = screen.getByAltText('Blue-Eyes White Dragon');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('handles cards without optional fields', () => {
    const spellCard: YGOCard = {
      id: 2,
      name: 'Mystical Space Typhoon',
      type: 'Spell Card',
      desc: 'Target 1 Spell/Trap on the field; destroy it.',
      race: 'Spell',
      card_images: [{
        id: 2,
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

    render(<CardDetail card={spellCard} onClose={mockOnClose} />);

    expect(screen.getByText('Mystical Space Typhoon')).toBeInTheDocument();
    expect(screen.getByText('Spell Card')).toBeInTheDocument();
    expect(screen.queryByText('Attribute')).not.toBeInTheDocument();
    expect(screen.queryByText('Level/Rank')).not.toBeInTheDocument();
    expect(screen.queryByText('ATK')).not.toBeInTheDocument();
    expect(screen.queryByText('DEF')).not.toBeInTheDocument();
  });

  it('preserves line breaks in card description', () => {
    render(<CardDetail card={mockCard} onClose={mockOnClose} />);

    const description = screen.getByText(/This legendary dragon is a powerful engine of destruction/);
    expect(description).toHaveClass('whitespace-pre-wrap');
  });
});
