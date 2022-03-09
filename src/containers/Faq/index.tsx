import { Accordion } from '@/components';

import faqQuestions from '@/constants/faqQuestions';

const Faq = () => {
   return (
      <>
         {faqQuestions.map((question, index) => (
            <Accordion
               key={index}
               question={question.question}
               answer={question.answer}
            />
         ))}
      </>
   );
};

export default Faq;
