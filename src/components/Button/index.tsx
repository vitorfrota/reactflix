import { ButtonHTMLAttributes, ReactNode } from 'react';

import * as S from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: ReactNode;
   containerStyle?: any;
   variant?: 'primary';
}

const Button = ({
   children,
   containerStyle,
   variant,
   ...rest
}: IButtonProps) => {
   return (
      <S.Container style={containerStyle} variant={variant} {...rest}>
         {children}
      </S.Container>
   );
};

export default Button;
