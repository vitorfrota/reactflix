import { useCallback, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import * as S from './styles';

// TO STEPS WHEN CLICK TO SCROLL CATALOG (IN PX), CSS TITLE ALSO IS 360px
const WIDTH_STEP = 360;
const URL_POSTER_PATH = 'https://image.tmdb.org/t/p/w342';

interface Title {
   id: number;
   title: string;
   poster_path: string;
}

interface ICatalogProps {
   heading: string;
   titles: Title[];
}

const Catalog = ({ heading, titles }: ICatalogProps) => {
   const catalogRef = useRef<HTMLUListElement>(null);

   const [horizontalPosition, setHorizontalPosition] = useState(0);
   const [titleHovered, setTitleHovered] = useState(false);

   const [showButton, setShowButton] = useState({
      left: false,
      right: true,
   });

   const handleScrollCatalog = useCallback(
      (side: string) => {
         // is poisiton axis X
         let newPosition = horizontalPosition;

         if (catalogRef.current) {
            const { current } = catalogRef;

            const lastTitle = current.lastElementChild;

            if (lastTitle) {
               const leftSideLastTitle = lastTitle.getBoundingClientRect().left;

               if (side === 'right') {
                  !showButton.left &&
                     setShowButton((state) => {
                        return { ...state, left: true };
                     });

                  leftSideLastTitle < window.innerWidth &&
                     setShowButton((state) => {
                        return { ...state, right: false };
                     });

                  newPosition -= WIDTH_STEP;
               } else {
                  newPosition += WIDTH_STEP;
                  !showButton.right &&
                     setShowButton((state) => {
                        return { ...state, right: true };
                     });

                  newPosition === 0 &&
                     setShowButton((state) => {
                        return { ...state, left: false };
                     });
               }
            }
            setHorizontalPosition(newPosition);
         }
      },
      [horizontalPosition, window]
   );

   return (
      <S.Container>
         <h2>{heading}</h2>
         {showButton.left && (
            <button
               onClick={() => handleScrollCatalog('left')}
               style={{ left: '-1rem' }}
            >
               <FiChevronLeft />
            </button>
         )}
         <S.CatalogContainer ref={catalogRef} titleHovered={titleHovered}>
            {titles.map((title) => (
               <S.Title
                  key={title.id}
                  css={{
                     backgroundImage: `url('${
                        URL_POSTER_PATH + title.poster_path
                     }')`,
                     transform: `translateX(${horizontalPosition}px)`,
                  }}
                  onMouseEnter={() => setTitleHovered(true)}
                  onMouseLeave={() => setTitleHovered(false)}
               >
                  <p>{title.title}</p>
               </S.Title>
            ))}
         </S.CatalogContainer>
         {showButton.right && (
            <button
               onClick={() => handleScrollCatalog('right')}
               style={{ right: '-1rem' }}
            >
               <FiChevronRight />
            </button>
         )}
      </S.Container>
   );
};

export default Catalog;
