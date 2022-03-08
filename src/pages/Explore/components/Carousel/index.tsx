import { useEffect, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiPlus } from 'react-icons/fi';

import { Button } from '@/components';
import * as S from './styles';

const URL_BACKDROP_PATH = 'https://image.tmdb.org/t/p/original';

interface Title {
   id: number;
   title: string;
   overview: string;
   backdrop_path: string;
}

interface CarouselProps {
   titles: Title[];
}

const SECONDS_TO_SHOW_NEXT_MOVIE = 8 * 100 * 10; // 8 seconds

const Carousel = ({ titles }: CarouselProps) => {
   const navigate = useNavigate();

   const [featuredTitleIndex, setFeaturedTitleIndex] = useState(0);
   const [featuredTitle, setFeaturedTitle] = useState<Title>({} as Title);

   useEffect(() => {
      featuredTitleIndex < titles.length
         ? setFeaturedTitle(titles[featuredTitleIndex])
         : setFeaturedTitleIndex(0);
   }, [featuredTitleIndex]);

   useEffect(() => {
      const intervalId = setInterval(() => {
         setFeaturedTitleIndex((state) => state + 1);
      }, SECONDS_TO_SHOW_NEXT_MOVIE);

      return () => clearInterval(intervalId);
   }, []);

   return (
      <S.Container>
         <img
            src={URL_BACKDROP_PATH + featuredTitle.backdrop_path}
            alt=''
            loading='lazy'
            className='backgroundImage'
         />
         <div className='movieContent'>
            <h1>{featuredTitle.title}</h1>
            <p>{featuredTitle.overview}</p>
            <div className='groupButtons'>
               <Button
                  iconSide='left'
                  onClick={() => navigate(`/title/${featuredTitle.id}`)}
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
