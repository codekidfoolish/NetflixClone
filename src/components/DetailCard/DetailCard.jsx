import './detailCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPlay, faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

function DetailCard({ movie, closeModal }) {

    return (
        <>
            <div className="detail-card">
                <div onClick={() => closeModal(false)} className="detail-overlay">
                            <div  className="modal">
                                <div className="modal-top"
                                    style={{
                                        backgroundSize: "cover",
                                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                                    }}>
                                    <div onClick={() => closeModal(false)} className="modal-close">
                                        <FontAwesomeIcon className='close-icon' icon={faClose} />
                                    </div>
                                    <div className="top-content" >
                                        <h2 className="top-title">
                                            {movie?.title || movie?.name || movie?.original_name}
                                        </h2>
                                        <div className="top-button">
                                            <div className="play-btn">
                                                <FontAwesomeIcon className='play-icon' icon={faPlay} />
                                                Play
                                            </div>
                                            <span className="add-btn btn">
                                                <FontAwesomeIcon className='add-icon' icon={faPlus} />
                                            </span>
                                            <span className="like-btn btn">
                                                <FontAwesomeIcon className='add-icon' icon={faThumbsUp} />
                                            </span>
                                            <span className="unlike-btn btn">
                                                <FontAwesomeIcon className='add-icon' icon={faThumbsDown} />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-linear"></div>
                                </div>
                                <div className="modal-bottom">
                                    <div className="bottom-left">
                                        <div className="info-list">
                                            <span className="info-item highlight"> {movie?.vote_average} Rate</span>
                                            <span className="info-item">{movie?.first_air_date}</span>
                                            <span className="info-item">1h43p</span>
                                            <span className="info-item border">HD</span>
                                        </div>
                                        <p className="infor-content">
                                            {movie?.overview}
                                        </p>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>

        </>
    );
}

export default DetailCard;