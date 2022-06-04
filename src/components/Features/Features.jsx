import {useEffect, useState} from 'react'
import './features.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons'
import axios from '../../api/axios'
import requests from '../../api/requests'
import Detail from '../Detail/Detail'

function Features({ type }) {
    const [movie, setMovie] = useState([])
    const [showDetail, setShowDetail] = useState(false)
  
   useEffect(() => {
    async function fetchData() {
        const request = await axios.get(requests.fetchNetflixOriginals)
        setMovie(
            request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1 )
            ]
        )
       return request
    }
    fetchData();    
   }, [])
    return (
        <div className="features">
            {
                type && (
                    <div className="category">
                        <span className="title">{type === 'movies' ? "Movies" : "Series"}</span>
                        <select name="genre" id="genre">
                            <option>Genre</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-fi</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentary</option>
                        </select>
                    </div>
                )
            }
            <div className="features-img" style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center" ,
                
            }}>
            </div>
            <div className="features-bottom"></div>
            <div className="info">
                <h1 className="movie-title">{
                    movie?.title  || movie?.name || movie?.original_name
                }</h1>
                <p className="movie-dsc">{movie?.overview}</p>
                <div className="movie-btn">
                    <button className="btn">
                        <FontAwesomeIcon className='icon' icon={faPlay} />
                        <span className="icon-dsc">Play</span>
                    </button>
                    <button onClick={() => setShowDetail(!showDetail)} className="info-btn btn">
                        <FontAwesomeIcon className='info-icon' icon={faInfoCircle} />
                        <span className="icon-dsc">Info</span>
                    </button>
                </div>
            </div>
            { 
                showDetail && <Detail movieBanner={movie} closeMovieBanner={setShowDetail} />
            }
        </div>
    );
}

export default Features;