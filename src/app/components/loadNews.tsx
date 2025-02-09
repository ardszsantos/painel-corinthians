"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import NewCard from './newCard';
import { ClipLoader } from 'react-spinners';

interface Article {
    title: string;
    author: string;
    url: string;
    source: {
        name: string;
    };
    description: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export default function NewsLoader() {
    const [allNews, setAllNews] = useState<Article[]>([]);
    const [displayedNews, setDisplayedNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fromDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0];
            const params = {
                q: 'Corinthians',
                language: 'pt',
                from: fromDate,
                sortBy: 'publishedAt',
            };

            axios
                .get('/api/news', { params })
                .then((response) => {
                    const articles: Article[] = response.data.articles;
                    if (articles && articles.length > 0) {
                        setAllNews(articles);
                        setDisplayedNews(articles.slice(0, 9));
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

    const loadMore = () => {
        const newCount = visibleCount + 9;
        setVisibleCount(newCount);
        setDisplayedNews(allNews.slice(0, newCount));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <ClipLoader color="#123abc" loading={loading} size={100} />
            </div>
        );
    }

    if (displayedNews.length === 0) {
        return <div>No news found.</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedNews.map((article, index) => {
                    if (
                        !article.title ||
                        !article.author ||
                        !article.urlToImage ||
                        !article.publishedAt ||
                        !article.content
                    ) {
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
                            url={article.url}
                        />
                    );
                })}
            </div>
            {visibleCount < allNews.length && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={loadMore}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
