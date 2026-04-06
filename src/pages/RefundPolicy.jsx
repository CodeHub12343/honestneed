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

export default function RefundPolicy() {
  return (
    <Container>
      <Header>
        <Logo href="/">
          <Heart size={28} fill={colors.primary} />
          HonestNeed
        </Logo>
      </Header>
      <Content>
        <h1>Refund & Cancellation Policy</h1>
        
        <p>At Honest Need, we strive for transparency in our community support model.</p>

        <h2>Sponsorships</h2>
        <p>
          All sponsorship payments (Bronze, Silver, Gold, or Custom tiers) are final and non-refundable. These funds are immediately allocated to platform operations, marketing, and community growth. By completing a sponsorship, you acknowledge and accept this policy.
        </p>

        <h2>Donations</h2>
        <p>
          Financial support sent to individual creators is handled directly via their chosen payment methods. These donations are generally non-refundable. If you have a concern about a donation, please contact the Campaign Creator directly. For disputes related to fraudulent activity or platform errors, you may contact us at support@honestneed.com for investigation.
        </p>

        <h2>Cancellations</h2>
        <p>
          You may deactivate your account at any time through your account settings. However, account deactivation does not entitle the user to a refund of past platform fees or sponsorships. Deactivating your account will not affect active campaigns or ongoing financial obligations.
        </p>

        <h2>Chargebacks & Disputes</h2>
        <p>
          If you file a chargeback or dispute with your payment provider after using our platform, we reserve the right to permanently ban your account and pursue legal action for breach of contract and fraud. We encourage you to contact us directly at support@honestneed.com if you have any issues.
        </p>

        <h2>Platform Errors</h2>
        <p>
          If you believe a transaction was charged in error due to a technical issue on our platform, please contact us immediately at support@honestneed.com with documentation. We will investigate and take appropriate action within 30 days. Refunds for verified platform errors will be issued at our discretion.
        </p>

        <h2>Contact Us</h2>
        <p>
          For refund requests or policy questions, please contact us at:
        </p>
        <p>
          Email: jbowser727@gmail.com<br />
          Phone: +1-209-622-9391<br />
          Hours: Monday – Friday, 9 AM – 5 PM EST
        </p>

        <p style={{ marginTop: spacing['3xl'], fontSize: '14px', color: '#666' }}>
          Last updated: April 2026
        </p>
      </Content>
    </Container>
  );
}
