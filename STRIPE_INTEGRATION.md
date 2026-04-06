# Stripe Integration Checklist for HonestNeed

## Overview
This document outlines the setup required to make the HonestNeed landing page Stripe-ready for production deployment.

## Files Created/Updated

### New Legal Pages (Routes)
- `/terms` → `src/pages/TermsOfService.jsx`
- `/privacy` → `src/pages/PrivacyPolicy.jsx`
- `/refund-policy` → `src/pages/RefundPolicy.jsx`

### New Components
- `src/components/common/SecureCheckoutBadge.jsx` - Add below payment buttons
- `src/components/common/TermsCheckbox.jsx` - Add to payment forms

### Updated Files
- `src/App.jsx` - Added React Router with routes for legal pages
- `src/components/sections/Footer.jsx` - Updated with:
  - Contact information (email, phone, address)
  - Social media links (Facebook, TikTok, Instagram, YouTube)
  - Footer links to legal pages and contact

## Implementation Checklist

### ✅ Backend Configuration (Before Going Live)

- [ ] **Stripe Account Setup**
  - Create Stripe account at https://stripe.com
  - Set up payment intents API (Stripe recommends for strong customer authentication)
  - Generate Test API Keys for development
  - Generate Live API Keys for production

- [ ] **Environment Variables**
  - Store Stripe API keys in `.env` file (never commit to repo)
  - Test keys for development: `VITE_STRIPE_TEST_KEY=pk_test_...`
  - Live keys for production: `VITE_STRIPE_LIVE_KEY=pk_live_...`

- [ ] **Backend Endpoints**
  - Create `/api/create-checkout-session` endpoint
  - Configure `success_url`: `https://honestneed.com/success`
  - Configure `cancel_url`: `https://honestneed.com/cancel`
  - Set appropriate `stripeAccount` for payment routing (if using Connect)

### ✅ Frontend Implementation (Required Before Payments)

- [ ] **Add Payment Form Component**
  ```javascript
  // Example structure:
  import TermsCheckbox from '@/components/common/TermsCheckbox';
  import SecureCheckoutBadge from '@/components/common/SecureCheckoutBadge';
  
  function PaymentForm() {
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    return (
      <>
        <TermsCheckbox 
          checked={termsAccepted} 
          onChange={(e) => setTermsAccepted(e.target.checked)} 
        />
        <button disabled={!termsAccepted}>Pay Now</button>
        <SecureCheckoutBadge />
      </>
    );
  }
  ```

- [ ] **Add Terms Acceptance Checkbox**
  - Use `<TermsCheckbox />` component in all payment forms
  - Disable "Pay" button until checkbox is checked
  - User must agree to Terms of Service and Refund Policy before payment

- [ ] **Add Secure Checkout Badge**
  - Place `<SecureCheckoutBadge />` below all payment buttons
  - Reassures users their data is secure
  - Shows Stripe badge/certification

- [ ] **Handle Payment Response**
  - Redirect to success page on successful payment
  - Display error messages on failed payments
  - Implement retry logic for network issues

### ✅ Legal & Compliance

- [ ] **Terms of Service** (`/terms`)
  - ✅ Already created with James's details
  - Contains: Eligibility, Platform Role, 20% Fee, User Conduct

- [ ] **Privacy Policy** (`/privacy`)
  - ✅ Already created with Stripe details
  - Contains: Data Collection, Payment Processing, Cookies, Security

- [ ] **Refund & Cancellation Policy** (`/refund-policy`)
  - ✅ Already created with non-refundable terms
  - Contains: Sponsorships, Donations, Cancellations, Chargebacks

- [ ] **Footer Updates**
  - ✅ Contact section with James's email, phone, address
  - ✅ Social media links (all 4 platforms)
  - ✅ Links to all legal pages

- [ ] **GDPR/Privacy Compliance**
  - Cookie consent banner (if serving EU users)
  - Privacy policy link visible on all pages
  - Clear data handling practices documented

### ✅ Security Requirements

- [ ] **SSL/TLS Certificate**
  - Install valid SSL certificate (HTTPS required for Stripe)
  - Test with: https://www.ssllabs.com/ssltest/

- [ ] **PCI Compliance**
  - Never store credit card data directly
  - Use Stripe's hosted checkout or Elements
  - Keep token expiration logic secure

- [ ] **CSRF Protection**
  - Implement CSRF tokens on all forms
  - Verify origin on backend

- [ ] **Rate Limiting**
  - Implement rate limiting on payment endpoints
  - Prevent duplicate charge submissions

## Contact Information Used

**James Scott Bowser**
- Email: jbowser727@gmail.com
- Phone: +1-209-622-9391
- Address: 409 Broadway Ave Apt B, Modesto, CA 95351
- Hours: Monday – Friday, 9 AM – 5 PM EST

## Social Media Links

- 🔵 Facebook: https://www.facebook.com/profile.php?id=61583709480789&mibextid=ZbWKwL
- 🎵 TikTok: https://www.tiktok.com/@honestneeds
- 📷 Instagram: https://www.instagram.com/honestneed?igsh=MzRlODBiNWFlZA==
- 📺 YouTube: https://youtube.com/@honestneed?si=eHdj5YBVcDng2kYg

## Testing Before Going Live

### Test Mode (Development)
1. Use Stripe Test API Keys
2. Test payment flow with test card: `4242 4242 4242 4242`
3. Verify terms acceptance is required
4. Verify secure checkout badge displays
5. Test error handling:
   - Declined card: `4000 0000 0000 0002`
   - Expired card: `4000 0000 0000 0069`

### Sandbox Validation
- [ ] All legal pages accessible and readable
- [ ] Footer links work correctly
- [ ] Contact information displays properly
- [ ] Social media icons link to correct profiles
- [ ] Payment flow includes all required checkboxes
- [ ] Secure checkout messaging appears

## Deployment Steps

1. **Development Environment**
   ```bash
   npm run dev
   ```

2. **Production Build**
   ```bash
   npm run build
   npm run preview
   ```

3. **Deploy to Production Host**
   - Push code to production server
   - Set environment variables (Live Stripe Keys)
   - Ensure HTTPS is enabled
   - Test payment flow with live keys

4. **Switch Stripe Keys**
   - Update `.env.production` with Live API Keys
   - Test with small amount first
   - Monitor Stripe dashboard for transactions

## Maintenance & Monitoring

- Monitor Stripe dashboard for failed payments
- Review chargebacks and disputes monthly
- Update legal pages as needed
- Keep payment endpoints updated
- Test payment flow quarterly

## Support

For questions about implementation:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Contact James: jbowser727@gmail.com

---
Last Updated: April 2026
