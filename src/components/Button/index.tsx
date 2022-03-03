import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '..';

import * as S from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: ReactNode;
   containerStyle?: any;
   loading?: boolean;
   noRadius?: boolean;
   size?: 'full' | 'small';
   variant?: 'primary';
}

const Button = ({
   children,
   containerStyle,
   loading,
   noRadius,
   size,
   variant,
   ...rest
}: IButtonProps) => {
   return (
      <S.Container
         loading={loading}
         noRadius={noRadius}
         size={size}
         style={containerStyle}
         variant={variant}
         {...rest}
      >
         {loading ? <Spinner variant='light' size='small' /> : children}
      </S.Container>
   );
};

export default Button;
