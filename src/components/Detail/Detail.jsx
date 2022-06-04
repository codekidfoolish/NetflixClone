import './detail.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPlay, faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'


function Detail({ movieBanner, closeMovieBanner }) {

    const closeModals = () => {
        closeMovieBanner(false)
    }

    return (
        <div className="detail">
            <div className="detail-overlay">
                <div className="modal">
                    <div className="modal-top"
                        style={{
                            backgroundSize: "cover",
                            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieBanner?.backdrop_path}")`,
                        }}>
                        <div onClick={closeModals} className="modal-close">
                            <FontAwesomeIcon className='close-icon' icon={faClose} />
                        </div>
                        <div className="top-content" >
                            <h2 className="top-title">
                                {movieBanner?.title || movieBanner?.name || movieBanner?.original_name}
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
                                <span className="info-item highlight"> {movieBanner?.vote_average} Rate</span>
                                <span className="info-item">{movieBanner?.first_air_date.slice(0, 4)}</span>
                                <span className="info-item">1h43p</span>
                                <span className="info-item border">HD</span>
                            </div>
                            <p className="infor-content">
                                {movieBanner?.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Detail;