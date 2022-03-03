import * as S from './styles';

interface IToastProps {
   containerStyle?: {};
   message: string;
}

const Toast = ({ message, containerStyle }: IToastProps) => {
   return (
      <S.Container style={containerStyle}>
         <span>{message}</span>
      </S.Container>
   );
};

export default Toast;
