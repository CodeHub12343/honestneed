'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, typography } from '@/styles/theme';
import { fadeInUp } from '@/utils/animations';
import Button from '@/components/common/Button';
import { Clock, ArrowRight, Mail } from 'lucide-react';

const Section = styled.section`
  padding: ${spacing['2xl']} ${spacing.md};
  background: linear-gradient(135deg, #EEF2FF 0%, ${colors.background} 50%, #FDF2F8 100%);
  
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
  text-align: center;
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: ${typography.sizes.h1.mobile};
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  line-height: 1.2;
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.h1.desktop};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${typography.sizes.body.mobile};
  color: ${colors.muted};
  max-width: 500px;
  line-height: 1.6;
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.body.desktop};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  width: 100%;
  max-width: 400px;
  margin-top: ${spacing.md};
  
  @media (min-width: 641px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const UrgencyNote = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background-color: rgba(244, 63, 94, 0.1);
  color: ${colors.secondary};
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  margin-top: ${spacing.md};
`;

export default function FinalCTA() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="final-cta">
      <SectionInner>
        <ContentWrapper
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Ready to Join a Movement?</SectionTitle>
          <SectionSubtitle>
            Pick your level of involvement. Every bit of support counts toward 
            building a community that helps each other.
          </SectionSubtitle>
          
          <ButtonGroup>
            <Button
              variant="secondary"
              size="large"
              fullWidth
              onClick={() => scrollToSection('email')}
            >
              <Mail size={18} />
              Subscribe for Updates
            </Button>
            <Button
              size="large"
              fullWidth
              onClick={() => scrollToSection('sponsorship')}
            >
              Sponsor Now
              <ArrowRight size={18} />
            </Button>
          </ButtonGroup>
          
          <UrgencyNote
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Clock size={16} />
            Limited-time sponsor spots. 15 remaining.
          </UrgencyNote>
        </ContentWrapper>
      </SectionInner>
    </Section>
  );
}
