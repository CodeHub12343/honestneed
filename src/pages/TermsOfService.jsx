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

export default function TermsOfService() {
  return (
    <Container>
      <Header>
        <Logo href="/">
          <Heart size={28} fill={colors.primary} />
          HonestNeed
        </Logo>
      </Header>
      <Content>
        <h1>Terms of Service</h1>
        
        <p>Welcome to Honest Need. By accessing our platform, you agree to the following terms:</p>

        <h2>Eligibility</h2>
        <p>You must be at least 18 years old to create a campaign or provide sponsorship.</p>

        <h2>Platform Role</h2>
        <p>
          Honest Need is a crowdfunding and community support platform. We provide the technology to connect Creators and Supporters but do not guarantee the success of any individual campaign.
        </p>

        <h2>Fees</h2>
        <p>
          To maintain the platform and community features, Honest Need applies a 20% platform fee to all financial transactions (donations, sponsorships, and share budget reloads).
        </p>

        <h2>User Conduct</h2>
        <p>
          Users agree to provide truthful information. Fraudulent campaigns will be removed immediately.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Honest Need is provided "as is" without any warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.
        </p>

        <p style={{ marginTop: spacing['3xl'], fontSize: '14px', color: '#666' }}>
          Last updated: April 2026
        </p>
      </Content>
    </Container>
  );
}
