import { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import * as S from './styles';

interface Movie {
   id: number;
   title: string;
   poster_path: string;
}

interface ICatalogProps {
   movies: Movie[];
   title: string;
}

const Catalog = ({ movies, title }: ICatalogProps) => {
   const catalogRef = useRef<HTMLUListElement>(null);

   const [position, setPosition] = useState(0);
   const [catalogWidthToScroll, setCatalogWidthToScroll] = useState(1);

   useEffect(() => {
      if (catalogRef.current) {
         setCatalogWidthToScroll(catalogRef.current.clientWidth);
      }
   }, [catalogRef.current]);

   const handleScrollCatalog = useCallback(
      (side: string) => {
         let STEP_WIDTH = 360; // px to step;

         if (catalogRef.current) {
            const { scrollLeft } = catalogRef.current;

            let newPosition = scrollLeft;

            side === 'left'
               ? (newPosition -= STEP_WIDTH)
               : (newPosition += STEP_WIDTH);

            catalogRef.current.scrollLeft = newPosition;
            setPosition(newPosition);
         }
      },
      [catalogRef.current]
   );

   return (
      <S.Container>
         <h2>{title}</h2>
         {position > 0 && (
            <button
               onClick={() => handleScrollCatalog('left')}
               style={{ left: 0 }}
            >
               <FiChevronLeft />
            </button>
         )}
         <S.CatalogContainer ref={catalogRef}>
            {movies.map((movie) => (
               <S.ItemCatalog
                  key={movie.id}
                  style={{
                     backgroundImage: `url('https://image.tmdb.org/t/p/w342${movie.poster_path}')`,
                  }}
               >
                  <div>
                     <p>{movie.title}</p>
                  </div>
               </S.ItemCatalog>
            ))}
         </S.CatalogContainer>
         {position < catalogWidthToScroll && (
            <button
               onClick={() => handleScrollCatalog('right')}
               style={{ right: 0 }}
            >
               <FiChevronRight />
            </button>
         )}
      </S.Container>
   );
};

export default Catalog;
