import { useFetch } from '@/hooks/fetch';
import Loading from '@/pages/Loading';
import Error from '@/pages/Error';

import Carousel from './components/Carousel';
import Catalog from './components/Catalog';

import * as S from './styles';

const Explore = () => {
   const { data, isError, isLoading } = useFetch(
      'popularMovies',
      '/movie/popular'
   );

   if (isLoading) {
      return <Loading />;
   }

   if (isError) {
      return <Error />;
   }

   return (
      <S.Container>
         <Carousel titles={data.results} />
         <div className='catalogs'>
            <Catalog heading='Popular' titles={data.results} />
            <Catalog heading='Em alta' titles={data.results} />
         </div>
      </S.Container>
   );
};

export default Explore;
