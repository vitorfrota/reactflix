import logoImg from '@/assets/img/logo2x.png';
import { Spinner } from '@/components';
import * as S from './styles';

const Loading = () => {
   return (
      <S.Container>
         <img src={logoImg} alt='logo reactflix loading' />
         <Spinner containerStyle={{ marginTop: '1.5rem' }} size='large' />
      </S.Container>
   );
};

export default Loading;
