'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, typography, shadows } from '@/styles/theme';
import { heroStagger, heroItem } from '@/utils/animations';
import Button from '@/components/common/Button';
import { Heart, Users, ArrowRight } from 'lucide-react';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, ${colors.background} 0%, #EEF2FF 50%, ${colors.background} 100%);
  padding: ${spacing.xl} ${spacing.md};
  position: relative;
  overflow: hidden;
  
  @media (min-width: 641px) {
    min-height: 70vh;
    padding: ${spacing['3xl']} ${spacing.lg};
  }
  
  @media (min-width: 1025px) {
    padding: ${spacing['5xl']} ${spacing.xl};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 150%;
    background: radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 60%;
    height: 100%;
    background: radial-gradient(ellipse, rgba(245, 158, 11, 0.06) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing['3xl']};
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (min-width: 1025px) {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing['4xl']};
  }
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  text-align: center;
  
  @media (min-width: 1025px) {
    text-align: left;
  }
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background-color: rgba(99, 102, 241, 0.1);
  color: ${colors.primary};
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
  margin: 0 auto;
  
  @media (min-width: 1025px) {
    margin: 0;
  }
`;

const Headline = styled(motion.h1)`
  font-size: ${typography.sizes.hero.mobile};
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  line-height: ${typography.lineHeight.tight};
  
  span {
    color: ${colors.primary};
  }
  
  @media (min-width: 641px) {
    font-size: 56px;
  }
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.hero.desktop};
  }
`;

const Subheadline = styled(motion.p)`
  font-size: ${typography.sizes.body.mobile};
  color: ${colors.muted};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 500px;
  margin: 0 auto;
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.body.desktop};
    margin: 0;
  }
`;

const CTAGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin-top: ${spacing.md};
  
  @media (min-width: 641px) {
    flex-direction: row;
    justify-content: center;
  }
  
  @media (min-width: 1025px) {
    justify-content: flex-start;
  }
`;

const TrustSignal = styled(motion.p)`
  font-size: 14px;
  color: ${colors.muted};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  justify-content: center;
  
  @media (min-width: 1025px) {
    justify-content: flex-start;
  }
`;

const VisualWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeroVisual = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
`;

const CircleBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, ${colors.primary}20 0%, ${colors.accent}15 100%);
  border-radius: 50%;
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  background: ${colors.surface};
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: ${shadows.lg};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CardContent = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: ${colors.text};
    margin: 0;
  }
  p {
    font-size: 12px;
    color: ${colors.muted};
    margin: 2px 0 0 0;
  }
`;

const CentralIcon = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, ${colors.primary} 0%, #818CF8 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
  
  svg {
    width: 48px;
    height: 48px;
  }
`;

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection>
      <HeroInner>
        <ContentWrapper
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <Badge variants={heroItem}>
            <Heart size={14} fill={colors.primary} />
            Coming April 1, 2026
          </Badge>
          
          <Headline variants={heroItem}>
            See Good.<br />
            <span>Do Good.</span>
          </Headline>
          
          <Subheadline variants={heroItem}>
            Join thousands building a community that helps each other. 
            Become a founding sponsor and shape HonestNeed&apos;s future.
          </Subheadline>
          
          <CTAGroup variants={heroItem}>
            <Button 
              size="large" 
              onClick={() => scrollToSection('sponsorship')}
            >
              Join the Movement
              <ArrowRight size={20} />
            </Button>
            <Button 
              variant="secondary" 
              size="large"
              onClick={() => scrollToSection('email')}
            >
              Get Updates
            </Button>
          </CTAGroup>
          
          <TrustSignal variants={heroItem}>
            <Users size={16} />
            Early Sponsor Spots Available • Launching Soon
          </TrustSignal>
        </ContentWrapper>
        
        <VisualWrapper
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <HeroVisual>
            <CircleBackground />
            
            <CentralIcon
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart fill="white" />
            </CentralIcon>
            
            <FloatingCard
              style={{ top: '10%', left: '5%' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <CardIcon bg={colors.success}>
                <Users size={20} />
              </CardIcon>
              <CardContent>
                <h4>500+ Supporters</h4>
                <p>Already joined</p>
              </CardContent>
            </FloatingCard>
            
            <FloatingCard
              style={{ bottom: '20%', right: '0%' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <CardIcon bg={colors.accent}>
                <Heart size={20} />
              </CardIcon>
              <CardContent>
                <h4>Community First</h4>
                <p>Help & get rewarded</p>
              </CardContent>
            </FloatingCard>
          </HeroVisual>
        </VisualWrapper>
      </HeroInner>
    </HeroSection>
  );
}
