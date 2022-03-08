import {
   useEffect,
   useRef,
   useMemo,
   useState,
   useCallback,
   useContext,
} from 'react';
import { FiEdit2 } from 'react-icons/fi';

import defaultAvatarImg from '@/assets/img/defaultAvatar.svg';
import { AvatarContext, Avatar as IAvatar } from '@/contexts/AvatarContext';

import * as S from './styles';

interface ISelectAvatarProps {
   selectedAvatar: string;
   updateAvatar: (avatarPath: string) => void;
}

const SelectAvatar = ({ selectedAvatar, updateAvatar }: ISelectAvatarProps) => {
   const listRef = useRef<HTMLUListElement>(null);
   const { avatars, error, loading } = useContext(AvatarContext);

   const [listIsVisible, setListIsVisible] = useState(false);

   useEffect(() => {
      const handleClickOutside = (event: any) => {
         if (listRef.current && !listRef.current.contains(event.target)) {
            setListIsVisible(false);
         }
      };

      if (listIsVisible) {
         document.addEventListener('click', handleClickOutside, true);
      }

      return () =>
         document.removeEventListener('click', handleClickOutside, true);
   }, [listIsVisible]);

   const avatarPreview = useMemo(
      () => (selectedAvatar ? selectedAvatar : defaultAvatarImg),
      [selectedAvatar]
   );

   const handleSelectAvatar = useCallback(
      (path: string) => {
         updateAvatar(path);
         setListIsVisible((state) => !state);
      },
      [listIsVisible]
   );

   if (loading) return null;

   return (
      <S.Container>
         <S.ButtonSelectAvatar
            css={{ backgroundImage: `url(${avatarPreview})` }}
            onClick={() => setListIsVisible((state) => !state)}
         >
            <FiEdit2 />
         </S.ButtonSelectAvatar>
         {listIsVisible && !error && (
            <S.AvatarsList ref={listRef}>
               {avatars.map((avatar: IAvatar) => (
                  <li
                     key={avatar.id}
                     onClick={() => handleSelectAvatar(avatar.path)}
                  >
                     <img src={avatar.path} alt='' loading='lazy' />
                  </li>
               ))}
            </S.AvatarsList>
         )}
      </S.Container>
   );
};

export default SelectAvatar;
