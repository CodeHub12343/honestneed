import styled from 'styled-components';
import { colors, spacing, typography } from '@/styles/theme';
import { Lock } from 'lucide-react';

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.lg} ${spacing.md};
  margin-top: ${spacing.lg};
  background-color: #f0f9ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  text-align: center;
`;

const BadgeText = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: 14px;
  font-weight: ${typography.weights.semibold};
  color: ${colors.text};

  svg {
    color: ${colors.primary};
  }
`;

const Description = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.6;
`;

const StripeCredit = styled.p`
  font-size: 11px;
  color: #999;
  margin: 0;
  margin-top: ${spacing.sm};
`;

export default function SecureCheckoutBadge() {
  return (
    <BadgeContainer>
      <BadgeText>
        <Lock size={18} />
        Secure Checkout
      </BadgeText>
      <Description>
        Payments are processed and secured by Stripe. We use industry-standard 256-bit SSL encryption to protect your data.
      </Description>
      <StripeCredit>
        🔐 Powered by Stripe
      </StripeCredit>
    </BadgeContainer>
  );
}
