import styled from 'styled-components';
import { colors, spacing, typography } from '@/styles/theme';
import { XCircle, Home, MessageCircle } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
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

const Reasons = styled.div`
  background: #f9fafb;
  padding: ${spacing.lg};
  border-radius: 8px;
  margin-bottom: ${spacing['2xl']};
  text-align: left;
`;

const Reason = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: ${spacing.sm};
  
  &:before {
    content: "• ";
    color: ${colors.primary};
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.a`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.lg};
  background: ${props => props.primary ? colors.primary : '#e5e7eb'};
  color: ${props => props.primary ? 'white' : colors.text};
  text-decoration: none;
  border-radius: 8px;
  font-weight: ${typography.weights.semibold};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.primary ? colors.secondary : '#d1d5db'};
    transform: translateY(-2px);
  }
`;

const Support = styled.p`
  font-size: 14px;
  color: #666;
  
  a {
    color: ${colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function CancelPage() {
  return (
    <Container>
      <Content>
        <Icon>
          <XCircle size={60} color="#ef4444" />
        </Icon>

        <Title>Payment Cancelled</Title>
        
        <Description>
          Your payment was cancelled. No charges have been made to your account. Feel free to try again anytime!
        </Description>

        <Reasons>
          <Reason>Wrong sponsor tier?</Reason>
          <Reason>Need to review before paying?</Reason>
          <Reason>Had a technical issue?</Reason>
          <Reason>Changed your mind?</Reason>
        </Reasons>

        <ButtonGroup>
          <Button primary href="/">
            <Home size={18} />
            Try Again
          </Button>
          <Button href="mailto:jbowser727@gmail.com">
            <MessageCircle size={18} />
            Contact Us
          </Button>
        </ButtonGroup>

        <Support>
          Questions? Email us at{' '}
          <a href="mailto:jbowser727@gmail.com">jbowser727@gmail.com</a> or call{' '}
          <a href="tel:+12096229391">+1-209-622-9391</a>
        </Support>
      </Content>
    </Container>
  );
}
