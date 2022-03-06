import { Link } from 'react-router-dom';

import { Header } from '@/components';

import * as S from './styles';

const NotFound = () => {
   return (
      <S.Container>
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
