import { Spinner } from '@/components';
import * as S from './styles';

const Loading = () => {
   return (
      <S.Container>
         <Spinner containerStyle={{ marginTop: '1.5rem' }} size='large' />
      </S.Container>
   );
};

export default Loading;
