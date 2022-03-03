import * as S from './styles';

interface ISpinnerProps {
   containerStyle?: {};
   size?: 'full' | 'large' | 'small';
   variant?: 'light' | 'dark';
}

const Spinner = ({ containerStyle, size, variant }: ISpinnerProps) => {
   return <S.Container style={containerStyle} size={size} variant={variant} />;
};

export default Spinner;
