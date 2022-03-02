import logoImg from '@/assets/img/logo2x.png';

import * as S from './styles';

const Loading = () => {
   return (
      <S.Container>
         <img src={logoImg} alt='logo reactflix loading' />
      </S.Container>
   );
};

export default Loading;
