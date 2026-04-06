'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, typography } from '@/styles/theme';
import { fadeInUp } from '@/utils/animations';

const StyledSection = styled.section`
  padding: ${spacing['2xl']} ${spacing.md};
  background-color: ${props => props.bgColor || colors.background};
  
  @media (min-width: 641px) {
    padding: ${spacing['3xl']} ${spacing.lg};
  }
  
  @media (min-width: 1025px) {
    padding: ${spacing['5xl']} ${spacing.xl};
  }
`;

const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing['3xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${typography.sizes.h1.mobile};
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.md};
  line-height: ${typography.lineHeight.tight};
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.h1.desktop};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${typography.sizes.body.mobile};
  color: ${colors.muted};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${typography.lineHeight.normal};
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.body.desktop};
  }
`;

export default function Section({
  children,
  title,
  subtitle,
  bgColor,
  id,
  ...props
}) {
  return (
    <StyledSection bgColor={bgColor} id={id} {...props}>
      <SectionInner>
        {(title || subtitle) && (
          <SectionHeader>
            {title && (
              <SectionTitle
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {title}
              </SectionTitle>
            )}
            {subtitle && (
              <SectionSubtitle
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {subtitle}
              </SectionSubtitle>
            )}
          </SectionHeader>
        )}
        {children}
      </SectionInner>
    </StyledSection>
  );
}
