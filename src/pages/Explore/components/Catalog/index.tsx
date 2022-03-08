import { useCallback, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';

// TO STEPS WHEN CLICK TO SCROLL CATALOG (IN PX), CSS TITLE ALSO IS 360px
const WIDTH_STEP = 360;
const URL_POSTER_PATH = 'https://image.tmdb.org/t/p/w300';

interface Title {
   id: number;
   title: string;
   backdrop_path: string;
}

interface ICatalogProps {
   heading: string;
   titles: Title[];
}

const Catalog = ({ heading, titles }: ICatalogProps) => {
   const navigate = useNavigate();
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
         {showButton.left && <Button cb={handleScrollCatalog} side='left' />}
         <S.CatalogContainer ref={catalogRef} titleHovered={titleHovered}>
            {titles.map((title) => (
               <S.Title
                  key={title.id}
                  css={{
                     transform: `translateX(${horizontalPosition}px)`,
                  }}
                  onMouseEnter={() => setTitleHovered(true)}
                  onMouseLeave={() => setTitleHovered(false)}
                  onClick={() => navigate(`../title/${title.id}`)}
               >
                  <img
                     src={`${URL_POSTER_PATH + title.backdrop_path}`}
                     alt=''
                     loading='lazy'
                     className='backgroundImage'
                  />
                  <p>{title.title}</p>
               </S.Title>
            ))}
         </S.CatalogContainer>
         {showButton.right && <Button cb={handleScrollCatalog} side='right' />}
      </S.Container>
   );
};

interface IButtonProps {
   cb: (side: 'left' | 'right') => void;
   side: 'left' | 'right';
}

const Button = ({ cb, side }: IButtonProps) => {
   const Icon = side === 'left' ? FiChevronLeft : FiChevronRight;
   const style = side === 'left' ? { left: '-1rem' } : { right: '-1rem' };

   return (
      <button onClick={() => cb(side)} style={style}>
         <Icon />
      </button>
   );
};

export default Catalog;
