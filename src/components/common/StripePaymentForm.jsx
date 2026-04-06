import { useState } from 'react';
import styled from 'styled-components';
import { colors, spacing, typography } from '@/styles/theme';
import TermsCheckbox from '@/components/common/TermsCheckbox';
import SecureCheckoutBadge from '@/components/common/SecureCheckoutBadge';
import { Loader } from 'lucide-react';

const Form = styled.form`
  max-width: 500px;
  margin: ${spacing['3xl']} auto;
  padding: ${spacing['3xl']};
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: ${typography.weights.bold};
  margin-bottom: ${spacing.lg};
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

const Select = styled(Input)``;

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

const SuccessMessage = styled.div`
  padding: ${spacing.md};
  margin-bottom: ${spacing.lg};
  background-color: #dcfce7;
  border: 1px solid #86efac;
  border-radius: 8px;
  color: #166534;
  font-size: 14px;
`;

const TierInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: ${spacing.sm};
`;

export default function StripePaymentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tier: 'silver',
  });
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get amount for display
  const tierAmounts = {
    bronze: '$50',
    silver: '$100',
    gold: '$250',
    platinum: '$500',
  };

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
      // Get backend URL from environment or default to localhost
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      
      // Call your backend to create Stripe session
      const response = await fetch(`${backendUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: formData.tier,
          email: formData.email.trim(),
          name: formData.name.trim(),
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment session');
      }

      const { sessionId } = await response.json();

      // // Redirect to Stripe Checkout
      // const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      // const result = await stripe.redirectToCheckout({ sessionId });
      
      // For now, show success message
      setSuccess(`✅ Payment session created! Session ID: ${sessionId.slice(0, 20)}...`);
      
      // Log for testing
      console.log('Stripe Session ID:', sessionId);

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Become a Sponsor</Title>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

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

      <FormGroup>
        <Label htmlFor="tier">Sponsorship Tier</Label>
        <Select
          id="tier"
          as="select"
          name="tier"
          value={formData.tier}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="bronze">Bronze - $50/month</option>
          <option value="silver">Silver - $100/month</option>
          <option value="gold">Gold - $250/month</option>
          <option value="platinum">Platinum - $500/month</option>
        </Select>
        <TierInfo>Amount: {tierAmounts[formData.tier]}</TierInfo>
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
          `Pay ${tierAmounts[formData.tier]}`
        )}
      </Button>

      <SecureCheckoutBadge />
    </Form>
  );
}
