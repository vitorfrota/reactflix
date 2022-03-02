import { ReactNode } from 'react';
import * as S from './styles';

interface ISectionProps {
   children: ReactNode;
   reverse?: boolean;
}

const Section = ({ children, ...rest }: ISectionProps) => {
   return <S.Container {...rest}>{children}</S.Container>;
};

export default Section;
