import timao from '../assets/images/timao.png';


const NewsCard = ({ title, description }) => {

    return (
        <div style={{ border: '1px solid #ccc', padding: '26px', margin: '8px', maxWidth: '300px' }}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default NewsCard;
