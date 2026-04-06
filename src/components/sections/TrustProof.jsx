import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, typography, shadows } from '@/styles/theme';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Quote, Users, Award, Globe } from 'lucide-react';

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

const TestimonialsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  margin-bottom: ${spacing['3xl']};
  
  @media (min-width: 641px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TestimonialCard = styled(motion.div)`
  background-color: ${colors.surface};
  border-radius: 16px;
  padding: ${spacing.xl};
  border-left: 4px solid ${colors.primary};
  box-shadow: ${shadows.sm};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${shadows.md};
    transform: translateY(-4px);
  }
`;

const QuoteIcon = styled.div`
  color: ${colors.primary};
  opacity: 0.3;
  margin-bottom: ${spacing.md};
  
  svg {
    width: 40px;
    height: 40px;
  }
`;

const QuoteText = styled.p`
  font-size: 16px;
  color: ${colors.text};
  line-height: 1.7;
  margin-bottom: ${spacing.lg};
  font-style: italic;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

const AuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.primary} 0%, #818CF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

const AuthorDetails = styled.div`
  h4 {
    font-size: 15px;
    font-weight: ${typography.weights.semibold};
    color: ${colors.text};
    margin: 0 0 2px 0;
  }
  
  p {
    font-size: 13px;
    color: ${colors.muted};
    margin: 0;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.lg};
  
  @media (min-width: 641px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  background-color: ${colors.surface};
  border-radius: 16px;
  padding: ${spacing.lg};
  text-align: center;
  border: 1px solid ${colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-4px);
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.md};
  color: ${props => props.$color};
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: ${typography.weights.bold};
  color: ${colors.primary};
  margin-bottom: 4px;
  
  @media (min-width: 641px) {
    font-size: 40px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${colors.muted};
`;

const testimonials = [
  {
    quote: "I've been looking for a platform like this. Finally, a way to help my community without the bureaucracy of traditional nonprofits.",
    author: 'Sarah M.',
    role: 'Community Organizer',
    location: 'California',
    initials: 'SM',
  },
  {
    quote: "This is the future of peer-to-peer support. HonestNeed gets what other platforms miss—real community connection.",
    author: 'Marcus T.',
    role: 'Nonprofit Director',
    location: 'Texas',
    initials: 'MT',
  },
];

const stats = [
  {
    icon: Users,
    number: '500+',
    label: 'Early Supporters',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    color: colors.primary,
  },
  {
    icon: Award,
    number: '10+',
    label: 'Partnerships Locked',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    color: colors.success,
  },
  {
    icon: Globe,
    number: '25+',
    label: 'States Represented',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    color: colors.accent,
  },
];

export default function TrustProof() {
  return (
    <Section id="trust">
      <SectionInner>
        <SectionHeader
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>What People Are Saying</SectionTitle>
        </SectionHeader>
        
        <TestimonialsGrid
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              variants={fadeInUp}
            >
              <QuoteIcon>
                <Quote />
              </QuoteIcon>
              <QuoteText>&ldquo;{testimonial.quote}&rdquo;</QuoteText>
              <AuthorInfo>
                <AuthorAvatar>{testimonial.initials}</AuthorAvatar>
                <AuthorDetails>
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}, {testimonial.location}</p>
                </AuthorDetails>
              </AuthorInfo>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
        
        <StatsGrid
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              variants={fadeInUp}
            >
              <StatIcon $bgColor={stat.bgColor} $color={stat.color}>
                <stat.icon size={24} />
              </StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </SectionInner>
    </Section>
  );
}
