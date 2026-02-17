import { createContext, useState, useEffect } from "react";

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path?: string;
    overview?: string;
    vote_average: number;
}

interface MovieContextType {
    favourites: Movie[];
    addToFavourites: (movie: Movie) => void;
    removeFromFavourites: (movieId: number) => void;
    isFavourite: (movieId: number) => boolean;

    watchlist: Movie[];
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (movieId: number) => void;
    isOnWatchlist: (movieId: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
    children: React.ReactNode;
}

const MovieProvider: React.FC<MovieProviderProps> = ({children}) => {
    const [favourites, setFavourites] = useState<Movie[]>([]);

    useEffect(() => {
        const storedFavourites = localStorage.getItem("favourites");

        if (storedFavourites) setFavourites(JSON.parse(storedFavourites))
        }, []);

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites))
    }, [favourites]);

    const addToFavourites = (movie: Movie) => {
        setFavourites([...favourites, movie]);
    };

    const removeFromFavourites = (movieId: number) => {
        setFavourites(favourites.filter((movie) => movie.id !== movieId))
    }

    const isFavourite = (movieId: number) => {
        return favourites.some((movie) => movie.id === movieId)
    }

    const [watchlist, setWatchlist] = useState<Movie[]>([]);

    useEffect(() => {
        const storedWatchlist = localStorage.getItem("watchlist");

        if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist))
        }, []);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }, [watchlist]);

    const addToWatchlist = (movie: Movie) => {
        setWatchlist([...watchlist, movie]);
    };

    const removeFromWatchlist = (movieId: number) => {
        setWatchlist(watchlist.filter((movie) => movie.id !== movieId))
    }

    const isOnWatchlist = (movieId: number) => {
        return watchlist.some((movie) => movie.id === movieId)
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isOnWatchlist
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}

export { MovieProvider, MovieContext }