import './home.scss'
import Navbar from '../../components/Navbar/Navbar';
import Features from '../../components/Features/Features';
import Row from '../../components/Row/Row';
import Detail from '../../components/Detail/Detail';
import axios from '../../api/axios'
import requests from '../../api/requests';

function Home() {
    return ( 
        <div className="Home">  
            <Navbar />
            <Features type={"movies"} />
            <Row title="NETFLIX ORIGINAL" fetchURL={requests.fetchNetflixOriginals} isLarged/>
            <Row title="TRENDING NOW" fetchURL={requests.fetchTrending}/>
            <Row title="Top Rate" fetchURL={requests.fetchTopRated}/>
            <Row title="Action" fetchURL={requests.fetchActionMovies}/>
            <Row title="Comedy" fetchURL={requests.fetchComedyMovies}/>
            <Row title="Horror" fetchURL={requests.fetchHorrorMovies}/>
            <Row title="Romance" fetchURL={requests.fetchRomanceMovies}/>
            <Row title="Documantaries" fetchURL={requests.fetchDocumantaries}/>
        </div>
     );
}

export default Home;