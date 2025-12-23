import { ScanResponse } from '../types';

// Config proxy (setting di vite.config.ts)
const API_BASE_URL = '/api'; 

export const scanUrl = async (url: string): Promise<ScanResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Gagal scan URL');
    }

    return data as ScanResponse;
  } catch (error: any) {
    throw new Error(error.message || 'Koneksi error');
  }
};