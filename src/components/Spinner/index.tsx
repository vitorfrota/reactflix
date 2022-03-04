import * as S from './styles';

interface ISpinnerProps {
   containerStyle?: {};
   fullScreen?: boolean;
   size?: 'full' | 'large' | 'small';
   variant?: 'light' | 'dark';
}

const Spinner = ({
   containerStyle,
   fullScreen,
   size,
   variant,
}: ISpinnerProps) => {
   return (
      <S.Wrapper fullScreen={fullScreen}>
         <S.Container style={containerStyle} size={size} variant={variant} />
      </S.Wrapper>
   );
};

export default Spinner;
