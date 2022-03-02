import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import * as S from './styles';

interface FaqItemProps {
   question: string;
   answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
   const [showAnswer, setShowAnswer] = useState(false);
   return (
      <S.Container
         opened={showAnswer}
         onClick={() => setShowAnswer(!showAnswer)}
      >
         <div className='questionContainer'>
            <p>{question}</p>
            <FiPlus />
         </div>
         {showAnswer && (
            <div className='answerContainer'>
               <p>{answer}</p>
            </div>
         )}
      </S.Container>
   );
};

export default FaqItem;
