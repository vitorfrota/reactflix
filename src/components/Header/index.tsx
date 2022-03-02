import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import logoHeaderImg from '@/assets/img/logo1x.png';
import * as S from './styles';

interface IHeaderProps {
   children?: ReactNode;
   containerStyle?: {};
   fixed?: boolean;
}

const Header = ({
   children,
   containerStyle = {},
   fixed = false,
}: IHeaderProps) => {
   const navigate = useNavigate();

   return (
      <S.Container css={containerStyle} fixed={fixed}>
         <img
            src={logoHeaderImg}
            alt='logo reactflix'
            onClick={() => navigate('/')}
         />
         {children}
      </S.Container>
   );
};

export default Header;
