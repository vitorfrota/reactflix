import { Link } from 'react-router-dom';

import * as S from './styles';

const Error = () => {
   return (
      <S.Container>
         <h1>Perdão pela interrupção</h1>
         <p>Desculpa, estamos tendo problemas com sua requisição.</p>
         <Link to={'/browse'}>Voltar para Perfis</Link>
      </S.Container>
   );
};

export default Error;
