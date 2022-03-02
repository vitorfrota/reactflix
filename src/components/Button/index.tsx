import { ButtonHTMLAttributes, ReactNode } from 'react';

import * as S from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: ReactNode;
   containerStyle?: any;
   variant?: 'primary';
   noRadius?: boolean;
   size?: 'full' | 'small';
}

const Button = ({
   children,
   containerStyle,
   noRadius,
   size,
   variant,
   ...rest
}: IButtonProps) => {
   return (
      <S.Container
         style={containerStyle}
         variant={variant}
         noRadius={noRadius}
         size={size}
         {...rest}
      >
         {children}
      </S.Container>
   );
};

export default Button;
