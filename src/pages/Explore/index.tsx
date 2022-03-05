import { Spinner } from '@/components';
import { useFetch } from '@/hooks/fetch';

import Carousel from './components/Carousel';
import Catalog from './components/Catalog';

import * as S from './styles';

const Explore = () => {
   const { data, isError, isLoading } = useFetch(
      'popularMovies',
      '/movie/popular'
   );

   if (isLoading && !data) {
      return (
         <S.Container>
            <Spinner size='large' fullScreen />
         </S.Container>
      );
   }

   if (isError) {
      return <p>Deu ruim :(</p>;
   }

   return (
      <S.Container>
         <Carousel movies={data.results} />
         <section className='catalogs'>
            <Catalog title='Popular' movies={data.results} />
            <Catalog title='Em alta' movies={data.results} />
         </section>
      </S.Container>
   );
};

export default Explore;
