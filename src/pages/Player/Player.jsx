import React, { useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const {id} = useParams();
  const navigate=useNavigate();
  const [apiData,setApiData] = React.useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  });
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTMxYjZmOGQ2ZWJkNTc2MTg0ZjZhMWE2MTU5NTU1ZiIsIm5iZiI6MTczNjY5NDUxOS4xMjksInN1YiI6IjY3ODNkYWY3MTJjZjliMjkxNTRlNzZhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GpqkC5ge_DdA3KgECsULVjNOMTZxklMjAF_pRK0RBjE'
    }
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[id]);
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <p>{apiData.published_at.slice(0,10)}</p>
      <p>{apiData.name}</p>
      <p>{apiData.type}</p>
    </div>
  )
}
export default Player
