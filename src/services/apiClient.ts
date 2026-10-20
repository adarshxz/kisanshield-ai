// Configurable API Client with Demo Mode fallback

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const IS_DEMO_MODE = !API_BASE_URL;

export interface ApiResponse<T> {
  data: T;
  source: 'demo_mock' | 'live_api';
  timestamp: string;
  isStale?: boolean;
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (IS_DEMO_MODE) {
    throw new Error('Running in offline demo mode. API calls redirect to local demo service layer.');
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error ${response.status}: ${errorBody || response.statusText}`);
  }

  return response.json();
}
