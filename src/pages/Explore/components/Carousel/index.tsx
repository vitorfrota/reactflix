import { useEffect, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiPlus } from 'react-icons/fi';

import { Button } from '@/components';
import * as S from './styles';

interface Movie {
   id: number;
   title: string;
   overview: string;
   backdrop_path: string;
}

interface CarouselProps {
   movies: Movie[];
}

const SECONDS_TO_SHOW_NEXT_MOVIE = 6 * 100 * 10; // 6 seconds

const Carousel = ({ movies }: CarouselProps) => {
   const navigate = useNavigate();

   const [movieToShow, setMovieToShow] = useState(0);
   const [currentMovie, setCurrentMovie] = useState<Movie>({} as Movie);

   useEffect(() => {
      movieToShow < movies.length
         ? setCurrentMovie(movies[movieToShow])
         : setMovieToShow(0);
   }, [movieToShow]);

   useEffect(() => {
      const intervalId = setInterval(() => {
         setMovieToShow((state) => state + 1);
      }, SECONDS_TO_SHOW_NEXT_MOVIE);

      return () => clearInterval(intervalId);
   }, []);

   return (
      <S.Container
         style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}')`,
         }}
      >
         <div className='movieContent'>
            <h1>{currentMovie.title}</h1>
            <p>{currentMovie.overview}</p>
            <div className='groupButtons'>
               <Button
                  iconSide='left'
                  onClick={() => navigate(`/watch/${currentMovie.id}`)}
               >
                  <FiPlay style={{ fill: '#000' }} />
                  Assistir
               </Button>
               <Button
                  iconSide='left'
                  style={{ backgroundColor: '#737373', color: '#fff' }}
               >
                  <FiPlus />
                  Minha lista
               </Button>
            </div>
         </div>
      </S.Container>
   );
};

export default memo(Carousel);
