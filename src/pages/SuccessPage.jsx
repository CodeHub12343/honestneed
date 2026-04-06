import styled from 'styled-components';
import { colors, spacing, typography } from '@/styles/theme';
import { CheckCircle, Home } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing['2xl']};
`;

const Content = styled.div`
  text-align: center;
  background: white;
  padding: ${spacing['3xl']};
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 500px;
`;

const Icon = styled.div`
  margin-bottom: ${spacing['2xl']};
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: ${typography.weights.bold};
  margin-bottom: ${spacing.md};
  color: ${colors.text};
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: ${spacing['2xl']};
  line-height: 1.6;
`;

const Details = styled.div`
  background: #f9fafb;
  padding: ${spacing.lg};
  border-radius: 8px;
  margin-bottom: ${spacing['2xl']};
  text-align: left;
`;

const DetailRow = styled.div`
  margin-bottom: ${spacing.sm};
  font-size: 14px;
  
  strong {
    color: ${colors.text};
  }
  
  span {
    color: #666;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.lg};
  background: ${colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: ${typography.weights.semibold};
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.secondary};
    transform: translateY(-2px);
  }
`;

const Email = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: ${spacing.lg};
  
  a {
    color: ${colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function SuccessPage() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');

  return (
    <Container>
      <Content>
        <Icon>
          <CheckCircle size={60} color={colors.primary} />
        </Icon>

        <Title>Payment Successful! 🎉</Title>
        
        <Description>
          Thank you for your sponsorship! Your support means the world to us and helps us continue building a community that helps each other.
        </Description>

        <Details>
          <DetailRow>
            <strong>Status:</strong> <span>Payment Confirmed</span>
          </DetailRow>
          <DetailRow>
            <strong>Session ID:</strong> <span>{sessionId ? sessionId.slice(0, 20) + '...' : 'N/A'}</span>
          </DetailRow>
          <DetailRow>
            <strong>Next Step:</strong> <span>Check your email for confirmation</span>
          </DetailRow>
        </Details>

        <Button href="/">
          <Home size={18} />
          Back to Home
        </Button>

        <Email>
          Questions? Contact us at{' '}
          <a href="mailto:jbowser727@gmail.com">jbowser727@gmail.com</a>
        </Email>
      </Content>
    </Container>
  );
}
