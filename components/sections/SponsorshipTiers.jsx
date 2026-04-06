'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography, shadows } from '@/styles/theme';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import Button from '@/components/common/Button';
import { Check, Star, Clock, Zap, Crown } from 'lucide-react';

const Section = styled.section`
  padding: ${spacing['2xl']} ${spacing.md};
  background: linear-gradient(180deg, ${colors.background} 0%, #EEF2FF 50%, ${colors.background} 100%);
  
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

const SectionSubtitle = styled.p`
  font-size: ${typography.sizes.body.mobile};
  color: ${colors.muted};
  max-width: 600px;
  margin: 0 auto ${spacing.lg};
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.body.desktop};
  }
`;

const UrgencyBanner = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background-color: rgba(244, 63, 94, 0.1);
  color: ${colors.secondary};
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
`;

const TiersGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  align-items: start;
  
  @media (min-width: 641px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacing.xl};
  }
`;

const TierCard = styled(motion.div)`
  background-color: ${colors.surface};
  border-radius: 16px;
  padding: ${spacing.xl};
  border: 1px solid ${colors.border};
  position: relative;
  transition: all 0.3s ease;
  
  ${props => props.highlighted && `
    border-top: 4px solid ${colors.primary};
    box-shadow: ${shadows.lg};
    
    @media (min-width: 1025px) {
      transform: scale(1.05);
    }
  `}
  
  ${props => props.variant === 'accent' && `
    border-top: 4px solid ${colors.accent};
  `}
  
  ${props => props.variant === 'rose' && `
    border-top: 4px solid ${colors.secondary};
  `}
`;

const RecommendedBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, ${colors.primary} 0%, #818CF8 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;

const TierBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${props => props.color};
  margin-bottom: ${spacing.md};
`;

const TierName = styled.h3`
  font-size: 24px;
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.sm};
`;

const TierPrice = styled.div`
  font-size: 48px;
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.lg};
  
  span {
    font-size: 16px;
    font-weight: ${typography.weights.normal};
    color: ${colors.muted};
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${spacing.xl} 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.sm};
  font-size: 14px;
  color: ${colors.text};
  
  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.md};
`;

const ModalContent = styled(motion.div)`
  background-color: ${colors.surface};
  border-radius: 16px;
  padding: ${spacing['2xl']};
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const ModalIcon = styled.div`
  width: 64px;
  height: 64px;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.lg};
  color: ${colors.success};
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.sm};
`;

const ModalText = styled.p`
  font-size: 16px;
  color: ${colors.muted};
  margin-bottom: ${spacing.lg};
`;

const tiers = [
  {
    id: 'champion',
    name: 'Community Champion',
    price: 500,
    badge: 'Community Level',
    badgeColor: colors.accent,
    badgeIcon: Star,
    variant: 'accent',
    highlighted: false,
    benefits: [
      'Founder access to platform',
      'Recognition on launch wall',
      'Exclusive sponsor updates',
      'Early community building access',
    ],
    cta: 'Become a Champion',
    ctaVariant: 'accent',
  },
  {
    id: 'visionary',
    name: 'Visionary Sponsor',
    price: 1000,
    badge: 'Recommended',
    badgeColor: colors.primary,
    badgeIcon: Zap,
    variant: 'primary',
    highlighted: true,
    benefits: [
      'Everything in Community Champion',
      'Exclusive sponsor-only updates',
      'Feature request priority',
      'Quarterly impact reports',
      'Direct team access',
    ],
    cta: 'Become a Visionary',
    ctaVariant: 'primary',
  },
  {
    id: 'partner',
    name: 'Founding Partner',
    price: 2000,
    badge: 'Enterprise Level',
    badgeColor: colors.secondary,
    badgeIcon: Crown,
    variant: 'rose',
    highlighted: false,
    benefits: [
      'Everything in Visionary Sponsor',
      'Advisory board consideration',
      'Custom branding on platform',
      'Lifetime recognition',
      'VIP event invitations',
    ],
    cta: 'Become a Partner',
    ctaVariant: 'rose',
  },
];

export default function SponsorshipTiers() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [spotsRemaining, setSpotsRemaining] = useState(15);

  const handleSponsorClick = (tier) => {
    setSelectedTier(tier);
  };

  const closeModal = () => {
    setSelectedTier(null);
  };

  return (
    <Section id="sponsorship">
      <SectionInner>
        <SectionHeader
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Support the Movement</SectionTitle>
          <SectionSubtitle>
            Choose your level of impact as a founding sponsor. 
            Spots limited to 50.
          </SectionSubtitle>
          <UrgencyBanner
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Clock size={16} />
            Only {spotsRemaining} Sponsor Spots Remaining
          </UrgencyBanner>
        </SectionHeader>
        
        <TiersGrid
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {tiers.map((tier) => (
            <TierCard
              key={tier.id}
              variant={tier.variant}
              highlighted={tier.highlighted}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {tier.highlighted && (
                <RecommendedBadge>
                  <Star size={12} fill="white" />
                  Recommended
                </RecommendedBadge>
              )}
              
              <TierBadge color={tier.badgeColor}>
                <tier.badgeIcon size={14} />
                {tier.badge}
              </TierBadge>
              
              <TierName>{tier.name}</TierName>
              <TierPrice>
                ${tier.price.toLocaleString()}<span> one-time</span>
              </TierPrice>
              
              <BenefitsList>
                {tier.benefits.map((benefit, index) => (
                  <BenefitItem key={index}>
                    <Check size={18} color={colors.success} />
                    {benefit}
                  </BenefitItem>
                ))}
              </BenefitsList>
              
              <Button
                variant={tier.ctaVariant}
                fullWidth
                size="large"
                onClick={() => handleSponsorClick(tier)}
              >
                {tier.cta}
              </Button>
            </TierCard>
          ))}
        </TiersGrid>
      </SectionInner>
      
      <AnimatePresence>
        {selectedTier && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalIcon>
                <Check size={32} />
              </ModalIcon>
              <ModalTitle>Coming Soon!</ModalTitle>
              <ModalText>
                Thank you for your interest in becoming a {selectedTier.name}! 
                Sponsorship purchases will be available soon. We&apos;ll notify you 
                when payments are open.
              </ModalText>
              <Button onClick={closeModal} fullWidth>
                Got it
              </Button>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
}
