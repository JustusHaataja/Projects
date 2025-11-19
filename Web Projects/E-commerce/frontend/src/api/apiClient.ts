const API_URL = import.meta.env.API_URL;

export async function getJSON<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}