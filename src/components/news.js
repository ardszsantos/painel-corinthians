import timao from '../assets/images/timao.png';
import NewsCard from './newsCard';

const News = () => {
    const cardsData = [
        { title: 'Card 1', description: 'This is the first card.' },
        { title: 'Card 2', description: 'This is the second card.' },
        { title: 'Card 3', description: 'This is the third card.' },
        // Add more objects as needed
    ];

    return (
        <div>
            {cardsData.map((card, index) => (
                <NewsCard key={index} title={card.title} description={card.description} />
            ))}
        </div>
    );
};


export default News;
