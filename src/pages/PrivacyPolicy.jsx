import styled from 'styled-components';
import { colors, spacing, typography } from '@/styles/theme';
import { Heart } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  padding: ${spacing['3xl']} ${spacing.md};
`;

const Header = styled.div`
  max-width: 800px;
  margin: 0 auto ${spacing['3xl']};
  padding-top: ${spacing['2xl']};
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: 24px;
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
  text-decoration: none;
  margin-bottom: ${spacing['2xl']};
  
  svg {
    color: ${colors.primary};
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: ${spacing['3xl']};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 32px;
    font-weight: ${typography.weights.bold};
    margin-bottom: ${spacing.xl};
    color: ${colors.text};
  }

  h2 {
    font-size: 20px;
    font-weight: ${typography.weights.semibold};
    margin-top: ${spacing['2xl']};
    margin-bottom: ${spacing.md};
    color: ${colors.text};
  }

  p {
    margin-bottom: ${spacing.md};
    line-height: 1.8;
    color: ${colors.text};
  }

  ul {
    margin-left: ${spacing.lg};
    margin-bottom: ${spacing.md};
  }

  li {
    margin-bottom: ${spacing.sm};
    line-height: 1.8;
    color: ${colors.text};
  }
`;

export default function PrivacyPolicy() {
  return (
    <Container>
      <Header>
        <Logo href="/">
          <Heart size={28} fill={colors.primary} />
          HonestNeed
        </Logo>
      </Header>
      <Content>
        <h1>Privacy Policy</h1>
        
        <p>Your privacy is vital to us at Honest Need. This Privacy Policy explains how we collect, use, and protect your information.</p>

        <h2>Data Collection</h2>
        <p>
          We collect your name, email address, and basic profile information to manage your account and campaigns. This information is necessary for you to use our platform and participate in campaigns.
        </p>

        <h2>Payment Processing</h2>
        <p>
          All payments are processed securely through Stripe. Honest Need never stores your full credit card numbers or sensitive bank details on our servers. Your payment information is encrypted and handled exclusively by Stripe according to their security standards.
        </p>

        <h2>Third Parties</h2>
        <p>
          We do not sell, rent, or trade your personal data to third parties for marketing purposes. We may share information with trusted service providers (like Stripe) only to the extent necessary to provide our services.
        </p>

        <h2>Cookies</h2>
        <p>
          We use basic cookies to keep you logged in and improve your site experience. These are essential for platform functionality and are not used for tracking or advertising purposes.
        </p>

        <h2>Security</h2>
        <p>
          We use industry-standard 256-bit SSL encryption to protect your data in transit. However, no method of transmission over the internet is 100% secure. We recommend choosing a strong password and not sharing it with others.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data. You can manage your account settings at any time or contact us at support@honestneed.com to request data deletion (subject to legal requirements).
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at support@honestneed.com or mail us at:
        </p>
        <p>
          Honest Need<br />
          409 Broadway Ave Apt B<br />
          Modesto, CA 95351
        </p>

        <p style={{ marginTop: spacing['3xl'], fontSize: '14px', color: '#666' }}>
          Last updated: April 2026
        </p>
      </Content>
    </Container>
  );
}
