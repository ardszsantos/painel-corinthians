"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import NewCard from './newCard'; // Import the NewCard component

const NEWSAPI_KEY = 'e571451976e14d369ee53f771ad58bca';
const endpoint = 'https://newsapi.org/v2/everything';

interface Article {
    title: string;
    author: string;
    source: {
        name: string;
    };
    description: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export default function NewsLoader() {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fromDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const params = {
                q: 'Corinthians',
                language: 'pt',
                from: fromDate,
                sortBy: 'publishedAt',
                apiKey: NEWSAPI_KEY,
            };

            axios
                .get(endpoint, { params })
                .then((response) => {
                    const articles: Article[] = response.data.articles;
                    if (articles && articles.length > 0) {
                        setNews(articles);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching news:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (news.length === 0) {
        return <div>No news found.</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {news.map((article, index) => {
                // Check if all required properties are present
                if (!article.title || !article.author || !article.urlToImage || !article.publishedAt || !article.content) {
                    return null;
                }

                return (
                    <NewCard
                        key={index}
                        img={article.urlToImage}
                        title={article.title}
                        author={article.author}
                        date={new Date(article.publishedAt).toLocaleDateString()}
                        content={article.content}
                    />
                );
            })}
        </div>
    );
}