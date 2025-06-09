import { SearchParams, YGOAPIResponse } from '../types/ygo';

const BASE_URL = 'https://db.ygoprodeck.com/api/v7';

export const searchCards = async (params: SearchParams): Promise<YGOAPIResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params.fname) queryParams.append('fname', params.fname);
  if (params.type) queryParams.append('type', params.type);
  if (params.race) queryParams.append('race', params.race);
  if (params.attribute) queryParams.append('attribute', params.attribute);
  if (params.level) queryParams.append('level', params.level.toString());
  if (params.atk) queryParams.append('atk', params.atk.toString());
  if (params.def) queryParams.append('def', params.def.toString());

  const response = await fetch(`${BASE_URL}/cardinfo.php?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cards');
  }

  return response.json();
};

export const getCardById = async (id: number): Promise<YGOAPIResponse> => {
  const response = await fetch(`${BASE_URL}/cardinfo.php?id=${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch card');
  }

  return response.json();
}; 
