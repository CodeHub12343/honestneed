import { useState } from 'react';
import styled from 'styled-components';
import { colors, spacing, typography } from '@/styles/theme';
import TermsCheckbox from '@/components/common/TermsCheckbox';
import SecureCheckoutBadge from '@/components/common/SecureCheckoutBadge';
import { Loader } from 'lucide-react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: ${typography.weights.bold};
  margin-bottom: ${spacing.md};
  color: ${colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${spacing.sm};
  font-weight: ${typography.weights.semibold};
  color: ${colors.text};
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: ${spacing.md};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${spacing.md};
  background: ${colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};

  &:hover:not(:disabled) {
    background: ${colors.secondary};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  padding: ${spacing.md};
  margin-bottom: ${spacing.lg};
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  color: #991b1b;
  font-size: 14px;
`;

const TierInfo = styled.div`
  padding: ${spacing.md};
  background: #f0f9ff;
  border-left: 4px solid ${colors.primary};
  border-radius: 4px;
  margin-bottom: ${spacing.lg};
  
  strong {
    color: ${colors.text};
  }
  
  span {
    color: #666;
  }
`;

export default function SponsorshipPaymentForm({ tier, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setError('Please accept the terms and refund policy');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const paymentUrl = `${backendUrl}/api/create-checkout-session`;
      
      // Map tier ID to sponsorship tier
      const tierMap = {
        champion: 'bronze',    // Will be handled on backend
        visionary: 'silver',
        partner: 'gold',
      };

      const payload = {
        tier: tierMap[tier.id] || 'silver',
        email: formData.email.trim(),
        name: formData.name.trim(),
        sponsorshipType: tier.name,
        sponsorshipPrice: tier.price,
      };

      console.log('🔄 Sending payment request to:', paymentUrl);
      console.log('📦 Payload:', payload);

      const response = await fetch(paymentUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('✅ Response status:', response.status);
      console.log('✅ Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error response:', errorData);
        throw new Error(errorData.error || 'Failed to create payment session');
      }

      const { sessionId } = await response.json();
      console.log('✅ Session ID created:', sessionId);

      // TODO: Uncomment when ready for Stripe redirect
      // const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      // await stripe.redirectToCheckout({ sessionId });

      console.log('Sponsorship Session ID:', sessionId);
      alert(`✅ Session created! ID: ${sessionId}\n\nIn production, you'll be redirected to Stripe checkout.`);
      onClose();

    } catch (err) {
      console.error('❌ Full error object:', err);
      console.error('❌ Error name:', err.name);
      console.error('❌ Error message:', err.message);
      console.error('❌ Error stack:', err.stack);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Complete Your Sponsorship</Title>
      
      <TierInfo>
        <strong>{tier.name}</strong><br />
        <span>Amount: ${tier.price.toLocaleString()} one-time</span>
      </TierInfo>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormGroup>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="James Bowser"
          disabled={loading}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jbowser727@gmail.com"
          disabled={loading}
          required
        />
      </FormGroup>

      <TermsCheckbox
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
      />

      <Button 
        type="submit" 
        disabled={!termsAccepted || loading || !formData.name.trim() || !formData.email.trim()}
      >
        {loading ? (
          <>
            <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
            Processing...
          </>
        ) : (
          `Pay $${tier.price.toLocaleString()}`
        )}
      </Button>

      <SecureCheckoutBadge />
    </Form>
  );
}
