import logoImg from '@/assets/img/logo2x.png';

import * as S from './styles';

const Loading = () => {
   return (
      <S.Container>
         <img src={logoImg} alt='logo reactflix loading' />
         <Spinner style={{ marginTop: '1rem' }} />
      </S.Container>
   );
};

const Spinner = ({ ...rest }) => {
   return <S.SpinnerContainer {...rest} />;
};

export default Loading;
