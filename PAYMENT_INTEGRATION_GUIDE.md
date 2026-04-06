# Payment Integration Guide

## Quick Start - Using the Payment Components

### 1. SecureCheckoutBadge Component
Add below any "Pay" or "Confirm" button to reassure customers.

```jsx
import SecureCheckoutBadge from '@/components/common/SecureCheckoutBadge';

function CheckoutForm() {
  return (
    <div>
      <form>
        {/* Your payment form fields here */}
      </form>
      <button type="submit">Complete Payment</button>
      <SecureCheckoutBadge />
    </div>
  );
}
```

**Output:**
```
🔒 Secure Checkout
Payments are processed and secured by Stripe. We use industry-standard 256-bit SSL encryption to protect your data.
🔐 Powered by Stripe
```

---

### 2. TermsCheckbox Component
Add to any payment form to ensure users accept terms before paying.

```jsx
import { useState } from 'react';
import TermsCheckbox from '@/components/common/TermsCheckbox';

function PaymentForm() {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the terms');
      return;
    }
    // Process payment
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Full Name" />
      <input type="number" placeholder="Amount" />
      
      <TermsCheckbox 
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
      />
      
      <button type="submit" disabled={!termsAccepted}>
        Pay Now
      </button>
    </form>
  );
}
```

---

### 3. Complete Payment Form Example

```jsx
import { useState } from 'react';
import TermsCheckbox from '@/components/common/TermsCheckbox';
import SecureCheckoutBadge from '@/components/common/SecureCheckoutBadge';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background: #4f46e5;
  }
`;

export function SponsorshipForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tier: 'bronze',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      alert('Please accept the terms and refund policy');
      return;
    }

    setLoading(true);
    try {
      // Step 1: Send to backend
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: formData.tier,
          email: formData.email,
          name: formData.name,
        })
      });

      if (!response.ok) throw new Error('Payment setup failed');
      
      const { sessionId } = await response.json();
      
      // Step 2: Redirect to Stripe checkout
      // const stripe = await loadStripe(publicKey);
      // await stripe.redirectToCheckout({ sessionId });
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Become a Sponsor</h2>
      
      <FormGroup>
        <Label>Full Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Sponsorship Tier</Label>
        <Input
          as="select"
          name="tier"
          value={formData.tier}
          onChange={handleChange}
        >
          <option value="bronze">Bronze - $50/month</option>
          <option value="silver">Silver - $100/month</option>
          <option value="gold">Gold - $250/month</option>
          <option value="platinum">Platinum - $500/month</option>
        </Input>
      </FormGroup>

      <TermsCheckbox
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
      />

      <Button 
        type="submit" 
        disabled={!termsAccepted || loading}
      >
        {loading ? 'Processing...' : 'Continue to Payment'}
      </Button>

      <SecureCheckoutBadge />
    </Form>
  );
}
```

---

## Backend Setup (Node.js/Express Example)

```javascript
// routes/checkout.js
import Stripe from 'stripe';
import express from 'express';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { tier, email, name } = req.body;

    // Define tier amounts (in cents)
    const tiers = {
      bronze: 5000,    // $50
      silver: 10000,   // $100
      gold: 25000,     // $250
      platinum: 50000  // $500
    };

    const amount = tiers[tier];
    if (!amount) throw new Error('Invalid tier');

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `HonestNeed ${tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsorship`,
              description: `Support HonestNeed community at ${tier} level`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: 'payment',
      success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/cancel`,
      metadata: {
        name,
        tier,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

---

## Environment Variables Required

Create a `.env` file in your project root:

```env
# Stripe Keys (get from https://dashboard.stripe.com/apikeys)
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# App URLs
APP_URL=http://localhost:5174
BACKEND_URL=http://localhost:3001
```

**Important**: Never commit `.env` to version control!

---

## Legal Pages Already Available

All users can access these from the footer or directly:
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/refund-policy` - Refund & Cancellation Policy

These are fully styled and ready for production.

---

## Stripe Test Cards

Use these in development to test different scenarios:

| Scenario | Card Number | Expiry | CVC |
|----------|------------|--------|-----|
| Success | 4242 4242 4242 4242 | 12/26 | 424 |
| Declined | 4000 0000 0000 0002 | 12/26 | 400 |
| Expired | 4000 0000 0000 0069 | 12/26 | 069 |
| Requires 3D Secure | 4000 2500 0003 4010 | 12/26 | 010 |

---

## Deployment Checklist

Before going live with Stripe:

- [ ] Get Live API Keys from Stripe
- [ ] Update `.env.production` with Live Keys
- [ ] Test full payment flow in production
- [ ] Verify SSL certificate (HTTPS)
- [ ] Test legal page links work
- [ ] Test on mobile devices
- [ ] Monitor Stripe dashboard after launch
- [ ] Have fallback contact info visible

---

## Support & Resources

- **React Documentation**: https://react.dev
- **Stripe React Integration**: https://stripe.com/docs/stripe-js/react
- **My Stripe Setup Notes**: See `STRIPE_INTEGRATION.md`

