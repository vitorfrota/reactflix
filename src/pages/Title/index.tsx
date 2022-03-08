import { useEffect, useMemo, useState } from 'react';
import { FiPlay, FiPlus } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import { Button } from '@/components';
import { useFetch } from '@/hooks/fetch';
import Error from '@/pages/Error';
import Loading from '@/pages/Loading';

import * as S from './styles';

const URL_BACKDROP_PATH = 'https://image.tmdb.org/t/p/original';

interface Genre {
   id: number;
   name: string;
}

interface Title {
   id: number;
   backdrop_path: string;
   genres: Genre[];
   genresFormatted: string;
   overview: string;
   release_date: string;
   runtime: number;
   title: string;
   vote_average: number;
}

const Title = () => {
   const { titleId } = useParams();
   const [genresFormatted, setGenresFormatted] = useState('');
   const [selectedTab, setSelectedTab] = useState<
      'overview' | 'trailers' | 'details'
   >('overview');

   const {
      data: currentTitle,
      isError,
      isLoading,
   } = useFetch(`title-${titleId}`, `/movie/${titleId}`, {
      initialData: {},
   });

   const { data: currentTitleReleaseDates } = useFetch(
      `movie-${titleId}-releaseDates`,
      `/movie/${titleId}/release_dates`,
      {
         initialData: {
            results: [
               {
                  release_dates: [
                     {
                        certification: '',
                     },
                  ],
               },
            ],
         },
      }
   );

   useEffect(() => {
      if (Object.keys(currentTitle).includes('genres')) {
         const genresFormatted = currentTitle.genres
            .map((genre: Genre) => genre.name)
            .join(', ');

         setGenresFormatted(genresFormatted);
      }
   }, [currentTitle]);

   if (isLoading) return <Loading />;
   if (isError) return <Error />;

   const rating = useMemo(
      () => `${currentTitle.vote_average * 10}%`,
      [currentTitle]
   );

   const certification = useMemo(() => {
      const { results } = currentTitleReleaseDates;

      return results[0].release_dates[0].certification;
   }, [currentTitleReleaseDates]);

   const duration = useMemo(() => {
      const hours = Math.floor(currentTitle.runtime / 60);
      const minutes = currentTitle.runtime % 60;

      return `${hours}h${minutes}min`;
   }, [currentTitle]);

   const releaseYear = useMemo(() => {
      return new Date(currentTitle.release_date).getFullYear();
   }, [currentTitle]);

   return (
      <S.Container>
         <S.Jumbotron>
            <img
               src={URL_BACKDROP_PATH + currentTitle.backdrop_path}
               alt=''
               loading='lazy'
               className='backgroundImage'
            />
            <div className='movieContent'>
               <h1>{currentTitle.title}</h1>
               <S.MetaInformationContainer>
                  <strong className='rating'>{rating} Curtiram</strong>
                  <span>{releaseYear}</span>
                  {certification && (
                     <span className='certification'>{certification}</span>
                  )}
                  <span>{duration}</span>
                  <span>{genresFormatted}</span>
               </S.MetaInformationContainer>
               <p>{currentTitle.overview}</p>
               <div className='groupButtons'>
                  <Button iconSide='left'>
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
            <S.Menu>
               <li
                  className={selectedTab === 'overview' ? 'active' : ''}
                  onClick={() => setSelectedTab('overview')}
                  tabIndex={0}
               >
                  Resumo
               </li>
               <li
                  className={selectedTab === 'trailers' ? 'active' : ''}
                  onClick={() => setSelectedTab('trailers')}
                  tabIndex={0}
               >
                  Trailers
               </li>
               <li
                  className={selectedTab === 'details' ? 'active' : ''}
                  onClick={() => setSelectedTab('details')}
                  tabIndex={0}
               >
                  Detalhes
               </li>
            </S.Menu>
         </S.Jumbotron>
      </S.Container>
   );
};
export default Title;
