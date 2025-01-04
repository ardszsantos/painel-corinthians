import timao from '../assets/images/timao.png';
import NewsCard from './newsCard';
import axios from 'axios';
import { useState, useEffect } from 'react';

const News = () => {
    const [firstDescription, setFirstDescription] = useState('');

    const fetchNews = async () => {
        const url = 'https://newsapi.org/v2/everything?q=corinthians&apiKey=e571451976e14d369ee53f771ad58bca';

        try {
            const response = await axios.get(url);
            const firstArticle = response.data.articles[0];
            if (firstArticle) {
                setFirstDescription(firstArticle.description || 'No description available');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const cardsData = [
        { title: 'Card 1', description: firstDescription },
        { title: 'Card 2', description: 'This is the second card.' },
        { title: 'Card 3', description: 'This is the third card.' },
        // Add more objects as needed
    ];

    return (
        <div className='flex'>
            {cardsData.map((card, index) => (
                <NewsCard key={index} title={card.title} description={card.description} />
            ))}
        </div>
    );
};

export default News;
