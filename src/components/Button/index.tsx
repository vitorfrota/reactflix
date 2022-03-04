import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '..';

import * as S from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: ReactNode;
   containerStyle?: any;
   iconSide?: 'left' | 'right';
   loading?: boolean;
   outline?: boolean;
   noRadius?: boolean;
   size?: 'full' | 'small';
   variant?: 'primary';
}

const Button = ({
   children,
   containerStyle,
   iconSide,
   loading,
   outline,
   noRadius,
   size,
   variant,
   ...rest
}: IButtonProps) => {
   return (
      <S.Container
         iconSide={iconSide}
         loading={loading}
         outline={outline}
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
