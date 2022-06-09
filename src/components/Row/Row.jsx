import './row.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requests from '../../api/requests';
import axios from 'axios'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer';
import DetailCard from '../DetailCard/DetailCard';

function Row({ title, fetchURL, isLarged }) {
    const [isMoved, setIsMoved] = useState(false)
    const [showFilm, setShowFilm] = useState(false)
    const [showModal, setShowModal] = useState([])
    const [number, setNumber] = useState(0)
    
    const [movies, setMovies] = useState([])
    const [trailerURL, setTrailerURL] = useState('')

    const SlideList = useRef(null)
    const AngleRightIcon = useRef(null)

    let navigate = useNavigate()

    // CALL API
    const base_URL = 'https://image.tmdb.org/t/p/original/'
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3${fetchURL}`)
            setMovies(request.data.results)
            setShowModal(request.data.results)
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
            SlideList.current.style.transform = `translateX(${200 + distance}px)`
        }
        if (direction === 'right' && number < 16) {
            setNumber(number + 1)
            SlideList.current.style.transform = `translateX(${-200 + distance}px)`
        }
    }

    const handleModal = (id) => {
        setNumber(id)
        setShowFilm(!showFilm)
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
                        movies.map((movie, index) => (

                            <div className='row-item' key={movie.id}>
                                <img src={`${base_URL}${movie.poster_path}`}
                                    alt={movie.name}
                                    className= "row-posters-large"  />
                                <button className="info-btn">
                                    <FontAwesomeIcon className='info-icon'
                                        onClick={() => handleModal(index)}
                                        icon={faInfoCircle} />
                                    <FontAwesomeIcon className='info-icon'
                                        onClick={() => handleVideo(movie)}
                                        icon={faPlay} />
                                </button>
                            </div>

                        ))
                    }
                    {
                        showFilm && <DetailCard movie={showModal[number]} closeModal={setShowFilm} />
                    }
                </div>
                <div ref={AngleRightIcon}
                    className="angleright-icon">
                    <FontAwesomeIcon onClick={e => handleSlide('right')}
                        className="icon right" icon={faAngleRight}
                    />
                </div>

            </div>
            {
                trailerURL && <Youtube videoId={trailerURL} opts={opts} />
            }
        </div>
    );
}


export default Row;