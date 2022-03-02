import React, {
   InputHTMLAttributes,
   useState,
   useEffect,
   useRef,
   useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string;
   label?: string;
   containerStyle?: {};
   icon?: React.ComponentType<IconBaseProps>;
   variant?: 'white';
   noRadius?: boolean;
}

const Input: React.FC<InputProps> = ({
   name,
   label,
   noRadius,
   variant,
   containerStyle,
   icon: Icon,
   ...rest
}) => {
   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);

   const containerRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);
   const { fieldName, defaultValue, error, registerField } = useField(name);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value',
      });
   }, [fieldName, registerField]);

   const handleInputBlur = useCallback(() => {
      setIsFocused(false);
      setIsFilled(!!inputRef.current?.value);
   }, []);

   const handleInputFocus = useCallback(() => {
      setIsFocused(true);
      inputRef.current?.focus();
   }, []);

   return (
      <>
         <S.Container
            style={containerStyle}
            isFocused={isFocused}
            isFilled={isFilled}
            hasError={!!error}
            onClick={handleInputFocus}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={containerRef}
            variant={variant}
            noRadius={noRadius}
            tabIndex={0}
         >
            {Icon && <Icon size={20} />}
            {label && <label htmlFor={name}>{label}</label>}
            <input defaultValue={defaultValue} ref={inputRef} {...rest} />
         </S.Container>
         {error && <S.Error>{error}</S.Error>}
      </>
   );
};

export default Input;
