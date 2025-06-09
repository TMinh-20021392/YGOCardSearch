import { searchCards, getCardById } from '../../src/services/ygoService';
import { SearchParams } from '../../src/types/ygo';

// Mock fetch
const mockFetch = global.fetch as jest.Mock;

describe('ygoService', () => {
  const mockCard = {
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
  };

  const mockResponse = {
    data: [mockCard]
  };

  describe('searchCards', () => {
    it('should fetch cards with correct URL and parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const params: SearchParams = {
        fname: 'Blue-Eyes',
        type: 'Normal Monster',
        attribute: 'LIGHT',
        level: 8,
        atk: 3000,
        def: 2500
      };

      const result = await searchCards(params);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=Blue-Eyes&type=Normal+Monster&attribute=LIGHT&level=8&atk=3000&def=2500'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty search parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await searchCards({});

      expect(mockFetch).toHaveBeenCalledWith(
        'https://db.ygoprodeck.com/api/v7/cardinfo.php?'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(searchCards({ fname: 'test' })).rejects.toThrow('Failed to fetch cards');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(searchCards({ fname: 'test' })).rejects.toThrow('Network error');
    });
  });

  describe('getCardById', () => {
    it('should fetch card by ID with correct URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getCardById(123);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://db.ygoprodeck.com/api/v7/cardinfo.php?id=123'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(getCardById(999)).rejects.toThrow('Failed to fetch card');
    });
  });
});
