import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faListCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { useMovieContext } from '../services/useMovieContext';
import '../styles/MovieCard.css';

function MovieCard({ movie }:
    { movie: { 
        id: number,
        title: string,
        release_date: string,
        poster_path?: string,
        overview?: string;
        vote_average: number;    
    } }) {

    const { isFavourite, addToFavourites, removeFromFavourites,
        isOnWatchlist, addToWatchlist, removeFromWatchlist } = useMovieContext();

    const favourite = isFavourite(movie.id);
    const watchlist = isOnWatchlist(movie.id);

    const [year, month] = movie.release_date?.split('-') || [];

    function onFavouriteClick(e: React.MouseEvent) {
        e.preventDefault();
        if (favourite) removeFromFavourites(movie.id);
        else addToFavourites(movie);
    }

    function onWatchlistClick(e: React.MouseEvent) {
        e.preventDefault();
        if (watchlist) removeFromWatchlist(movie.id);
        else addToWatchlist(movie);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                {movie.poster_path ? (
                    <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title} 
                    />
                ) : (
                    <div className="no-poster">
                        No Poster
                    </div>
                )}

                <div className="movie-overlay">
                    <button className={`favourite-btn ${favourite ? "active" : ""}`}
                        onClick={onFavouriteClick}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className={`watchlist-btn ${watchlist ? "active" : ""}`}
                        onClick={onWatchlistClick}>
                        <FontAwesomeIcon icon={faListCheck} />
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{month}.{year}</p>
                <p>{movie.vote_average.toFixed(1)} <FontAwesomeIcon icon={faStar}/></p>
            </div>
        </div>
    )
}

export default MovieCard