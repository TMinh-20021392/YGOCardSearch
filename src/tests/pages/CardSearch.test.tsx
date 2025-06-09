import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardSearch } from '../../src/pages/CardSearch';
import * as ygoService from '../../src/services/ygoService';

// Mock the ygoService
jest.mock('../../src/services/ygoService');
const mockSearchCards = ygoService.searchCards as jest.MockedFunction<typeof ygoService.searchCards>;

describe('CardSearch', () => {
  const mockCards = [
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
        image_url: 'https://example.com/image.jpg',
        image_url_small: 'https://example.com/image_small.jpg'
      }],
      card_prices: [{
        cardmarket_price: '1.50',
        tcgplayer_price: '2.00',
        ebay_price: '1.75',
        amazon_price: '2.25'
      }]
    }
  ];

  beforeEach(() => {
    mockSearchCards.mockClear();
  });

  it('renders the main components', () => {
    render(<CardSearch />);

    expect(screen.getByText('Yu-Gi-Oh! Card Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search cards/i })).toBeInTheDocument();
  });

  it('displays cards after successful search', async () => {
    const user = userEvent.setup();
    mockSearchCards.mockResolvedValueOnce({ data: mockCards });

    render(<CardSearch />);

    await user.type(screen.getByLabelText(/card name/i), 'Blue-Eyes');
    await user.click(screen.getByRole('button', { name: /search cards/i }));

    await waitFor(() => {
      expect(screen.getByText('Blue-Eyes White Dragon')).toBeInTheDocument();
    });

    expect(mockSearchCards).toHaveBeenCalledWith({ fname: 'Blue-Eyes' });
  });

  it('displays loading spinner during search', async () => {
    const user = userEvent.setup();
    // Create a promise that we can control
    let resolvePromise: (value: any) => void;
    const searchPromise = new Promise(resolve => {
      resolvePromise = resolve;
    });
    mockSearchCards.mockReturnValueOnce(searchPromise);

    render(<CardSearch />);

    await user.type(screen.getByLabelText(/card name/i), 'Blue-Eyes');
    await user.click(screen.getByRole('button', { name: /search cards/i }));

    // Loading spinner should be visible
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();

    // Resolve the promise
    resolvePromise!({ data: mockCards });

    await waitFor(() => {
      expect(screen.queryByRole('status', { hidden: true })).not.toBeInTheDocument();
    });
  });

  it('displays error message when search fails', async () => {
    const user = userEvent.setup();
    mockSearchCards.mockRejectedValueOnce(new Error('API Error'));

    render(<CardSearch />);

    await user.type(screen.getByLabelText(/card name/i), 'Invalid');
    await user.click(screen.getByRole('button', { name: /search cards/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch cards. Please try again.')).toBeInTheDocument();
    });
  });

  it('opens card detail modal when card is clicked', async () => {
    const user = userEvent.setup();
    mockSearchCards.mockResolvedValueOnce({ data: mockCards });

    render(<CardSearch />);

    await user.type(screen.getByLabelText(/card name/i), 'Blue-Eyes');
    await user.click(screen.getByRole('button', { name: /search cards/i }));

    await waitFor(() => {
      expect(screen.getByText('Blue-Eyes White Dragon')).toBeInTheDocument();
    });

    // Click on the card
    await user.click(screen.getByText('Blue-Eyes White Dragon'));

    // Modal should open with detailed view
    await waitFor(() => {
      expect(screen.getAllByText('Blue-Eyes White Dragon')).toHaveLength(2); // One in grid, one in modal
    });
  });

  it('closes card detail modal when close button is clicked', async () => {
    const user = userEvent.setup();
    mockSearchCards.mockResolvedValueOnce({ data: mockCards });

    render(<CardSearch />);

    await user.type(screen.getByLabelText(/card name/i), 'Blue-Eyes');
    await user.click(screen.getByRole('button', { name: /search cards/i }));

    await waitFor(() => {
      expect(screen.getByText('Blue-Eyes White Dragon')).toBeInTheDocument();
    });

    // Click on the card to open modal
    await user.click(screen.getByText('Blue-Eyes White Dragon'));

    await waitFor(() => {
      expect(screen.getAllByText('Blue-Eyes White Dragon')).toHaveLength(2);
    });

    // Close the modal
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.getAllByText('Blue-Eyes White Dragon')).toHaveLength(1); // Only in grid
    });
  });

  it('clears previous results and errors on new search', async () => {
    const user = userEvent.setup();
    
    // First search fails
    mockSearchCards.mockRejectedValueOnce(new Error('API Error'));
    
    render(<CardSearch />);

    await user.type(screen.getByLabelText(/card name/i), 'Invalid');
    await user.click(screen.getByRole('button', { name: /search cards/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch cards. Please try again.')).toBeInTheDocument();
    });

    // Second search succeeds
    mockSearchCards.mockResolvedValueOnce({ data: mockCards });

    await user.clear(screen.getByLabelText(/card name/i));
    await user.type(screen.getByLabelText(/card name/i), 'Blue-Eyes');
    await user.click(screen.getByRole('button', { name: /search cards/i }));

    await waitFor(() => {
      expect(screen.queryByText('Failed to fetch cards. Please try again.')).not.toBeInTheDocument();
      expect(screen.getByText('Blue-Eyes White Dragon')).toBeInTheDocument();
    });
  });
});
