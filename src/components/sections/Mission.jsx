import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, typography } from '@/styles/theme';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Eye, Handshake, TrendingUp } from 'lucide-react';

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
  max-width: 1200px;
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

const ValuesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  
  @media (min-width: 641px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacing.xl};
  }
`;

const ValueCard = styled(motion.div)`
  background-color: ${props => props.$bgColor};
  border-radius: 16px;
  padding: ${spacing.xl};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: ${props => props.$gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.lg};
  color: white;
  
  svg {
    width: 36px;
    height: 36px;
  }
`;

const ValueHeadline = styled.h3`
  font-size: 20px;
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.sm};
`;

const ValueTitle = styled.h4`
  font-size: 18px;
  font-weight: ${typography.weights.semibold};
  color: ${colors.primary};
  margin-bottom: ${spacing.md};
`;

const ValueDescription = styled.p`
  font-size: 15px;
  color: ${colors.muted};
  line-height: 1.7;
  margin: 0;
`;

const values = [
  {
    icon: Eye,
    headline: 'See Good',
    title: 'Recognition Matters',
    description: 'We celebrate those who help. Every contribution is visible, valued, and appreciated. You\'re not just helping—you\'re modeling what a good community looks like.',
    bgColor: 'rgba(99, 102, 241, 0.05)',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
  },
  {
    icon: Handshake,
    headline: 'Do Good',
    title: 'Action Creates Change',
    description: 'Talking about change isn\'t enough. HonestNeed turns intention into action. Your support—whether money, time, or skill—directly makes someone\'s life better.',
    bgColor: 'rgba(245, 158, 11, 0.05)',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
  },
  {
    icon: TrendingUp,
    headline: 'Together We Win',
    title: 'Community Wins Together',
    description: 'No one succeeds alone. Every campaign is an opportunity for a community to show up for its own. We\'re not just a platform; we\'re a movement.',
    bgColor: 'rgba(244, 63, 94, 0.05)',
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)',
  },
];

export default function Mission() {
  return (
    <Section id="mission">
      <SectionInner>
        <SectionHeader
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>What We Stand For</SectionTitle>
        </SectionHeader>
        
        <ValuesGrid
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((value, index) => (
            <ValueCard
              key={index}
              $bgColor={value.bgColor}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <IconWrapper $gradient={value.gradient}>
                <value.icon />
              </IconWrapper>
              <ValueHeadline>{value.headline}</ValueHeadline>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
      </SectionInner>
    </Section>
  );
}
