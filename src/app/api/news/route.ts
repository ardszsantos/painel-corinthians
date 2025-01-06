import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const language = searchParams.get('language');
    const from = searchParams.get('from');
    const sortBy = searchParams.get('sortBy');

    const NEWSAPI_KEY = 'e571451976e14d369ee53f771ad58bca';
    const endpoint = 'https://newsapi.org/v2/everything';

    try {
        const response = await axios.get(endpoint, {
            params: {
                q,
                language,
                from,
                sortBy,
                apiKey: NEWSAPI_KEY,
            },
        });

        return NextResponse.json(response.data);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
