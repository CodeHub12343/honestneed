import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography, shadows } from '@/styles/theme';
import { fadeInUp } from '@/utils/animations';
import Button from '@/components/common/Button';
import { Mail, Check, AlertCircle, Sparkles } from 'lucide-react';

const Section = styled.section`
  padding: ${spacing['2xl']} ${spacing.md};
  background: linear-gradient(135deg, ${colors.background} 0%, #EEF2FF 100%);
  
  @media (min-width: 641px) {
    padding: ${spacing['3xl']} ${spacing.lg};
  }
  
  @media (min-width: 1025px) {
    padding: ${spacing['5xl']} ${spacing.xl};
  }
`;

const SectionInner = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
`;

const ContentWrapper = styled(motion.div)`
  background-color: ${colors.surface};
  border-radius: 24px;
  padding: ${spacing['2xl']} ${spacing.xl};
  box-shadow: ${shadows.md};
  
  @media (min-width: 641px) {
    padding: ${spacing['3xl']};
  }
`;

const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, ${colors.primary} 0%, #818CF8 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.lg};
  color: white;
  
  svg {
    width: 32px;
    height: 32px;
  }
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
  margin-bottom: ${spacing.xl};
  line-height: 1.6;
  
  @media (min-width: 1025px) {
    font-size: ${typography.sizes.body.desktop};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  
  @media (min-width: 641px) {
    flex-direction: row;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 ${spacing.lg};
  font-size: 16px;
  border: 2px solid ${props => props.$error ? colors.error : colors.border};
  border-radius: 12px;
  background-color: ${colors.background};
  color: ${colors.text};
  transition: all 0.2s ease;
  
  &::placeholder {
    color: ${colors.muted};
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }
`;

const PrivacyText = styled.p`
  font-size: 13px;
  color: ${colors.muted};
  margin-top: ${spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.xl};
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.success};
`;

const SuccessTitle = styled.h3`
  font-size: 24px;
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
`;

const SuccessText = styled.p`
  font-size: 16px;
  color: ${colors.muted};
`;

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${colors.error};
  margin-top: 8px;
  text-align: left;
`;

const BonusTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(245, 158, 11, 0.1);
  color: ${colors.accent};
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: ${spacing.lg};
`;

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setErrorMessage('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <Section id="email">
      <SectionInner>
        <ContentWrapper
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <SuccessMessage
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <SuccessIcon>
                  <Check size={32} />
                </SuccessIcon>
                <SuccessTitle>You&apos;re on the list!</SuccessTitle>
                <SuccessText>
                  Check your email for exclusive early access and sponsor offers.
                </SuccessText>
              </SuccessMessage>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IconWrapper>
                  <Mail />
                </IconWrapper>
                
                <BonusTag>
                  <Sparkles size={14} />
                  Exclusive sponsor discounts inside
                </BonusTag>
                
                <SectionTitle>Get Early Access</SectionTitle>
                <SectionSubtitle>
                  Be first to know when HonestNeed launches. Plus, exclusive discounts 
                  for our newsletter community.
                </SectionSubtitle>
                
                <Form onSubmit={handleSubmit}>
                  <InputWrapper>
                    <StyledInput
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={handleInputChange}
                      $error={status === 'error'}
                      disabled={status === 'loading'}
                    />
                    <AnimatePresence>
                      {status === 'error' && (
                        <ErrorMessage
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <AlertCircle size={14} />
                          {errorMessage}
                        </ErrorMessage>
                      )}
                    </AnimatePresence>
                  </InputWrapper>
                  
                  <Button
                    type="submit"
                    size="large"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
                  </Button>
                </Form>
                
                <PrivacyText>
                  <Check size={14} />
                  We respect your privacy. Unsubscribe anytime. No spam. Promise.
                </PrivacyText>
              </motion.div>
            )}
          </AnimatePresence>
        </ContentWrapper>
      </SectionInner>
    </Section>
  );
}
