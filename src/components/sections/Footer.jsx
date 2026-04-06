import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, typography } from '@/styles/theme';
import { fadeInUp } from '@/utils/animations';
import { Heart, Facebook, Instagram, Youtube, Music, Mail, Phone, MapPin } from 'lucide-react';

const FooterSection = styled.footer`
  background-color: ${colors.text};
  color: white;
  padding: ${spacing['3xl']} ${spacing.md} ${spacing.xl};
  
  @media (min-width: 641px) {
    padding: ${spacing['4xl']} ${spacing.lg} ${spacing.xl};
  }
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing['2xl']};
  margin-bottom: ${spacing['2xl']};
  
  @media (min-width: 641px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1025px) {
    grid-template-columns: 1fr 2fr 1fr;
  }
`;

const BrandColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: 24px;
  font-weight: ${typography.weights.bold};
  color: white;
  
  svg {
    color: ${colors.primary};
  }
`;

const Tagline = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  max-width: 250px;
`;

const LinksColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  
  @media (min-width: 641px) {
    align-items: center;
  }
`;

const LinksTitle = styled.h4`
  font-size: 14px;
  font-weight: ${typography.weights.semibold};
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${spacing.sm};
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.md} ${spacing.xl};
  
  @media (min-width: 641px) {
    grid-template-columns: repeat(3, auto);
  }
`;

const FooterLink = styled.a`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${colors.primary};
  }
`;

const SocialColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  
  @media (min-width: 641px) {
    align-items: flex-end;
  }
`;

const SocialTitle = styled.h4`
  font-size: 14px;
  font-weight: ${typography.weights.semibold};
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${spacing.sm};
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${spacing.md};
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ContactSection = styled(motion.div)`
  margin-bottom: ${spacing['2xl']};
  color: white;
  text-align: center;

  @media (min-width: 1025px) {
    text-align: left;
  }
`;

const ContactTitle = styled.h4`
  font-size: 14px;
  font-weight: ${typography.weights.semibold};
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${spacing.md};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s ease;
  justify-content: center;

  @media (min-width: 1025px) {
    justify-content: flex-start;
  }

  &:hover {
    color: ${colors.primary};
  }

  svg {
    flex-shrink: 0;
  }
`;

const ContactText = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  color: rgba(255, 255, 255, 0.7);
  justify-content: center;

  @media (min-width: 1025px) {
    justify-content: flex-start;
  }

  svg {
    flex-shrink: 0;
  }
`;

const BottomBar = styled(motion.div)`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: ${spacing.xl};
  text-align: center;
`;

const Copyright = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  
  svg {
    color: ${colors.secondary};
  }
`;

const footerLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Contact', href: 'mailto:jbowser727@gmail.com' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61583709480789&mibextid=ZbWKwL', label: 'Facebook' },
  { icon: Music, href: 'https://www.tiktok.com/@honestneeds', label: 'TikTok' },
  { icon: Instagram, href: 'https://www.instagram.com/honestneed?igsh=MzRlODBiNWFlZA==', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@honestneed?si=eHdj5YBVcDng2kYg', label: 'YouTube' },
];

export default function Footer() {
  return (
    <FooterSection>
      <FooterInner>
        <FooterGrid>
          <BrandColumn
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Logo>
              <Heart size={28} fill={colors.primary} />
              HonestNeed
            </Logo>
            <Tagline>
              See good, do good. Building a community that helps each other.
            </Tagline>
          </BrandColumn>
          
          <LinksColumn
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <LinksTitle>Quick Links</LinksTitle>
            <LinksGrid>
              {footerLinks.map((link, index) => (
                <FooterLink key={index} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </LinksGrid>
          </LinksColumn>
          
          <SocialColumn
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SocialTitle>Follow Us</SocialTitle>
            <SocialIcons>
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </SocialIcon>
              ))}
            </SocialIcons>
          </SocialColumn>
        </FooterGrid>
        
        <ContactSection
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ContactTitle>Contact Us</ContactTitle>
          <ContactInfo>
            <ContactItem href="mailto:jbowser727@gmail.com">
              <Mail size={16} />
              jbowser727@gmail.com
            </ContactItem>
            <ContactItem href="tel:+12096229391">
              <Phone size={16} />
              +1-209-622-9391
            </ContactItem>
            <ContactText>
              <MapPin size={16} />
              409 Broadway Ave Apt B, Modesto, CA 95351
            </ContactText>
            <ContactText style={{ marginTop: spacing.md, fontSize: '13px' }}>
              Hours: Monday – Friday, 9 AM – 5 PM EST
            </ContactText>
          </ContactInfo>
        </ContactSection>
        
        <BottomBar
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Copyright>
            Made with <Heart size={14} fill={colors.secondary} /> © 2026 HonestNeed Inc. All rights reserved.
          </Copyright>
        </BottomBar>
      </FooterInner>
    </FooterSection>
  );
}
