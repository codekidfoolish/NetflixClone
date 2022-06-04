import './row.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requests from '../../api/requests';
import axios from 'axios'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer';
import Detail from '../Detail/Detail'

function Row({ title, fetchURL, isLarged }) {
    const [isMoved, setIsMoved] = useState(false)
    const [number, setNumber] = useState(0)
    const [showDetail, setShowDetail] = useState(false)

    const [movies, setMovies] = useState([])
    const [trailerURL, setTrailerURL] = useState('')

    const SlideList = useRef()
    const AngleRightIcon = useRef()

    let navigate = useNavigate()

    // GET API
    const base_URL = 'https://image.tmdb.org/t/p/original/'
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3${fetchURL}`)
            setMovies(request.data.results)
            return request
        }
        fetchData();
    }, [fetchURL])

    //TRAILER YOUTUBE
    const handleVideo = (movie) => {
        if (trailerURL) {
            setTrailerURL('')
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
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
        height: "390",
        width: "100%",

        playerVars: {
            autoplay: 1
        },
    }

    // SLIDE HANDLE
    const handleSlide = (direction) => {
        setIsMoved(true)
        let distance = SlideList.current.getBoundingClientRect().x - 50
        if (direction === 'left' && number > 0) {
            setNumber(number - 1)
            SlideList.current.style.transform = `translateX(${230 + distance}px)`
        }
        if (direction === 'right' && number < 16) {
            setNumber(number + 1)
            SlideList.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }



    return (
        <div className="row">
            <h1 className="row-title">{title}</h1>
            <div className="row-posters">
                <FontAwesomeIcon onClick={e => handleSlide('left')}
                    className="icon left" icon={faAngleLeft}
                    style={{ display: !isMoved && 'none' }}
                />
                <div ref={SlideList} className="row-list">
                    {
                        movies.map((movie) => (

                            <div className='row-item' key={movie.id}>
                                <img src={`${base_URL}${isLarged ? movie.poster_path : movie.backdrop_path}`}
                                    // onClick={() => navigate(`/detail/:${movie.id}`)}
                                    alt={movie.name}
                                    className={isLarged ? "row-posters-large" : "row-posters"} />
                                <button className="info-btn">
                                    <FontAwesomeIcon className='info-icon'
                                        // onClick={() => navigate(`/detail/:${movie.id}`)}
                                        icon={faInfoCircle} />
                                    <FontAwesomeIcon className='info-icon'
                                        onClick={() => handleVideo(movie)}
                                        icon={faPlay} />
                                </button>
                            </div>

                        ))
                    }
                </div>
                <FontAwesomeIcon onClick={e => handleSlide('right')}
                    className="icon right" icon={faAngleRight}
                    ref={AngleRightIcon}
                />

            </div>
            {
                trailerURL && <Youtube videoId={trailerURL} opts={opts} />
            }
        </div>
    );
}


export default Row;