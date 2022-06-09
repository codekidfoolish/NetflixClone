import { useEffect, useState } from 'react'
import './features.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer';
import axios from '../../api/axios'
import requests from '../../api/requests'
import Detail from '../Detail/Detail'

function Features({ type }) {
    const [movie, setMovie] = useState([])
    const [showDetail, setShowDetail] = useState(false)

    const [trailerURL, setTrailerURL] = useState('')

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchActionMovies)
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length ) || 15
                ]
            )
            return request
        }
        fetchData();
    }, [])

    //TRAILER YOUTUBE
   
    const handleVideo = (movie) => {
        if (trailerURL) {
            setTrailerURL('')
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "sonic")
                .then((url) => {
                    // url = https://www.youtube.com/watch?v=yQEondeGvKo
                    const urlParam = new URLSearchParams(new URL(url).search)
                    // urlParam = watch?v=yQEondeGvKo
                    setTrailerURL(urlParam.get("v"))
                    //setTrailerURL = yQEondeGvKo
        
                })
                .catch((error => alert('phim nay hien khong co trailer')))
        }
    }

    const opts = {
        height: "900",
        width: "100%",

        playerVars: {
            autoplay: 1
        },
    }

    return (
        <div className="features">
            <div className="features-img" style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}>
                {
                    trailerURL && <Youtube className="youtubeTrailer" videoId={trailerURL} opts={opts} />
                }
            </div>
            <div className={trailerURL ? "features-bottoms" :"features-bottom"}></div>
            <div className="info">
                <h1 className="movie-title">{
                    movie?.title || movie?.name || movie?.original_name
                }</h1>
                <h5 className="movie-dsc">{movie?.overview}</h5>
                <div className="movie-btn">
                    <button  onClick={() => handleVideo(movie)} className="btn">
                        {
                            trailerURL ? <FontAwesomeIcon  className='icon' icon={faPause} /> : <FontAwesomeIcon  className='icon' icon={faPlay} />
                        }
                        
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