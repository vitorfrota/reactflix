import { Link } from 'react-router-dom';

import { Header } from '@/components';

import notFoundImg from '@/assets/img/notFound.jpg';

import * as S from './styles';

const NotFound = () => {
   const containerStyles = {
      background: `url(${notFoundImg}) no-repeat 100%`,
      backgroundSize: 'cover',
   };

   return (
      <S.Container style={containerStyles}>
         <Header fixed />
         <h1>Você se perdeu?</h1>
         <p>
            Infelizmente, não localizamos essa página. Você encontra muitos
            outros títulos na página inicial.
         </p>
         <Link to={'/'}>Página inicial do Reactflix</Link>
      </S.Container>
   );
};

export default NotFound;
