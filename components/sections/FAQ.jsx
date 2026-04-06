'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography } from '@/styles/theme';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { ChevronDown, MessageCircle } from 'lucide-react';

const Section = styled.section`
  padding: ${spacing['2xl']} ${spacing.md};
  background-color: ${colors.background};
  
  @media (min-width: 641px) {
    padding: ${spacing['3xl']} ${spacing.lg};
  }
  
  @media (min-width: 1025px) {
    padding: ${spacing['5xl']} ${spacing.xl};
  }
`;

const SectionInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${typography.sizes.h1.mobile};
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.md};
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.h1.desktop};
  }
`;

const FAQList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const FAQItem = styled(motion.div)`
  background-color: ${colors.surface};
  border-radius: 12px;
  border: 1px solid ${colors.border};
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.primary};
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.lg} ${spacing.xl};
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  font-weight: ${typography.weights.semibold};
  color: ${colors.text};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${colors.primary};
  }
  
  &:focus {
    outline: none;
  }
`;

const QuestionText = styled.span`
  flex: 1;
  padding-right: ${spacing.md};
`;

const ChevronIcon = styled(motion.div)`
  flex-shrink: 0;
  color: ${colors.muted};
`;

const FAQAnswer = styled(motion.div)`
  overflow: hidden;
`;

const AnswerContent = styled.div`
  padding: 0 ${spacing.xl} ${spacing.lg};
  font-size: 15px;
  color: ${colors.muted};
  line-height: 1.7;
`;

const ContactPrompt = styled(motion.div)`
  text-align: center;
  margin-top: ${spacing['3xl']};
  padding: ${spacing.xl};
  background-color: ${colors.surface};
  border-radius: 16px;
  border: 1px solid ${colors.border};
`;

const ContactIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.md};
  color: ${colors.primary};
`;

const ContactTitle = styled.h3`
  font-size: 18px;
  font-weight: ${typography.weights.semibold};
  color: ${colors.text};
  margin-bottom: ${spacing.sm};
`;

const ContactText = styled.p`
  font-size: 15px;
  color: ${colors.muted};
  margin-bottom: ${spacing.md};
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${colors.primary};
  font-weight: ${typography.weights.semibold};
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: #4F46E5;
    text-decoration: underline;
  }
`;

const faqs = [
  {
    question: 'When does HonestNeed launch?',
    answer: 'April 1, 2026. Sponsors get early access on March 28. Email subscribers get the link first, so make sure you\'re signed up!',
    defaultOpen: true,
  },
  {
    question: 'What do I get when I sponsor?',
    answer: 'Depends on your tier. All sponsors get: early platform access, recognition on our launch wall, exclusive updates, and direct access to our team for feature requests. Higher tiers include additional benefits like quarterly reports and advisory opportunities.',
    defaultOpen: true,
  },
  {
    question: 'Is my payment secure?',
    answer: 'Yes. All payments are encrypted with industry-standard security. We use secure payment processors—you\'re not sharing sensitive details directly with HonestNeed.',
    defaultOpen: false,
  },
  {
    question: 'Can I change my sponsorship tier later?',
    answer: 'Sponsorships are final, but you can upgrade anytime at a prorated price. Email hello@honestneed.com to arrange an upgrade.',
    defaultOpen: false,
  },
  {
    question: 'What if HonestNeed doesn\'t launch?',
    answer: 'We\'re fully committed to launching. But if things change, all sponsors get full refunds within 30 days of any delay announcement.',
    defaultOpen: false,
  },
  {
    question: 'How will sponsorship money be used?',
    answer: 'Development, marketing, infrastructure, and team operations. Sponsors get a transparent budget breakdown via our dashboard once the platform launches.',
    defaultOpen: false,
  },
];

function FAQAccordionItem({ item, isOpen, onToggle }) {
  return (
    <FAQItem>
      <FAQQuestion onClick={onToggle}>
        <QuestionText>{item.question}</QuestionText>
        <ChevronIcon
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </ChevronIcon>
      </FAQQuestion>
      <AnimatePresence initial={false}>
        {isOpen && (
          <FAQAnswer
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <AnswerContent>{item.answer}</AnswerContent>
          </FAQAnswer>
        )}
      </AnimatePresence>
    </FAQItem>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState(
    faqs.reduce((acc, faq, index) => {
      if (faq.defaultOpen) acc.push(index);
      return acc;
    }, [])
  );

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Section id="faq">
      <SectionInner>
        <SectionHeader
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Frequently Asked Questions</SectionTitle>
        </SectionHeader>
        
        <FAQList
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <FAQAccordionItem
                item={faq}
                isOpen={openItems.includes(index)}
                onToggle={() => toggleItem(index)}
              />
            </motion.div>
          ))}
        </FAQList>
        
        <ContactPrompt
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ContactIcon>
            <MessageCircle size={24} />
          </ContactIcon>
          <ContactTitle>Still have questions?</ContactTitle>
          <ContactText>
            We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours.
          </ContactText>
          <ContactLink href="mailto:hello@honestneed.com">
            hello@honestneed.com
          </ContactLink>
        </ContactPrompt>
      </SectionInner>
    </Section>
  );
}
