import React from "react";
import Photo1 from "../../../../assets/thinking.jpg";
import AnimatedSection from "../../../../Utility/AnimatedSection";

const homeDecorFAQs = [
  {
    id: 1,
    question: "How does your home decor design process work?",
    answer:
      "Our process begins with a consultation to understand your needs, followed by concept design, material selection, and final execution.",
  },
  {
    id: 2,
    question: "Can I customize the design to match my home?",
    answer:
      "Yes, all our home decor designs are fully customizable to suit your space, style, and personal preferences.",
  },
  {
    id: 3,
    question: "How long does a home decor project usually take?",
    answer:
      "Depending on the size and complexity, most projects are completed within 2 to 6 weeks.",
  },
  {
    id: 4,
    question: "Do you offer budget-friendly home decor solutions?",
    answer:
      "Yes, we provide flexible and affordable solutions without compromising on quality or design.",
  },
  {
    id: 5,
    question: "What materials do you use for home decor projects?",
    answer:
      "We use high-quality, durable, and eco-friendly materials to ensure long-lasting beauty and comfort.",
  },
  {
    id: 6,
    question: "Do you offer free consultation services?",
    answer:
      "Yes, we offer an initial consultation to understand your requirements and suggest the best design solutions.",
  },
];

const QuestionAnswer = () => {
  return (
    <div className="text-4xl max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
      <div className=" mb-16 max-w-7xl mx-auto flex flex-col md:flex-row justify-between  md:items-center  gap-6 border-b border-primary/50 dark:border-white/10 pb-6">
        <div>
          <AnimatedSection variant="fadeUp">
            <span className="text-secondary font-medium tracking-widest text-sm uppercase block">
              Quick Answers
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary dark:text-gray-100 leading-tight ">
              Frequently asked question?
            </h1>
          </AnimatedSection>
        </div>

        {/* <hr /> */}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start  gap-10">
        <AnimatedSection variant="fadeLeft">
          <div className="join join-vertical ">
            {homeDecorFAQs.map((faq) => (
              <div
                key={faq.id}
                className="collapse collapse-arrow join-item  border border-base-300  p-5"
              >
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-normal text-2xl">
                  {faq.question}
                </div>
                <div className="collapse-content font-normal text-sm">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection variant="fadeRight">
          <div className="flex-shrink-0 sticky top-20 self-start">
            <img className="w-130 h-100 rounded-2xl" src={Photo1} alt="" />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default QuestionAnswer;
