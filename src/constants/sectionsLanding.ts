import devicesImg from '@/assets/img/devices.png';
import kidsImg from '@/assets/img/kids.png';
import mobileImg from '@/assets/img/mobile.jpg';
import tvImg from '@/assets/img/tv.png';

export type ISectionSignUp = {
   image?: any;
   title: string;
   description?: string;
   reverse?: boolean;
};

export const sections: ISectionSignUp[] = [
   {
      reverse: true,
      image: tvImg,
      title: 'Aproveite na TV.',
      description:
         'Assista em Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, aparelhos de Blu-ray e outros dispositivos.',
   },
   {
      image: mobileImg,
      title: 'Baixe séries para assistir offline.',
      description:
         'Salve seus títulos favoritos e sempre tenha algo para assistir.',
   },
   {
      reverse: true,
      image: devicesImg,
      title: 'Assista quando quiser.',
      description:
         'Assista no celular, tablet, Smart TV ou notebook sem pagar a mais por isso.',
   },
   {
      image: kidsImg,
      title: 'Crie perfis para crianças.',
      description:
         'Deixe as crianças se aventurarem com seus personagens favoritos em um espaço feito só para elas, sem pagar a mais por isso.',
   },
];
