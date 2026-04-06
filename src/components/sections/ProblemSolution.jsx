import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, typography } from '@/styles/theme';
import { staggerContainer, slideInLeft, slideInRight } from '@/utils/animations';
import { TrendingDown, MapPin, AlertCircle, DollarSign, Users, Award } from 'lucide-react';

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

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing['3xl']};
  
  @media (min-width: 1025px) {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing['4xl']};
  }
`;

const Column = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

const ColumnHeader = styled.div`
  margin-bottom: ${spacing.md};
`;

const ColumnLabel = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 12px;
  border-radius: 6px;
  margin-bottom: ${spacing.sm};
  background-color: ${props => props.$variant === 'problem' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
  color: ${props => props.$variant === 'problem' ? colors.error : colors.success};
`;

const ColumnTitle = styled.h2`
  font-size: ${typography.sizes.h2.mobile};
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  line-height: ${typography.lineHeight.tight};
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.h2.desktop};
  }
`;

const PointList = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PointItem = styled(motion.li)`
  display: flex;
  gap: ${spacing.md};
  align-items: flex-start;
  padding: ${spacing.lg};
  background-color: ${colors.surface};
  border-radius: 12px;
  border: 1px solid ${colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: ${props => props.$variant === 'problem' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$variant === 'problem' ? colors.error : colors.success};
`;

const PointContent = styled.div`
  flex: 1;
`;

const PointTitle = styled.h3`
  font-size: 16px;
  font-weight: ${typography.weights.semibold};
  color: ${colors.text};
  margin-bottom: 4px;
`;

const PointDescription = styled.p`
  font-size: 14px;
  color: ${colors.muted};
  line-height: 1.5;
  margin: 0;
`;

const problemPoints = [
  {
    icon: TrendingDown,
    title: 'Small needs get ignored',
    description: 'Traditional crowdfunding platforms focus on big campaigns, leaving urgent, smaller needs without support.',
  },
  {
    icon: MapPin,
    title: 'Communities are fragmented',
    description: 'No single place exists where community members can find and respond to local needs quickly.',
  },
  {
    icon: AlertCircle,
    title: 'Helper energy goes nowhere',
    description: 'People want to help but don\'t know how. Volunteer enthusiasm dissipates without clear pathways.',
  },
];

const solutionPoints = [
  {
    icon: DollarSign,
    title: 'Any need. Any amount.',
    description: 'No gatekeeping. Starting at just $19.99, every need matters and can find support on HonestNeed.',
  },
  {
    icon: Users,
    title: 'One platform. Multiple ways to help.',
    description: 'Money, labor, skills, or customers—however you want to support, there\'s a way to contribute.',
  },
  {
    icon: Award,
    title: 'Earn rewards for helping',
    description: 'Build community reputation while doing good. Get recognized and rewarded for your contributions.',
  },
];

export default function ProblemSolution() {
  return (
    <Section id="problem-solution">
      <SectionInner>
        <TwoColumnGrid>
          <Column
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ColumnHeader>
              <ColumnLabel $variant="problem">The Problem</ColumnLabel>
              <ColumnTitle>
                People need help. Communities want to help. But they don&apos;t connect.
              </ColumnTitle>
            </ColumnHeader>
            
            <PointList>
              {problemPoints.map((point, index) => (
                <PointItem
                  key={index}
                  variants={slideInLeft}
                  custom={index}
                >
                  <IconWrapper $variant="problem">
                    <point.icon size={22} />
                  </IconWrapper>
                  <PointContent>
                    <PointTitle>{point.title}</PointTitle>
                    <PointDescription>{point.description}</PointDescription>
                  </PointContent>
                </PointItem>
              ))}
            </PointList>
          </Column>
          
          <Column
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ColumnHeader>
              <ColumnLabel $variant="solution">The Solution</ColumnLabel>
              <ColumnTitle style={{ color: colors.primary }}>
                HonestNeed changes that.
              </ColumnTitle>
            </ColumnHeader>
            
            <PointList>
              {solutionPoints.map((point, index) => (
                <PointItem
                  key={index}
                  variants={slideInRight}
                  custom={index}
                >
                  <IconWrapper $variant="solution">
                    <point.icon size={22} />
                  </IconWrapper>
                  <PointContent>
                    <PointTitle>{point.title}</PointTitle>
                    <PointDescription>{point.description}</PointDescription>
                  </PointContent>
                </PointItem>
              ))}
            </PointList>
          </Column>
        </TwoColumnGrid>
      </SectionInner>
    </Section>
  );
}
