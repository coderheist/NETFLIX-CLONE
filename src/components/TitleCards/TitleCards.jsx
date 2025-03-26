import React, {useEffect,useRef} from 'react'
import cards_data from '../../assets/cards/Cards_data.js'
import './TitleCards.css'
import { Link } from 'react-router-dom';

const TitleCards = ({title,category}) => {
  const [apiData,setApiData] = React.useState([]);
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTMxYjZmOGQ2ZWJkNTc2MTg0ZjZhMWE2MTU5NTU1ZiIsIm5iZiI6MTczNjY5NDUxOS4xMjksInN1YiI6IjY3ODNkYWY3MTJjZjliMjkxNTRlNzZhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GpqkC5ge_DdA3KgECsULVjNOMTZxklMjAF_pRK0RBjE'
    }
  };
  
  
  const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res); // Check if the data is correct
        if (res.results) {
          setApiData(res.results); // Update state with fetched movie data
        }
      })
      .catch(err => console.error(err));
  
    cardsRef.current.addEventListener('wheel', handleWheel);

    return () => {
      cardsRef.current.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="cards-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return(
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards
   


