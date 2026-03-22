import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "How often should I see the dentist?",
    answer: "You should see the dentist at least twice a year for a cleaning and check-up. However, if you have any concerns, don't hesitate to schedule an appointment."
  },
  {
    question: "How can I prevent cavities?",
    answer: "The most effective strategy to avoid cavities is to practice good oral hygiene like brushing and flossing twice a day and using mouthwash. You should also avoid sugary and acidic foods, drinks, and tobacco products."
  },
  {
    question: "What is the best way to whiten my teeth?",
    answer: "There are many ways to whiten teeth, including home kits and home remedies. The best way to find out what works best for you is to consult your dentist."
  },
  {
    question: "I'm pregnant. Are there any special dental considerations I should be aware of?",
    answer: "Yes, you should be extra careful with your oral hygiene during pregnancy as you are more susceptible to gum disease. Be sure to brush, floss regularly, and see your dentist for regular check-ups."
  },
  {
    question: "What are early signs of dental trouble?",
    answer: "Some early signs of dental trouble include tooth pain, sensitivity to hot or cold, gum swelling, and bleeding. If you experience any of these symptoms, be sure to see your dentist right away."
  },
  {
    question: "Why do I need dental exams?",
    answer: "Dental exams are important because they help detect problems early. Early detection helps treat issues before too much damage occurs."
  },
  {
    question: "When should I start taking my child to the dentist?",
    answer: "You should take your child to the dentist as soon as their first tooth comes in. This is usually around 6 months old. It's crucial to establish good oral hygiene habits early on."
  },
  {
    question: "I'm nervous about going to the dentist. What can I do?",
    answer: "Many people feel nervous about going to the dentist. If this is the case for you, be sure to let the dentist know. They will be able to take special measures to help you feel more comfortable."
  },
  {
    question: "Are dental X-rays safe and needed?",
    answer: "Dental X-rays are safe and needed to detect problems such as cavities, gum disease, and tumors. In addition, they help to ensure that your teeth and gums are healthy."
  },
  {
    question: "Do I really need to use floss and mouthwash?",
    answer: "Yes, you really need to use floss and mouthwash. Flossing helps remove plaque and bacteria from between your teeth and gums. Mouthwash helps to kill bacteria and freshen your breath."
  },
  {
    question: "How do fillings work?",
    answer: "Fillings are used to fill in cavities. They are made of materials such as composite resin and glass ionomer cement (GIC). The dentist will clean the cavity and fill it with the chosen material."
  },
  {
    question: "What are your dental clinic timings?",
    answer: "Roots Dental Care remain open from 10:00 AM - 02:00 PM and 05:00 PM - 09:00 PM every day."
  },
  {
    question: "What modes of payment are acceptable at Roots dental care?",
    answer: "We accept payments through Cash or any other UPI Payment methods."
  },
  {
    question: "How can I book an appointment?",
    answer: "To book your appointment, please contact us via phone, walk-ins, or WhatsApp messages."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-10" style={{ backgroundColor: '#3D4DB7' }}>
      <div className="w-full px-4" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="w-full">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-center text-left"
                style={{ borderRadius: openIndex === index ? '12px 12px 0 0' : '12px' }}
              >
                <span className="font-semibold text-gray-900 pr-8 text-1xl">
                  {index + 1}. {faq.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  size={22}
                  style={{ color: '#3D4DB7' }}
                />
              </button>

              {openIndex === index && (
                <div className="bg-white px-6 pb-6 shadow-sm" style={{ borderRadius: '0 0 12px 12px' }}>
                  <p className="text-gray-600 leading-relaxed pt-4 border-t border-gray-100 text-xl">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white mb-4 opacity-90">Still have questions?</p>
          <button onClick={scrollToContact} className="text-white font-semibold hover:opacity-80 transition underline underline-offset-4">
            Contact us for more information →
          </button>
        </div>
      </div>
    </section>
  );
}