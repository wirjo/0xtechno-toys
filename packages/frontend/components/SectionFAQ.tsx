import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { useState } from 'react';
// import Image from 'next/image';
// import { openseaUrl, twitterUrl } from '../conf/content';

const Section = (): JSX.Element => {
  const questions = [
      /*
    {
      question: 'What are NFTs?',
      answer:
        'NFTs stands for "Non-Fungible Tokens". They are digital items that act as your membership to the Lazarus community. Think of it like a super-charged digital membership pass. Please feel free to jump into our Discord community to learn more.',
    },
    {
      question: 'How do I buy an NFT?',
      answer:
        'You will need to set up your Metamask wallet browser extension and then use that to our website by pressing on "Connect Wallet" on the top right hand corner. To purchase an NFT, you will need to buy some Ethereum either directly from Metamask (which may incur credit card fees) or from an exchange such as Binance, FTX or Coinbase.',
    },
    */

    {
        question: "What the heck are Toys?",
        answer: "Gonks are a collection of NFTs."
    },
    {
        question: "Sure, but what are NFTs?",
        answer: `NFTs stands for "Non-Fungible Tokens". Probably best to google it.`,
    },
    
  ];

  const [accordionExpand, setAccordionExpand] = useState('');

  const handleAccordionItemClick = (e: any, identifier: string) => {
    if (accordionExpand == identifier) setAccordionExpand('');
    else setAccordionExpand(identifier);
    return true;
  };

  const AccordionItem = ({ identifier, q }: { identifier: string; q: any }): JSX.Element => (
    <div
      className="bg-white bg-opacity-80 p-4 text-gray-900 mb-5 cursor-pointer"
      onClick={(e) => handleAccordionItemClick(e, identifier)}
    >
      <div className="flex items-center justify-center">
        <div className="flex-auto font-semibold">{q.question}</div>
        <div className="flex-none ml-5">
          {accordionExpand == identifier ? (
            <FontAwesomeIcon icon="chevron-circle-up" />
          ) : (
            <FontAwesomeIcon icon="chevron-circle-down" />
          )}
        </div>
      </div>
      {accordionExpand == identifier && <div className="mt-3">{q.answer}</div>}
    </div>
  );

  return (
    <>
    <section id="section-about" className="bg-white border-t-8 border-b-8 border-black">
        <div className="container max-w-screen-lg mx-auto text-center py-20 px-5">
            <div className="mb-3 text-3xl font-bold uppercase">
                <b>Toys by 0xTechno</b>
            </div>
            <div className="mx-auto text-center">
                    Toys by 0xTechno is a limited collection of NFTs.
            </div>
        </div>
    </section>
    <section id="section-faq" className="overflow-hidden">
      <div className="container max-w-screen-lg mx-auto text-center pt-20 px-5">
        <div className="text-3xl font-bold">
            FAQ
        </div>

        <div className="grid grid-cols-1 gap-5 my-8">
          <div className="text-left">
            {_.map(questions, (q, key) => (
              <AccordionItem key={`faq-${key}`} identifier={`faq-${key}`} q={q} />
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Section;
