import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import * as S from './styles';

interface AccordionProps {
   question: string;
   answer: string;
}

const Accordion = ({ question, answer }: AccordionProps) => {
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

export default Accordion;
