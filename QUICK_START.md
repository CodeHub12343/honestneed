# 🎯 QUICK START - Get Stripe Working in 10 Minutes

## What You Have Now ✅

```
✅ Backend server (Express + Stripe)
✅ Frontend form (React component)
✅ Legal pages (Terms, Privacy, Refund Policy)
✅ Environment files (.env created)
✅ All dependencies installed
```

## What's Left ⏳

```
❌ Stripe API Keys (free, takes 3 minutes)
❌ Add payment form to landing page
❌ Start the servers
❌ Test payment
```

---

## Step 1: Get Free Stripe Keys (3 minutes)

### 1a. Create Stripe Account

1. Go to → https://stripe.com/start
2. Enter your email
3. Create password
4. Verify email
5. Fill out basic info (just 1 minute)

### 1b. Get Test Keys

1. Log in to → https://dashboard.stripe.com
2. Look for **Developers** on the left sidebar
3. Click **Developers** → **API keys**
4. You'll see:
   - 📘 **Publishable key** (starts with `pk_test_`)
   - 🔒 **Secret key** (starts with `sk_test_`)

### 1c. Add Keys to Your Project

**In backend/.env:**
```
Find lines:
STRIPE_PUBLIC_KEY=pk_test_PASTE_YOUR_PUBLIC_KEY_HERE
STRIPE_SECRET_KEY=sk_test_PASTE_YOUR_SECRET_KEY_HERE

Replace with actual keys from Stripe dashboard
```

**In .env.local (frontend):**
```
VITE_STRIPE_PUBLIC_KEY=pk_test_PASTE_YOUR_PUBLIC_KEY_HERE

Use the PUBLISHABLE key here (not the secret one!)
```

---

## Step 2: Add Payment Form to Landing Page (2 minutes)

Edit `src/App.jsx`:

```jsx
// Add this import at the top
import StripePaymentForm from '@/components/common/StripePaymentForm';

// In HomePage component, add this before Footer:

function HomePage() {
  return (
    <Main>
      <Hero />
      <ProblemSolution />
      <SponsorshipTiers />
      <Mission />
      <EmailCapture />
      <TrustProof />
      <FAQ />
      <StripePaymentForm />  {/* ← ADD THIS LINE */}
      <FinalCTA />
      <Footer />
    </Main>
  );
}
```

---

## Step 3: Start Both Servers (2 minutes)

### Terminal 1: Frontend
```bash
# In main folder (APP-NEW-LANDING-PAGE)
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5174/
```

### Terminal 2: Backend
```bash
# In backend folder
cd backend
npm run dev
```

Expected output:
```
🚀 HonestNeed Backend running on http://localhost:3001
✅ Endpoints:
   GET  /api/health
   POST /api/create-checkout-session
```

---

## Step 4: Test It! (3 minutes)

### Open http://localhost:5174 in browser

Scroll down and find the payment form. Fill it in:

- **Name**: Test User
- **Email**: test@example.com
- **Tier**: Silver ($100)
- **✅ Check**: "I agree to terms..."
- **Click**: "Pay $100"

### In Backend Terminal

You should see:
```
POST /api/create-checkout-session 200 OK
```

### In Browser

You should see:
```
✅ Payment session created! Session ID: cs_test_...
```

**Congratulations! 🎉 It's working!**

---

## Next Steps

### To Show Stripe Checkout (Payment Form)

1. Install Stripe library:
   ```bash
   npm install @stripe/stripe-js
   ```

2. Uncomment in `src/components/common/StripePaymentForm.jsx`:
   ```javascript
   // Replace this section (around line 140):
   
   // FROM:
   // setSuccess(`✅ Payment session created...`);
   
   // TO:
   const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
   const result = await stripe.redirectToCheckout({ sessionId });
   ```

3. Refresh browser and test payment again
4. You'll be redirected to Stripe payment form

### Test Cards for Development

Use these in the Stripe form:

- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Expired**: 4000 0000 0000 0069
- **Expiry**: Any future date (12/26)
- **CVC**: Any 3 digits (424)

### To Save Payments to Database

See `backend/README.md` section "Next Steps: Save Payments"

### To Deploy to Production

See `STRIPE_INTEGRATION.md` and `BACKEND_SETUP_GUIDE.md`

---

## 🚨 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| "Cannot find module 'stripe'" | Run `npm install` in backend folder |
| CORS error in browser | Make sure backend is running on port 3001 |
| Form doesn't submit | Check browser console (F12) for errors |
| Backend won't start | Check `backend/.env` file has correct keys |
| "Port 3001 already in use" | Change `PORT=3002` in `backend/.env` |

---

## ✅ You're All Set!

Everything is installed and ready. Just follow these 4 steps above and you'll have:

✅ Payment form working
✅ Stripe sessions being created
✅ Payments being logged
✅ Full Stripe integration

**Estimated time: 10 minutes**

---

**Questions?** Check the documentation:
- `backend/README.md` - Backend details
- `BACKEND_SETUP_GUIDE.md` - Full setup walkthrough
- `PAYMENT_INTEGRATION_GUIDE.md` - Code examples

**Ready? Let's go! 🚀**
