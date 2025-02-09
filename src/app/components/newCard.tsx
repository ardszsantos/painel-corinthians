import React from 'react';

interface CardProps {
    img: string;
    title: string;
    author: string;
    date: string;
    content: string;
    url: string;
}

const NewCard: React.FC<CardProps> = ({ img, title, author, date, content, url }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg  hover:scale-105 md:hover:scale-110 transition-all">
            <a href={url} target='_blank' rel='noreferrer'>
                <img className="w-full h-[200px] " src={img} alt={title} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base pb-2">Por {author} em {date}</p>
                    <p className="text-white text-base">{content}</p>
                </div>
            </a>
        </div>
    );
};

export default NewCard;